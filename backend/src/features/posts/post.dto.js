import mongoose from 'mongoose';

const EMBEDDED_IMAGE = /^data:/;

const isEmbedded = {
  $regexMatch: { input: { $ifNull: ['$selectedFile', ''] }, regex: EMBEDDED_IMAGE },
};

export const summaryProjection = (viewerId) => ({
  _id: 1,
  title: '$baslik',
  subtitle: '$ufakbaslik',
  description: '$acikla',
  color: '$renk',
  tags: { $ifNull: ['$tags', []] },
  likeCount: { $max: [{ $ifNull: ['$likeCount', 0] }, 0] },
  viewCount: { $ifNull: ['$goruntuCount', 0] },
  commentCount: {
    $size: {
      $filter: { input: { $ifNull: ['$comments', []] }, cond: { $ne: ['$$this', null] } },
    },
  },
  liked: viewerId
    ? { $in: [new mongoose.Types.ObjectId(viewerId), { $ifNull: ['$likes', []] }] }
    : { $literal: false },
  hasEmbeddedImage: isEmbedded,
  imageSource: { $cond: [isEmbedded, null, '$selectedFile'] },
  createdAt: 1,
  updatedAt: 1,
});

export const detailProjection = (viewerId) => ({
  ...summaryProjection(viewerId),
  content: '$aciklaiki',
  video: '$video',
  comments: { $ifNull: ['$comments', []] },
});

const resolveImage = ({ _id, hasEmbeddedImage, imageSource, updatedAt }) => {
  if (hasEmbeddedImage) {
    const version = updatedAt ? new Date(updatedAt).getTime() : 0;
    return `/api/posts/${_id}/image?v=${version}`;
  }
  return imageSource || null;
};

export const toCommentDto = (comment, index, postId) => {
  if (typeof comment === 'string') {
    return { id: `${postId}-${index}`, text: comment, author: null, createdAt: null };
  }

  return {
    id: String(comment._id ?? `${postId}-${index}`),
    text: comment.text ?? '',
    author: comment.author ?? null,
    createdAt: comment.createdAt ?? null,
  };
};

export const toPostSummaryDto = (doc) => ({
  id: String(doc._id),
  title: doc.title ?? '',
  subtitle: doc.subtitle ?? '',
  description: doc.description ?? '',
  color: doc.color ?? null,
  image: resolveImage(doc),
  tags: doc.tags,
  likeCount: doc.likeCount,
  viewCount: doc.viewCount,
  commentCount: doc.commentCount,
  liked: doc.liked,
  createdAt: doc.createdAt ?? null,
});

export const toPostDetailDto = (doc) => ({
  ...toPostSummaryDto(doc),
  content: doc.content ?? '',
  video: doc.video ?? null,
  comments: doc.comments
    .map((comment, index) => (comment == null ? null : toCommentDto(comment, index, doc._id)))
    .filter(Boolean)
    .reverse(),
});

export const toPostFields = ({ title, subtitle, description, content, color, image, video, tags, ...rest }) => {
  const mapped = {
    baslik: title,
    ufakbaslik: subtitle,
    acikla: description,
    aciklaiki: content,
    renk: color,
    selectedFile: image,
    video,
    tags,
    ...rest,
  };
  return Object.fromEntries(Object.entries(mapped).filter(([, value]) => value !== undefined));
};

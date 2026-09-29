import mongoose from 'mongoose';
import { AppError } from '../../shared/errors/AppError.js';
import { ROLES } from '../../shared/security/token.js';
import { User } from '../users/user.model.js';
import { Post } from './post.model.js';
import {
  detailProjection,
  summaryProjection,
  toCommentDto,
  toPostDetailDto,
  toPostFields,
  toPostSummaryDto,
} from './post.dto.js';

const DATA_URL = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i;

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

const notFound = () => AppError.notFound('Gönderi bulunamadı');

const buildListFilter = ({ cursor, tag, q }) => {
  const filter = {};

  if (cursor) filter._id = { $lt: toObjectId(cursor) };
  if (tag) filter.tags = new RegExp(`^${escapeRegex(tag)}$`, 'i');

  if (q) {
    const pattern = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ baslik: pattern }, { acikla: pattern }, { tags: pattern }];
  }

  return filter;
};

export const listPosts = async ({ cursor, limit, tag, q }, viewerId) => {
  const docs = await Post.aggregate([
    { $match: buildListFilter({ cursor, tag, q }) },
    { $sort: { _id: -1 } },
    { $limit: limit + 1 },
    { $project: summaryProjection(viewerId) },
  ]);

  const hasMore = docs.length > limit;
  const items = (hasMore ? docs.slice(0, limit) : docs).map(toPostSummaryDto);

  return { items, nextCursor: hasMore ? items.at(-1).id : null };
};

export const getPost = async (id, viewerId) => {
  const [doc] = await Post.aggregate([
    { $match: { _id: toObjectId(id) } },
    { $project: detailProjection(viewerId) },
  ]);

  if (!doc) throw notFound();
  return toPostDetailDto(doc);
};

export const getPostImage = async (id) => {
  const post = await Post.findById(id, { selectedFile: 1 }).lean();
  if (!post?.selectedFile) throw notFound();

  const match = DATA_URL.exec(post.selectedFile);
  if (match) {
    return { contentType: match[1], buffer: Buffer.from(match[2], 'base64') };
  }

  return { redirect: post.selectedFile };
};

export const createPost = async (body) => {
  const post = await Post.create(toPostFields(body));
  return getPost(post._id);
};

export const updatePost = async (id, body) => {
  const updated = await Post.findByIdAndUpdate(id, toPostFields(body), {
    runValidators: true,
    projection: { _id: 1 },
  });
  if (!updated) throw notFound();
  return getPost(id);
};

export const deletePost = async (id) => {
  const deleted = await Post.findByIdAndDelete(id, { projection: { _id: 1 } });
  if (!deleted) throw notFound();
};

const resolveAuthor = async ({ id, role }) => {
  if (role === ROLES.ADMIN) return { id, name: 'Yönetici' };

  const user = await User.findById(id, { firstName: 1, lastName: 1 }).lean();
  if (!user) throw AppError.unauthorized();

  return { id, name: `${user.firstName} ${user.lastName}`.trim() };
};

export const addComment = async (id, text, viewer) => {
  const author = await resolveAuthor(viewer);
  const comment = { _id: new mongoose.Types.ObjectId(), text, author, createdAt: new Date() };

  const updated = await Post.findByIdAndUpdate(
    id,
    { $push: { comments: comment } },
    { projection: { _id: 1 }, timestamps: false },
  ).lean();

  if (!updated) throw notFound();

  return toCommentDto(comment, 0, id);
};

export const likePost = async (id, userId) => {
  const viewer = toObjectId(userId);

  const updated = await Post.findOneAndUpdate(
    { _id: id, likes: { $ne: viewer } },
    { $addToSet: { likes: viewer }, $inc: { likeCount: 1 } },
    { returnDocument: 'after', timestamps: false, projection: { likeCount: 1 } },
  ).lean();

  if (updated) return { liked: true, likeCount: updated.likeCount };

  const current = await Post.findById(id, { likeCount: 1 }).lean();
  if (!current) throw notFound();
  return { liked: true, likeCount: current.likeCount };
};

export const unlikePost = async (id, userId) => {
  const viewer = toObjectId(userId);

  const updated = await Post.findOneAndUpdate(
    { _id: id, likes: viewer },
    { $pull: { likes: viewer }, $inc: { likeCount: -1 } },
    { returnDocument: 'after', timestamps: false, projection: { likeCount: 1 } },
  ).lean();

  if (updated) return { liked: false, likeCount: Math.max(updated.likeCount, 0) };

  const current = await Post.findById(id, { likeCount: 1 }).lean();
  if (!current) throw notFound();
  return { liked: false, likeCount: Math.max(current.likeCount, 0) };
};

export const registerView = async (id) => {
  const updated = await Post.findByIdAndUpdate(
    id,
    { $inc: { goruntuCount: 1 } },
    { returnDocument: 'after', timestamps: false, projection: { goruntuCount: 1 } },
  ).lean();

  if (!updated) throw notFound();
  return { viewCount: updated.goruntuCount };
};

export const getTrendingTags = async (limit) => {
  const rows = await Post.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: { $toLower: '$tags' }, count: { $sum: 1 } } },
    { $sort: { count: -1, _id: 1 } },
    { $limit: limit },
  ]);

  return rows.map(({ _id, count }) => ({ tag: _id, count }));
};

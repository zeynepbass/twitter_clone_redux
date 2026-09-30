import * as postsService from './posts.service.js';

const IMAGE_CACHE = 'public, max-age=31536000, immutable';

export const list = async (req, res) => {
  res.json(await postsService.listPosts(req.valid.query, req.user?.id));
};

export const trending = async (req, res) => {
  res.set('Cache-Control', 'public, max-age=60');
  res.json(await postsService.getTrendingTags(req.valid.query.limit));
};

export const show = async (req, res) => {
  res.json(await postsService.getPost(req.valid.params.id, req.user?.id));
};

export const image = async (req, res) => {
  const { w: width, v: version } = req.valid.query;
  const result = await postsService.getPostImage(req.valid.params.id, { width });

  if (result.redirect) return res.redirect(302, result.redirect);

  res.set({
    'Content-Type': result.contentType,
    'Cache-Control': version ? IMAGE_CACHE : 'public, max-age=300',
  });
  res.send(result.buffer);
};

export const create = async (req, res) => {
  res.status(201).json(await postsService.createPost(req.valid.body));
};

export const update = async (req, res) => {
  res.json(await postsService.updatePost(req.valid.params.id, req.valid.body));
};

export const remove = async (req, res) => {
  await postsService.deletePost(req.valid.params.id);
  res.status(204).end();
};

export const comment = async (req, res) => {
  res.status(201).json(await postsService.addComment(req.valid.params.id, req.valid.body.text, req.user));
};

export const like = async (req, res) => {
  res.json(await postsService.likePost(req.valid.params.id, req.user.id));
};

export const unlike = async (req, res) => {
  res.json(await postsService.unlikePost(req.valid.params.id, req.user.id));
};

export const view = async (req, res) => {
  res.json(await postsService.registerView(req.valid.params.id));
};

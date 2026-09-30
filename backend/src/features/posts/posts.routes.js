import { Router } from 'express';
import { authenticate, optionalAuth, requireAdmin, requireRole } from '../../shared/middleware/auth.js';
import { ROLES } from '../../shared/security/token.js';
import { validate } from '../../shared/middleware/validate.js';
import * as controller from './posts.controller.js';
import {
  commentBody,
  createPostBody,
  idParams,
  imageQuery,
  listPostsQuery,
  trendingQuery,
  updatePostBody,
} from './posts.schemas.js';

const router = Router();

const withId = validate({ params: idParams });
const requireUser = [authenticate, requireRole(ROLES.USER, ROLES.ADMIN)];

router
  .route('/')
  .get(optionalAuth, validate({ query: listPostsQuery }), controller.list)
  .post(authenticate, requireAdmin, validate({ body: createPostBody }), controller.create);

router.get('/trending-tags', validate({ query: trendingQuery }), controller.trending);

router
  .route('/:id')
  .get(optionalAuth, withId, controller.show)
  .patch(authenticate, requireAdmin, withId, validate({ body: updatePostBody }), controller.update)
  .delete(authenticate, requireAdmin, withId, controller.remove);

router.get('/:id/image', withId, validate({ query: imageQuery }), controller.image);
router.post('/:id/views', withId, controller.view);
router.post('/:id/comments', ...requireUser, withId, validate({ body: commentBody }), controller.comment);

router
  .route('/:id/like')
  .all(authenticate, requireRole(ROLES.USER), withId)
  .put(controller.like)
  .delete(controller.unlike);

export default router;

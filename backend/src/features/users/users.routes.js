import { Router } from 'express';
import { authenticate, requireAdmin, requireSelfOrAdmin } from '../../shared/middleware/auth.js';
import { validate } from '../../shared/middleware/validate.js';
import * as controller from './users.controller.js';
import { idParams, updateUserBody } from './users.schemas.js';

const router = Router();

router.use(authenticate);

router.get('/', requireAdmin, controller.list);

router
  .route('/:id')
  .all(validate({ params: idParams }), requireSelfOrAdmin())
  .get(controller.show)
  .patch(validate({ body: updateUserBody }), controller.update)
  .delete(controller.remove);

export default router;

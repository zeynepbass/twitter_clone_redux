import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authenticate } from '../../shared/middleware/auth.js';
import { validate } from '../../shared/middleware/validate.js';
import * as controller from './auth.controller.js';
import { loginBody, registerBody } from './auth.schemas.js';

const router = Router();

const credentialsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Çok fazla deneme yaptınız, lütfen daha sonra tekrar deneyin' },
});

router.post('/register', credentialsLimiter, validate({ body: registerBody }), controller.register);
router.post('/login', credentialsLimiter, validate({ body: loginBody }), controller.login);
router.post('/admin/login', credentialsLimiter, validate({ body: loginBody }), controller.loginAdmin);
router.get('/me', authenticate, controller.me);

export default router;

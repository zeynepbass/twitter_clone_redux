import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export const ROLES = Object.freeze({ USER: 'user', ADMIN: 'admin' });

export const signToken = ({ id, role }) =>
  jwt.sign({ role }, env.JWT_SECRET, {
    subject: String(id),
    expiresIn: env.JWT_EXPIRES_IN,
  });

export const verifyToken = (token) => {
  const payload = jwt.verify(token, env.JWT_SECRET);
  return { id: payload.sub, role: payload.role };
};

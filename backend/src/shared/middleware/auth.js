import { AppError } from '../errors/AppError.js';
import { ROLES, verifyToken } from '../security/token.js';

const readToken = (req) => {
  const [scheme, token] = req.headers.authorization?.split(' ') ?? [];
  return scheme === 'Bearer' && token ? token : null;
};

const resolveUser = (req) => {
  const token = readToken(req);
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    throw AppError.unauthorized('Oturumunuzun süresi doldu, lütfen tekrar giriş yapın');
  }
};

export const authenticate = (req, _res, next) => {
  const user = resolveUser(req);
  if (!user) return next(AppError.unauthorized());
  req.user = user;
  next();
};

export const optionalAuth = (req, _res, next) => {
  req.user = resolveUser(req);
  next();
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(AppError.forbidden());
  next();
};

export const requireAdmin = requireRole(ROLES.ADMIN);

export const requireSelfOrAdmin = (param = 'id') => (req, _res, next) => {
  const { user } = req;
  if (user?.role === ROLES.ADMIN || user?.id === req.params[param]) return next();
  next(AppError.forbidden());
};

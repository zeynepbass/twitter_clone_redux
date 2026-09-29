import { AppError } from '../../shared/errors/AppError.js';
import { ROLES, signToken } from '../../shared/security/token.js';
import { User } from '../users/user.model.js';
import { toUserDto } from '../users/user.dto.js';
import { Admin } from './admin.model.js';

const INVALID_CREDENTIALS = 'E-posta veya parola hatalı';

const createSession = (user) => ({
  user,
  token: signToken({ id: user.id, role: user.role }),
});

export const register = async ({ firstName, lastName, email, password }) => {
  if (await User.exists({ email })) {
    throw AppError.conflict('Bu e-posta adresi zaten kayıtlı');
  }

  const user = await User.create({ firstName, lastName, email, password });
  return createSession(toUserDto(user));
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw AppError.unauthorized(INVALID_CREDENTIALS);
  }

  return createSession(toUserDto(user));
};

export const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw AppError.unauthorized(INVALID_CREDENTIALS);
  }

  return createSession({ id: String(admin._id), email: admin.email, role: ROLES.ADMIN });
};

export const getCurrentUser = async ({ id, role }) => {
  if (role === ROLES.ADMIN) {
    const admin = await Admin.findById(id).lean();
    if (!admin) throw AppError.unauthorized();
    return { id: String(admin._id), email: admin.email, role: ROLES.ADMIN };
  }

  const user = await User.findById(id).lean();
  if (!user) throw AppError.unauthorized();
  return toUserDto(user);
};

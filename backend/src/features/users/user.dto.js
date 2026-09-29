import { ROLES } from '../../shared/security/token.js';

export const toUserDto = (user) => ({
  id: String(user._id),
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  avatar: user.selectedFile ?? null,
  role: ROLES.USER,
  createdAt: user.createdAt ?? null,
});

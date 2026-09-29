import { AppError } from '../../shared/errors/AppError.js';
import { User } from './user.model.js';
import { toUserDto } from './user.dto.js';

const findUserOrThrow = async (id, { withPassword = false } = {}) => {
  const query = User.findById(id);
  if (withPassword) query.select('+password');
  const user = await query;
  if (!user) throw AppError.notFound('Kullanıcı bulunamadı');
  return user;
};

export const listUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  return users.map(toUserDto);
};

export const getUser = async (id) => toUserDto(await findUserOrThrow(id));

export const updateUser = async (id, { avatar, ...fields }) => {
  const user = await findUserOrThrow(id, { withPassword: Boolean(fields.password) });

  Object.assign(user, fields);
  if (avatar !== undefined) user.selectedFile = avatar ?? undefined;

  await user.save();
  return toUserDto(user);
};

export const deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) throw AppError.notFound('Kullanıcı bulunamadı');
};

import mongoose from 'mongoose';
import { AppError } from '../errors/AppError.js';
import { env } from '../../config/env.js';

const normalize = (error) => {
  if (error instanceof AppError) return error;

  if (error instanceof mongoose.Error.CastError) {
    return AppError.badRequest('Geçersiz kimlik');
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const details = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));
    return AppError.badRequest(details[0]?.message, details);
  }

  if (error?.code === 11000) {
    return AppError.conflict('Bu e-posta adresi zaten kayıtlı');
  }

  if (error?.type === 'entity.too.large') {
    return new AppError(413, 'İstek boyutu çok büyük');
  }

  if (error?.type === 'entity.parse.failed') {
    return AppError.badRequest('Geçersiz JSON gövdesi');
  }

  return new AppError(500, 'Beklenmeyen bir hata oluştu');
};

export const notFoundHandler = (_req, _res, next) => {
  next(AppError.notFound('İstenen kaynak bulunamadı'));
};

export const errorHandler = (error, _req, res, _next) => {
  const appError = normalize(error);

  const body = { message: appError.message };
  if (appError.details) body.details = appError.details;
  if (!env.isProduction && appError.statusCode === 500) body.stack = error?.stack;

  res.status(appError.statusCode).json(body);
};

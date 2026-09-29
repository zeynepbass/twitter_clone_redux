import mongoose from 'mongoose';
import { z } from 'zod';

export const objectId = z
  .string()
  .refine((value) => mongoose.isValidObjectId(value), { message: 'Geçersiz kimlik' });

export const idParams = z.object({ id: objectId });

export const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email('Geçerli bir e-posta adresi girin'));

export const password = z
  .string()
  .min(6, 'Parola en az 6 karakter olmalı')
  .max(128, 'Parola en fazla 128 karakter olabilir');

import { z } from 'zod';
import { email, idParams, password } from '../../shared/validation.js';

export { idParams };

const name = z.string().trim().min(1, 'Bu alan zorunludur').max(50, 'En fazla 50 karakter olabilir');

export const updateUserBody = z
  .object({
    firstName: name.optional(),
    lastName: name.optional(),
    email: email.optional(),
    password: password.optional(),
    avatar: z.string().max(2_000_000, 'Profil görseli çok büyük').nullable().optional(),
  })
  .strict()
  .refine((body) => Object.keys(body).length > 0, { message: 'Güncellenecek alan bulunamadı' });

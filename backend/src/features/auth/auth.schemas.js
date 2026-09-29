import { z } from 'zod';
import { email, password } from '../../shared/validation.js';

const name = z.string().trim().min(1, 'Bu alan zorunludur').max(50, 'En fazla 50 karakter olabilir');

export const registerBody = z
  .object({
    firstName: name,
    lastName: name,
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((body) => body.password === body.confirmPassword, {
    message: 'Parolalar eşleşmiyor',
    path: ['confirmPassword'],
  });

export const loginBody = z.object({
  email,
  password: z.string().min(1, 'Parola zorunludur'),
});

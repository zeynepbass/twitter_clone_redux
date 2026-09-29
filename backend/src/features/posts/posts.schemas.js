import { z } from 'zod';
import { idParams, objectId } from '../../shared/validation.js';

export { idParams };

const MAX_IMAGE_LENGTH = 8_000_000;

const tag = z
  .string()
  .trim()
  .toLowerCase()
  .transform((value) => value.replace(/^#+/, ''))
  .pipe(z.string().min(1).max(50));

export const listPostsQuery = z.object({
  cursor: objectId.optional(),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  tag: tag.optional(),
  q: z.string().trim().max(100).optional(),
});

const postBody = z.object({
  title: z.string().trim().min(1, 'Başlık zorunludur').max(200),
  subtitle: z.string().trim().max(200).optional(),
  description: z.string().trim().max(5_000).optional(),
  content: z.string().trim().max(50_000).optional(),
  color: z.string().trim().max(30).optional(),
  image: z.string().max(MAX_IMAGE_LENGTH, 'Görsel çok büyük').optional(),
  video: z.string().trim().max(2_000).optional(),
  film: z.string().trim().max(2_000).optional(),
  top10: z.string().trim().max(2_000).optional(),
  yeni: z.string().trim().max(2_000).optional(),
  tags: z.array(tag).max(20).optional(),
});

export const createPostBody = postBody.strict();

export const updatePostBody = postBody
  .partial()
  .strict()
  .refine((body) => Object.keys(body).length > 0, { message: 'Güncellenecek alan bulunamadı' });

export const commentBody = z.object({
  text: z.string().trim().min(1, 'Yorum boş olamaz').max(280, 'Yorum en fazla 280 karakter olabilir'),
});

export const trendingQuery = z.object({
  limit: z.coerce.number().int().min(1).max(20).default(5),
});

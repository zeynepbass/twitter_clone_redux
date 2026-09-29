import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(9380),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const fields = Object.keys(z.flattenError(parsed.error).fieldErrors).join(', ');
  throw new Error(`Invalid environment configuration: ${fields}`);
}

export const env = Object.freeze({
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  clientOrigins: parsed.data.CLIENT_URL
    ? parsed.data.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
    : [],
});

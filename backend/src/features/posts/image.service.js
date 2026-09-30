import sharp from 'sharp';
import { LruCache } from '../../shared/lib/LruCache.js';

export const IMAGE_WIDTHS = Object.freeze([320, 480, 640, 960, 1280]);

const DATA_URL = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i;
const RESIZABLE = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);
const WEBP_QUALITY = 72;

const cache = new LruCache({ maxSize: 64 * 1024 * 1024, sizeOf: (entry) => entry.buffer.length });

const decodeDataUrl = (value) => {
  const match = DATA_URL.exec(value);
  return match ? { contentType: match[1].toLowerCase(), buffer: Buffer.from(match[2], 'base64') } : null;
};

const resize = async (image, width) => {
  if (!width || !RESIZABLE.has(image.contentType)) return image;

  try {
    const buffer = await sharp(image.buffer, { animated: false })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
    return buffer.length < image.buffer.length ? { contentType: 'image/webp', buffer } : image;
  } catch {
    return image;
  }
};

export const renderImage = async ({ key, source, width }) => {
  const cacheKey = `${key}:${width ?? 'original'}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const decoded = decodeDataUrl(source);
  if (!decoded) return null;

  const result = await resize(decoded, width);
  cache.set(cacheKey, result);
  return result;
};

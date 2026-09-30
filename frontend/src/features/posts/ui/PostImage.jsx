import { resolveAssetUrl } from '../../../shared/lib/format';
import { cn } from '../../../shared/lib/cn';

const WIDTHS = [320, 480, 640, 960, 1280];
const DEFAULT_WIDTH = 640;
const SIZES = '(min-width: 600px) 566px, calc(100vw - 32px)';

const withWidth = (url, width) => `${url}${url.includes('?') ? '&' : '?'}w=${width}`;

export const PostImage = ({ src, eager = false, priority = false, className }) => {
  const url = resolveAssetUrl(src);
  if (!url) return null;

  const resizable = src.startsWith('/api/');

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line bg-elevated', className)}>
      <img
        src={resizable ? withWidth(url, DEFAULT_WIDTH) : url}
        srcSet={resizable ? WIDTHS.map((width) => `${withWidth(url, width)} ${width}w`).join(', ') : undefined}
        sizes={resizable ? SIZES : undefined}
        alt=""
        width="1200"
        height="675"
        loading={eager || priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className="aspect-video w-full object-cover"
      />
    </div>
  );
};

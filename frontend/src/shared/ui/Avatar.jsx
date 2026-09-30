import { cn } from '../lib/cn';

export const Avatar = ({ name = '', src, className }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('tr-TR'))
    .join('');

  if (src) {
    return (
      <img
        src={src}
        alt=""
        width="40"
        height="40"
        loading="lazy"
        decoding="async"
        className={cn('size-10 shrink-0 rounded-full object-cover', className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full bg-elevated text-sm font-bold text-fg',
        className,
      )}
    >
      {initials || '?'}
    </span>
  );
};

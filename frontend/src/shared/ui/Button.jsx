import { cn } from '../lib/cn';
import { Spinner } from './Spinner';

const VARIANTS = {
  primary: 'bg-fg text-black hover:bg-[#d7dbdc]',
  outline: 'border border-line text-fg hover:bg-white/10',
  ghost: 'text-fg hover:bg-white/10',
};

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-13 px-8 text-base',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
      VARIANTS[variant],
      SIZES[size],
      className,
    )}
    {...props}
  >
    {loading ? <Spinner className="[&>span:first-child]:size-4" /> : children}
  </button>
);

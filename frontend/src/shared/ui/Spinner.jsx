import { cn } from '../lib/cn';

export const Spinner = ({ className, label = 'Yükleniyor' }) => (
  <span role="status" className={cn('inline-flex items-center justify-center', className)}>
    <span className="size-6 animate-spin rounded-full border-2 border-brand/30 border-t-brand motion-reduce:animate-none" />
    <span className="sr-only">{label}</span>
  </span>
);

import { useId } from 'react';
import { cn } from '../lib/cn';

export const TextField = ({ label, error, className, ...props }) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div
        className={cn(
          'relative rounded-md border transition-colors focus-within:border-brand',
          error ? 'border-danger' : 'border-line',
        )}
      >
        <input
          id={id}
          placeholder=" "
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          className="peer w-full bg-transparent px-3 pt-6 pb-2 text-[17px] text-fg outline-none"
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-2 left-3 text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[17px] peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="mt-1 px-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

import { Icon } from './Icon';

export const SearchField = ({ value, onChange, placeholder = 'Ara' }) => (
  <div role="search" className="px-4 pb-3">
    <label className="flex h-11 items-center gap-3 rounded-full border border-transparent bg-elevated px-4 text-muted focus-within:border-brand focus-within:bg-black focus-within:text-brand">
      <Icon name="search" className="size-4 shrink-0" />
      <span className="sr-only">{placeholder}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[15px] text-fg placeholder:text-muted outline-none"
      />
    </label>
  </div>
);

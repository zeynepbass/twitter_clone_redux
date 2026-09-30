import { useNavigate } from 'react-router';
import { Icon } from './Icon';

export const PageHeader = ({ title, subtitle, back = false, children }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-black/80 backdrop-blur-md">
      <div className="flex min-h-14 items-center gap-6 px-4">
        {back && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Geri dön"
            className="-ml-2 rounded-full p-2 transition-colors hover:bg-white/10"
          >
            <Icon name="back" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold">{title}</h1>
          {subtitle && <p className="truncate text-sm text-muted">{subtitle}</p>}
        </div>
      </div>
      {children}
    </header>
  );
};

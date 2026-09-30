import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loggedOut, selectCurrentUser } from '../../features/auth/model/authSlice';
import { Avatar } from '../../shared/ui/Avatar';
import { Icon, Logo } from '../../shared/ui/Icon';
import { cn } from '../../shared/lib/cn';
import { NAV_ITEMS } from './navigation';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();

  return (
    <header className="sticky top-0 hidden h-dvh w-[72px] shrink-0 flex-col items-center px-2 py-1 sm:flex xl:w-[275px] xl:items-stretch">
      <NavLink to="/" aria-label="Ana sayfa" className="mb-1 flex size-13 items-center justify-center rounded-full hover:bg-white/10">
        <Logo className="size-8 text-fg" />
      </NavLink>

      <nav aria-label="Ana menü" className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex w-fit items-center gap-5 rounded-full p-3 text-xl transition-colors hover:bg-white/10 xl:pr-6',
                isActive && 'font-bold',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={icon} className={cn('size-7', isActive && 'stroke-[2.6]')} />
                <span className="sr-only xl:not-sr-only">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto mb-3 flex items-center gap-3 rounded-full p-3 xl:w-full">
        <Avatar name={fullName} src={user?.avatar} className="hidden xl:flex" />
        <div className="hidden min-w-0 flex-1 xl:block">
          <p className="truncate text-[15px] font-bold">{fullName}</p>
          <p className="truncate text-[15px] text-muted">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(loggedOut())}
          aria-label="Çıkış yap"
          title="Çıkış yap"
          className="rounded-full p-2 text-fg transition-colors hover:bg-white/10"
        >
          <Icon name="logout" />
        </button>
      </div>
    </header>
  );
};

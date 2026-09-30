import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { loggedOut } from '../../features/auth/model/authSlice';
import { Icon } from '../../shared/ui/Icon';
import { cn } from '../../shared/lib/cn';
import { NAV_ITEMS } from './navigation';

export const MobileNav = () => {
  const dispatch = useDispatch();

  return (
    <nav
      aria-label="Alt menü"
      className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t border-line bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden"
    >
      {NAV_ITEMS.map(({ to, label, icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          aria-label={label}
          className={({ isActive }) => cn('rounded-full p-3', isActive ? 'text-fg' : 'text-muted')}
        >
          <Icon name={icon} className="size-6" />
        </NavLink>
      ))}
      <button type="button" onClick={() => dispatch(loggedOut())} aria-label="Çıkış yap" className="rounded-full p-3 text-muted">
        <Icon name="logout" className="size-6" />
      </button>
    </nav>
  );
};

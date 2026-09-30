import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Spinner } from '../../shared/ui/Spinner';
import { MobileNav } from './MobileNav';
import { RightPanel } from './RightPanel';
import { Sidebar } from './Sidebar';

export const MainLayout = () => (
  <div className="mx-auto flex min-h-dvh max-w-[1265px] justify-center">
    <Sidebar />
    <main className="min-h-dvh w-full max-w-[600px] min-w-0 border-line pb-16 sm:border-x sm:pb-0">
      <Suspense fallback={<Spinner className="w-full py-10" />}>
        <Outlet />
      </Suspense>
    </main>
    <RightPanel />
    <MobileNav />
  </div>
);

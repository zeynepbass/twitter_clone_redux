import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { GuestRoute, ProtectedRoute } from '../features/auth/ui/RouteGuards';
import { Spinner } from '../shared/ui/Spinner';
import { MainLayout } from './layout/MainLayout';
import HomePage from '../features/posts/pages/HomePage';

const TagPage = lazy(() => import('../features/posts/pages/TagPage'));
const PostDetailPage = lazy(() => import('../features/posts/pages/PostDetailPage'));
const LoginPage = lazy(() => import('../features/auth/ui/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/ui/RegisterPage'));

const FullPageFallback = () => <Spinner className="h-dvh w-full" />;

export const App = () => (
  <Suspense fallback={<FullPageFallback />}>
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/giris-yap" element={<LoginPage />} />
        <Route path="/uye-ol" element={<RegisterPage />} />
        <Route path="/üye-ol" element={<Navigate to="/uye-ol" replace />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/populer" element={<TagPage />} />
          <Route path="/etiket/:tag" element={<TagPage />} />
          <Route path="/detay/:id" element={<PostDetailPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

import { Logo } from '../../../shared/ui/Icon';

export const AuthLayout = ({ title, children, footer }) => (
  <div className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
    <div className="relative hidden overflow-hidden lg:block">
      <img
        src="/images/cover.jpg"
        alt=""
        width="800"
        height="587"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Logo className="size-2/5 max-w-80 text-white drop-shadow-2xl" />
      </div>
    </div>

    <main className="flex items-center justify-center px-6 py-12 sm:px-12">
      <div className="w-full max-w-sm">
        <Logo className="size-10 text-fg" />
        <h1 className="mt-10 mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {children}
        {footer && <p className="mt-10 text-[15px] text-muted">{footer}</p>}
      </div>
    </main>
  </div>
);

import { TrendingTags } from '../../features/posts/ui/TrendingTags';

export const RightPanel = () => (
  <aside className="sticky top-0 hidden h-dvh w-[350px] shrink-0 flex-col gap-4 overflow-y-auto py-3 pl-8 lg:flex">
    <TrendingTags />
    <footer className="px-4 text-[13px] text-muted">
      <p>© {new Date().getFullYear()} Twitter Clone</p>
    </footer>
  </aside>
);

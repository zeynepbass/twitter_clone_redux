export const PostSkeleton = ({ count = 3 }) => (
  <div aria-hidden="true">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="animate-pulse border-b border-line px-4 py-4 motion-reduce:animate-none">
        <div className="h-3 w-24 rounded bg-elevated" />
        <div className="mt-3 h-4 w-3/4 rounded bg-elevated" />
        <div className="mt-2 h-4 w-1/2 rounded bg-elevated" />
        <div className="mt-4 aspect-video w-full rounded-2xl bg-elevated" />
      </div>
    ))}
  </div>
);

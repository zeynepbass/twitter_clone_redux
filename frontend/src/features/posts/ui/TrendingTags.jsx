import { Link } from 'react-router';
import { formatCount } from '../../../shared/lib/format';
import { useGetTrendingTagsQuery } from '../api/postsApi';

export const TrendingTags = () => {
  const { data: tags, isLoading, isError } = useGetTrendingTagsQuery(5);

  if (isError || (!isLoading && !tags?.length)) return null;

  return (
    <section aria-labelledby="trending-title" className="overflow-hidden rounded-2xl border border-line">
      <h2 id="trending-title" className="px-4 py-3 text-xl font-extrabold">
        Gündemdekiler
      </h2>
      {isLoading ? (
        <div className="space-y-4 px-4 pb-4" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-9 animate-pulse rounded bg-elevated motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <ol>
          {tags.map(({ tag, count }, index) => (
            <li key={tag}>
              <Link
                to={`/etiket/${encodeURIComponent(tag)}`}
                className="block px-4 py-3 transition-colors hover:bg-white/[0.03]"
              >
                <span className="block text-[13px] text-muted">{index + 1} · Gündemde</span>
                <span className="block font-bold">#{tag}</span>
                <span className="block text-[13px] text-muted">{formatCount(count)} gönderi</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

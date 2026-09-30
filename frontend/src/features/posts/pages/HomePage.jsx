import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PageHeader } from '../../../shared/ui/PageHeader';
import { SearchField } from '../../../shared/ui/SearchField';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';
import { PostFeed } from '../ui/PostFeed';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const debouncedQuery = useDebouncedValue(query.trim(), 350);

  useEffect(() => {
    setSearchParams(debouncedQuery ? { q: debouncedQuery } : {}, { replace: true });
  }, [debouncedQuery, setSearchParams]);

  return (
    <>
      <title>Ana sayfa / Twitter</title>
      <PageHeader title="Ana sayfa">
        <SearchField value={query} onChange={setQuery} placeholder="Gönderilerde ara" />
      </PageHeader>
      <PostFeed
        q={debouncedQuery || undefined}
        emptyTitle={debouncedQuery ? `"${debouncedQuery}" için sonuç yok` : 'Henüz gönderi yok'}
        emptyDescription={debouncedQuery ? 'Farklı bir kelimeyle aramayı deneyin.' : undefined}
      />
    </>
  );
};

export default HomePage;

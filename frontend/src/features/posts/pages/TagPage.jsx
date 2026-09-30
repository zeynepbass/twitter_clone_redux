import { useParams } from 'react-router';
import { PageHeader } from '../../../shared/ui/PageHeader';
import { PostFeed } from '../ui/PostFeed';

const DEFAULT_TAG = 'populer';

const TagPage = () => {
  const { tag = DEFAULT_TAG } = useParams();
  const isDefault = tag === DEFAULT_TAG;

  return (
    <>
      <title>{`#${tag} / Twitter`}</title>
      <PageHeader title={isDefault ? 'Popüler' : `#${tag}`} subtitle={isDefault ? '#populer' : 'Etiket'} back={!isDefault} />
      <PostFeed
        tag={tag}
        emptyTitle={`#${tag} etiketinde gönderi yok`}
        emptyDescription="Bu etiketle paylaşılan gönderiler burada görünecek."
      />
    </>
  );
};

export default TagPage;

import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { PageHeader } from '../../../shared/ui/PageHeader';
import { Spinner } from '../../../shared/ui/Spinner';
import { StatusMessage } from '../../../shared/ui/StatusMessage';
import { getErrorMessage } from '../../../shared/lib/format';
import { useGetPostQuery } from '../api/postsApi';
import { useRegisterView } from '../hooks/useRegisterView';
import { CommentForm } from '../ui/CommentForm';
import { CommentList } from '../ui/CommentList';
import { PostActions } from '../ui/PostActions';
import { PostImage } from '../ui/PostImage';
import { TagList } from '../ui/TagList';

const fullDate = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long', timeStyle: 'short' });

const PostDetailPage = () => {
  const { id } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { data: post, error, isLoading, isError, refetch } = useGetPostQuery(id);

  useRegisterView(post ? id : null);

  useEffect(() => {
    if (post && hash === '#yorumlar') {
      document.getElementById('yorumlar')?.scrollIntoView({ block: 'start' });
    }
  }, [post, hash]);

  return (
    <>
      <PageHeader title="Gönderi" back />

      {isLoading && <Spinner className="w-full py-10" />}

      {isError && (
        <StatusMessage
          title={error?.status === 404 ? 'Bu gönderi bulunamadı' : 'Gönderi yüklenemedi'}
          description={getErrorMessage(error)}
          action={error?.status === 404 ? 'Ana sayfaya dön' : 'Tekrar dene'}
          onAction={error?.status === 404 ? () => navigate('/') : refetch}
        />
      )}

      {post && (
        <>
          <title>{`${post.title} / Twitter`}</title>
          <article className="border-b border-line px-4 pt-3">
            {post.subtitle && <p className="text-[15px] text-muted">{post.subtitle}</p>}
            <h2 className="mt-1 text-2xl leading-7 font-extrabold">{post.title}</h2>
            {post.description && (
              <p className="mt-3 text-[17px] leading-6 whitespace-pre-line">{post.description}</p>
            )}
            <TagList tags={post.tags} />
            <PostImage src={post.image} priority className="mt-3" />
            {post.content && <p className="mt-3 text-[17px] leading-6 whitespace-pre-line">{post.content}</p>}
            {post.createdAt && (
              <p className="mt-4 border-b border-line pb-3 text-[15px] text-muted">
                <time dateTime={post.createdAt}>{fullDate.format(new Date(post.createdAt))}</time>
              </p>
            )}
            <PostActions post={post} className="py-1" />
          </article>

          <section id="yorumlar" aria-label="Yorumlar" className="scroll-mt-14">
            <CommentForm postId={post.id} />
            <CommentList comments={post.comments} />
          </section>
        </>
      )}
    </>
  );
};

export default PostDetailPage;

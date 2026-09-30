import { memo } from 'react';
import { Link } from 'react-router';
import { Icon } from '../../../shared/ui/Icon';
import { cn } from '../../../shared/lib/cn';
import { formatCount } from '../../../shared/lib/format';
import { useToggleLike } from '../hooks/useToggleLike';

export const PostActions = memo(function PostActions({ post, className }) {
  const toggleLike = useToggleLike();

  return (
    <div className={cn('relative z-10 flex max-w-md items-center justify-between text-[13px] text-muted', className)}>
      <Link
        to={`/detay/${post.id}#yorumlar`}
        className="group flex items-center gap-1 hover:text-brand"
      >
        <span className="rounded-full p-2 transition-colors group-hover:bg-brand/10">
          <Icon name="comment" className="size-[18px]" />
        </span>
        {formatCount(post.commentCount)}
        <span className="sr-only"> yorum</span>
      </Link>

      <button
        type="button"
        onClick={() => toggleLike(post)}
        aria-pressed={post.liked}
        className={cn('group flex items-center gap-1 hover:text-like', post.liked && 'text-like')}
      >
        <span className="rounded-full p-2 transition-colors group-hover:bg-like/10">
          <Icon name="heart" filled={post.liked} className="size-[18px]" />
        </span>
        {formatCount(post.likeCount)}
        <span className="sr-only"> beğeni</span>
      </button>

      <span className="flex items-center gap-1">
        <span className="p-2">
          <Icon name="views" className="size-[18px]" />
        </span>
        {formatCount(post.viewCount)}
        <span className="sr-only"> görüntülenme</span>
      </span>
    </div>
  );
});

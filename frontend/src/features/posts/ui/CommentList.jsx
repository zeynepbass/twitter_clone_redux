import { Avatar } from '../../../shared/ui/Avatar';
import { formatRelativeTime } from '../../../shared/lib/format';

export const CommentList = ({ comments }) => {
  if (!comments.length) {
    return <p className="px-4 py-8 text-center text-muted">İlk yorumu sen yap.</p>;
  }

  return (
    <ul>
      {comments.map((comment) => {
        const name = comment.author?.name ?? 'Anonim';
        return (
          <li key={comment.id} className="flex gap-3 border-b border-line px-4 py-3">
            <Avatar name={name} />
            <div className="min-w-0 flex-1">
              <p className="flex items-baseline gap-1 text-[15px]">
                <span className="truncate font-bold text-fg">{name}</span>
                {comment.createdAt && (
                  <>
                    <span aria-hidden="true" className="text-muted">
                      ·
                    </span>
                    <time dateTime={comment.createdAt} className="shrink-0 text-muted">
                      {formatRelativeTime(comment.createdAt)}
                    </time>
                  </>
                )}
              </p>
              <p className="mt-0.5 text-[15px] leading-5 break-words whitespace-pre-line">{comment.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

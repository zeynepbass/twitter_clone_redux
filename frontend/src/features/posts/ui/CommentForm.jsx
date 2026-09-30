import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../auth/model/authSlice';
import { Avatar } from '../../../shared/ui/Avatar';
import { Button } from '../../../shared/ui/Button';
import { getErrorMessage } from '../../../shared/lib/format';
import { useAddCommentMutation } from '../api/postsApi';

const MAX_LENGTH = 280;

export const CommentForm = ({ postId }) => {
  const user = useSelector(selectCurrentUser);
  const [text, setText] = useState('');
  const [addComment, { isLoading, error }] = useAddCommentMutation();

  const trimmed = text.trim();
  const remaining = MAX_LENGTH - text.length;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!trimmed) return;

    const result = await addComment({ postId, text: trimmed });
    if (!result.error) setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 border-b border-line px-4 py-3">
      <Avatar name={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`} src={user?.avatar} />
      <div className="min-w-0 flex-1">
        <label htmlFor="comment" className="sr-only">
          Yorumunuz
        </label>
        <textarea
          id="comment"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={MAX_LENGTH}
          rows={2}
          placeholder="Yanıtını gönder"
          className="w-full resize-none bg-transparent py-2 text-xl text-fg placeholder:text-muted outline-none"
        />
        {error && (
          <p role="alert" className="text-sm text-danger">
            {getErrorMessage(error)}
          </p>
        )}
        <div className="flex items-center justify-end gap-3 border-t border-line pt-3">
          <span className={remaining < 20 ? 'text-sm text-danger' : 'text-sm text-muted'} aria-live="polite">
            {remaining}
          </span>
          <Button type="submit" size="sm" loading={isLoading} disabled={!trimmed}>
            Yanıtla
          </Button>
        </div>
      </div>
    </form>
  );
};

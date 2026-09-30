import { Link } from 'react-router';

export const TagList = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <ul className="relative z-10 mt-2 flex flex-wrap gap-x-2 gap-y-1">
      {tags.map((tag) => (
        <li key={tag}>
          <Link to={`/etiket/${encodeURIComponent(tag)}`} className="text-[15px] text-brand hover:underline">
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

import { Button } from './Button';

export const StatusMessage = ({ title, description, action, onAction }) => (
  <div className="mx-auto flex max-w-sm flex-col items-center px-8 py-16 text-center">
    <p className="text-2xl font-extrabold text-fg">{title}</p>
    {description && <p className="mt-2 text-muted">{description}</p>}
    {action && (
      <Button className="mt-6" onClick={onAction}>
        {action}
      </Button>
    )}
  </div>
);

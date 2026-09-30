export const FormAlert = ({ message }) =>
  message ? (
    <p role="alert" className="rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-fg">
      {message}
    </p>
  ) : null;

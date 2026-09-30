import { Link } from 'react-router';
import { Button } from '../../../shared/ui/Button';
import { TextField } from '../../../shared/ui/TextField';
import { getErrorMessage } from '../../../shared/lib/format';
import { useLoginMutation } from '../api/authApi';
import { toFieldErrors } from '../lib/fieldErrors';
import { AuthLayout } from './AuthLayout';
import { FormAlert } from './FormAlert';

const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const fieldErrors = toFieldErrors(error);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <AuthLayout
      title="Twitter'a giriş yap"
      footer={
        <>
          Hesabın yok mu?{' '}
          <Link to="/uye-ol" className="text-brand underline underline-offset-2 hover:no-underline">
            Kaydol
          </Link>
        </>
      }
    >
      <title>Giriş yap / Twitter</title>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormAlert message={error && !Object.keys(fieldErrors).length ? getErrorMessage(error) : null} />
        <TextField label="E-posta" name="email" type="email" autoComplete="email" required error={fieldErrors.email} />
        <TextField
          label="Parola"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          error={fieldErrors.password}
        />
        <Button type="submit" size="lg" loading={isLoading} className="w-full">
          Giriş yap
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

import { Link } from 'react-router';
import { Button } from '../../../shared/ui/Button';
import { TextField } from '../../../shared/ui/TextField';
import { getErrorMessage } from '../../../shared/lib/format';
import { useRegisterMutation } from '../api/authApi';
import { toFieldErrors } from '../lib/fieldErrors';
import { AuthLayout } from './AuthLayout';
import { FormAlert } from './FormAlert';

const RegisterPage = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const fieldErrors = toFieldErrors(error);

  const handleSubmit = (event) => {
    event.preventDefault();
    register(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <AuthLayout
      title="Hesabını oluştur"
      footer={
        <>
          Zaten hesabın var mı?{' '}
          <Link to="/giris-yap" className="text-brand underline underline-offset-2 hover:no-underline">
            Giriş yap
          </Link>
        </>
      }
    >
      <title>Kaydol / Twitter</title>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormAlert message={error && !Object.keys(fieldErrors).length ? getErrorMessage(error) : null} />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Ad" name="firstName" autoComplete="given-name" required error={fieldErrors.firstName} />
          <TextField label="Soyad" name="lastName" autoComplete="family-name" required error={fieldErrors.lastName} />
        </div>
        <TextField label="E-posta" name="email" type="email" autoComplete="email" required error={fieldErrors.email} />
        <TextField
          label="Parola"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          error={fieldErrors.password}
        />
        <TextField
          label="Parola tekrar"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          error={fieldErrors.confirmPassword}
        />
        <Button type="submit" size="lg" loading={isLoading} className="w-full">
          Kaydol
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

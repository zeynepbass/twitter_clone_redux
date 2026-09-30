import { API_URL } from '../config/env';

const compact = new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 });
const relative = new Intl.RelativeTimeFormat('tr-TR', { numeric: 'auto', style: 'short' });
const absolute = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });

const UNITS = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
];

export const formatCount = (value) => compact.format(value ?? 0);

export const formatRelativeTime = (date) => {
  if (!date) return '';
  const seconds = Math.round((new Date(date).getTime() - Date.now()) / 1000);
  if (Math.abs(seconds) > UNITS[1][1]) return absolute.format(new Date(date));

  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit);
  }
  return 'şimdi';
};

export const resolveAssetUrl = (path) => {
  if (!path) return null;
  return path.startsWith('/') ? `${API_URL}${path}` : path;
};

export const getErrorMessage = (error, fallback = 'Bir hata oluştu, lütfen tekrar deneyin') => {
  if (!error) return null;
  if (error.status === 'FETCH_ERROR') return 'Sunucuya ulaşılamadı, bağlantınızı kontrol edin';
  return error.data?.message ?? fallback;
};

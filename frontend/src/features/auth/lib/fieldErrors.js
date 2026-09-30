export const toFieldErrors = (error) =>
  Object.fromEntries((error?.data?.details ?? []).map(({ field, message }) => [field, message]));

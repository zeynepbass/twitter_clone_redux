import { AppError } from '../errors/AppError.js';

export const validate = (schemas) => (req, _res, next) => {
  for (const [source, schema] of Object.entries(schemas)) {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return next(AppError.badRequest(details[0]?.message ?? 'Geçersiz istek', details));
    }

    req.valid = { ...req.valid, [source]: result.data };
  }

  next();
};

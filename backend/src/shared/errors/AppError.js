export class AppError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(message = 'Geçersiz istek', details) {
    return new AppError(400, message, details);
  }

  static unauthorized(message = 'Oturum açmanız gerekiyor') {
    return new AppError(401, message);
  }

  static forbidden(message = 'Bu işlem için yetkiniz yok') {
    return new AppError(403, message);
  }

  static notFound(message = 'Kayıt bulunamadı') {
    return new AppError(404, message);
  }

  static conflict(message = 'Kayıt zaten mevcut') {
    return new AppError(409, message);
  }
}

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/trekking';
export const SECRET = process.env.SECRET || 'som random secret key';
export const __PROD__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'qid';
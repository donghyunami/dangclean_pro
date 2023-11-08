const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ALGORITHN = process.env.JWT_ALGORITHN;
const JWT_SHORT_EXPIRESIN = process.env.JWT_SHORT_EXPIRESIN;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const NODE_ENV = process.env.NODE_ENV;
export default {
  MONGO_URI,
  JWT_SECRET,
  JWT_ALGORITHN,
  JWT_SHORT_EXPIRESIN,
  COOKIE_SECRET,
  CLIENT_URL,
  NODE_ENV
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/dev.js";

const { JWT_SECRET, JWT_ALGORITHN, JWT_SHORT_EXPIRESIN, JWT_LONG_EXPIRESIN } =
  config;

const JWT_AUTH = {
  matchPassword: async (userPassword, savedPassword) => {
    return await bcrypt.compare(userPassword, savedPassword);
  },
  generateToken: (payLoad) => {
    return jwt.sign(payLoad, JWT_SECRET, {
      algorithm: JWT_ALGORITHN,
      expiresIn: JWT_SHORT_EXPIRESIN
    });
  },
  generateRefleshToken: () => {
    return jwt.sign({}, JWT_SECRET, {
      JWT_ALGORITHN,
      expiresIn: JWT_LONG_EXPIRESIN
    });
  },
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { isDecode: true, decoded };
    } catch (error) {
      if (error.message === "jwt expired") {
        return { isDecode: false, message: error.message };
      } else {
        return { isDecode: false, message: "invalid Token" };
      }
    }
  },
  verifyRefleshToken: async (token, savedToken) => {
    if (token !== savedToken) {
      return { isDecode: false, message: "invalid Token" };
    } else {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { isDecode: true, decoded };
      } catch (error) {
        if (error.message === "jwt expired") {
          return { isDecode: false, message: error.message };
        } else {
          return { isDecode: false, message: "invalid Token" };
        }
      }
    }
  }
};

export default JWT_AUTH;

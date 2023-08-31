import User from "../models/user.js";
import JWT_AUTH from "../utils/jwt_auth.js";

let auth = async (req, res, next) => {
  let accessToken =
    // eslint-disable-next-line no-prototype-builtins
    req.headers.hasOwnProperty("authorization") &&
    req.headers.authorization.split("Bearer ")[1];
  if (!accessToken) {
    // 토큰 없음
    return res.status(401).json({ isOk: false, msg: "인증이 필요합니다." });
  }

  // 토큰 검증
  try {
    const isVerifyToken = await JWT_AUTH.verifyToken(accessToken);
    if (isVerifyToken.isDecode) {
      const user = await User.findOne({ email: isVerifyToken.decoded.email });
      const { password, token, ...userData } = user._doc;
      req.user = userData;
      next();
    } else {
      return res
        .status(403)
        .json({ isOk: false, msg: "토큰이 유효하지 않습니다." });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default auth;

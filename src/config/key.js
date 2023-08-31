import prodConfig from "./prod.js";
import devConfig from "./dev.js";

export default process.env.NODE_ENV === "production" ? prodConfig : devConfig;

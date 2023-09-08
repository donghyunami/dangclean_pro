export default process.env.NODE_ENV === "production"
  ? import("./prod.js")
  : import("./dev.js");
console.log("=======================\n mode:>", process.env.NODE_ENV);

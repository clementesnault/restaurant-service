const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const bearerHeader =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!bearerHeader) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }
  try {
    var parts = bearerHeader.split(" ");
    var scheme = parts[0];
    var credentials = parts[1];
    if (/^Bearer$/i.test(scheme) && parts.length === 2) {
      const decoded = jwt.verify(credentials, process.env.TOKEN_KEY);
      req.user = decoded;
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;

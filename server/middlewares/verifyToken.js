const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ success: false, message: "Not authorized. No token" });
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ");
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ success: false, message: "Wrong or expired token" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

module.exports = verifyToken;

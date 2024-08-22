const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const requireAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        return res.status(400).json({ message: "Authentication failed" });
      }
      next();
    });
  } else {
    res.status(400).json({ message: "You need to login first" });
  }
};

module.exports = requireAuth;

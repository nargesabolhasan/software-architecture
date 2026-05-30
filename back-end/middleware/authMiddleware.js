const jwt = require("jsonwebtoken");

const SECRET_KEY = "my-secret-key";

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
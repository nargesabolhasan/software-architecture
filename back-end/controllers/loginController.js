const jwt = require("jsonwebtoken");
const { getUsers } = require("../models/userModel");

const SECRET_KEY = "my-secret-key";

exports.login = (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({
      field: "username",
      message: "User not found",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      field: "password",
      message: "Incorrect password",
    });
  }

  const token = jwt.sign(
    {
      username: user.username,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    message: "Login successful",
  });
};
const { getUsers, saveUsers } = require("../models/userModel");

exports.register = (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();

  const exists = users.find(u => u.username === username);

  if (exists) {
    return res.status(400).json({
      field: "username",
      message: "Username already exists",
    });
  }

  users.push({ username, password });

  saveUsers(users);

  return res.json({
    success: true,
    message: "User registered",
  });
};
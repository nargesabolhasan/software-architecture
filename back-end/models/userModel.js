const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../dataBase/dataBase.json");

// Read users
function getUsers() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

module.exports = {
  getUsers,
  saveUsers,
};

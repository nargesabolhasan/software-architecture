const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const profileController = require("../controllers/profileController");
const logoutController = require("../controllers/logoutController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", registerController.register);

router.post("/login", loginController.login);

router.get("/profile", verifyToken, profileController.profile);

router.post("/logout", logoutController.logout);

module.exports = router;

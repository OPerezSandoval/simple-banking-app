const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  depositMoney,
  getBalance,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Deposit Money
router.post("/deposit", protect, depositMoney);

// Get Balance
router.get("/balance", protect, getBalance);

module.exports = router;

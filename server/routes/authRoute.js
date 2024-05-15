const {
  createUserController,
  loginUserController,
} = require("../controllers/authController");

const router = require("express").Router();

// create user route || POST
router.post("/", createUserController);

// login user route || POST
router.post("/login", loginUserController);

module.exports = router;

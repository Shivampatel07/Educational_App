const router = require("express").Router();
const urlEncoded = require("body-parser").urlencoded({ extended: false });
const {
  register,
  login,
  logout,
  updateUserData,
  deleteUserData,
  forgetPassword,
  updatePassword,
} = require("./../controllers/Usercontrollers");

router.post("/register", urlEncoded, register);
router.post("/login", urlEncoded, login);
router.get("/logout", logout);
router.post("/update", urlEncoded, updateUserData);
router.post("/delete", urlEncoded, deleteUserData);
router.post("/forgetpassword", urlEncoded, forgetPassword);
router.post("/updatepassword", urlEncoded, updatePassword);

module.exports = router;

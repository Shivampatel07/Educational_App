const router = require("express").Router();
const {
  Quiz,
  QuizIndividual,
  userDashboard,
  verifyUserByEmail,
  Blog,
  getExamData,
  contactUs
} = require("./../controllers/Apicontrollers");
const { QuizSubmissionData } = require("./../controllers/Quizsubmission");

router.get("/quiz", Quiz);
router.get("/quiz/:subject", QuizIndividual);
router.post("/quiz/submit", QuizSubmissionData);
router.get("/user", userDashboard);
router.get("/verify/:id", verifyUserByEmail);
router.get("/blog", Blog);
router.post("/exam/data",getExamData)
router.post("/contact", contactUs);

module.exports = router;

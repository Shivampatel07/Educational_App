const QuizData = require("./../models/Quizmodel");
const jwt = require("jsonwebtoken");
const User = require("./../models/Usermodel");

module.exports.QuizSubmissionData = async (req, res) => {
  try {
    const { quizanswer, quizmarks, quizname, username } = req.body;
    const data = await User.findOne({ username: username });
    const quizsubmission = new QuizData({
      userid: data._id,
      quizanswer,
      quizmarks,
      quizname,
    });
    quizsubmission.save();
    return res.json({
      message: `${username} , You scored ${quizmarks} marks `,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

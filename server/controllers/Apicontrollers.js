const quiz = require("./../MCQS.json");
const jwt = require("jsonwebtoken");
const User = require("./../models/Usermodel");
const QuizData = require("./../models/Quizmodel");
const blog = require("./../BLOG.json");
const Contact = require("./../models/Contactmodel");

module.exports.Quiz = (req, res) => {
  return res.json(quiz);
};

module.exports.QuizIndividual = (req, res) => {
  const subject = req.params.subject;
  const data = quiz.find((p) => p.subject === subject);
  return res.json(data);
};
module.exports.userDashboard = (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      let userData = {
        username: data.username,
        email: data.email,
      };
      if (data.institute) {
        userData.institute = data.institute;
      }
      if (data.name) {
        userData.name = data.name;
      }
      return res.json(userData);
    } else {
      return res.json({
        message: "No token found",
      });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports.verifyUserByEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const verifyUser = await User.updateOne(
      { _id: Object(id) },
      { $set: { is_verified: true } }
    );
    if (verifyUser.modifiedCount != 0) {
      return res.send(
        "<h1 style='text-align:center;'>Your email has been verified now.</h1>"
      );
    }
    return res.send("<h1>User not exist</h1>");
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports.Blog = (req, res) => {
  return res.json(blog);
};

module.exports.getExamData = async (req, res) => {
  const username = await req.body.username;
  const userData = await User.findOne({ username });
  if (userData) {
    const Data = await QuizData.find(
      { userid: userData._id },
      "quizanswer quizmarks quizname"
    );
    res.json(Data);
  } else {
    res.json({ message: "User Data not found" });
  }
};

module.exports.contactUs = async (req, res) => {
  try {
    const { name, email, subject } = await req.body;
    const contactData = new Contact({ name, email, subject });
    const contactDataSaved = await contactData.save();
    if (contactDataSaved) {
      return res.json({ message: "Data saved successfully" });
    }
    return res.json({ message: "Data not saved" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

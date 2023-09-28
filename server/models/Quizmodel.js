const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "StudentData",
    },
    quizanswer: {
      type: Object,
      required: true,
    },
    quizmarks: {
      type: Number,
      required: true,
    },
    quizname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
module.exports = mongoose.model("QuizData", StudentSchema);

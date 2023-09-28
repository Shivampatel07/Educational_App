const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_verified: {
      type: Boolean,
      required: true,
    },
    institute: { type: String, Default: "-" },
    name: { type: String, Default: "-" },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
module.exports = mongoose.model("StudentData", StudentSchema);

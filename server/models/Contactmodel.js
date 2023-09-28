const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
module.exports = mongoose.model("ContactData", ContactSchema);

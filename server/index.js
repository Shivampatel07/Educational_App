const expr = require("express");
const app = expr();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const apiFetch = require("./routes/apiFetch");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cp = require("cookie-parser");
// const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(expr.urlencoded({ extended: false }));
app.use(cp());
// app.use(expr.static(path.join(__dirname, "client/build")));

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/", apiFetch);

app.listen(port, () => {
  console.log(`http://localhost:${port}/  <--  Go on here`);
});

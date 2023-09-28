const User = require("./../models/Usermodel");
const QuizDataModel = require("./../models/Quizmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nm = require("nodemailer");

let otp;

var verifyMail = async (id, email) => {
  var trans = nm.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shivampatel0323@gmail.com",
      pass: "nwiphovmuprlhzxb",
    },
  });

  var mailOption = {
    from: "shivamptel0323@gmail.com",
    to: email,
    subject: "Verify with Eliscops coding",
    html: ` <div
        style="border: solid 2px black; border-radius:10px ;padding:15px; background-color:black ;color:white; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
        <h1 style="text-align:center;">Welcome to Eliscops</h1>
        <p style="text-align:justify; margin:15px">To verify your account, please click the button below in this email while logged
            in. This quick and secure process
            ensures your information remains protected. Your account's security is our top priority, and we appreciate
            your
            cooperation in maintaining a safe and trusted environment for all users.</p>
        <div style="display:flex;justify-content: center;"><img src="https://s3.amazonaws.com/libapps/accounts/44534/images/EDUCATION-text.jpg"
                style="width: 50vw;"> </div><br><br>
        <div style="display:flex;justify-content: center;"><button type='button'
                style="border-radius: 12px; padding: 8px 25px; background-color: white;"><a
                    style="text-decoration: none; color: black;font-size: 16px; "
                    href='http://localhost:8080/verify/${id}'>Verify</a></button> </div>
    </div>`,
  };

  await trans.sendMail(mailOption, (err, info) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.send("successfully sent");
    }
  });
};
var changePassword = async (email, username) => {
  var trans = nm.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shivampatel0323@gmail.com",
      pass: "nwiphovmuprlhzxb",
    },
  });

  var mailOption = {
    from: "shivamptel0323@gmail.com",
    to: email,
    subject: "OTP verification ",
    html: `<h1>Dear ${username}</h1><p>We are excited to confirm your registration! Your One-Time Password (OTP) is: ${otp}. Please use this OTP to complete the verification process. Thank you for choosing our services.</p><p>Best regards,</p><p>Eliscops coding</p>`,
  };

  await trans.sendMail(mailOption, (err, info) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.send("successfully sent");
    }
  });
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    let emailCheck = await User.findOne({ email });
    if (emailCheck) {
      if (!emailCheck.is_verified) {
        await User.deleteOne({ email });
        emailCheck = await User.findOne({ email });
      }
      if (emailCheck) {
        return res.json({ error: "Email already exist" });
      }
    }
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ error: "Username already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const studentData = new User({
      email,
      username,
      password: hashedPassword,
      is_verified: false,
    });
    await studentData.save();
    const newlyAdded = await User.findOne({ username });
    verifyMail(newlyAdded._id, email);
    delete User.password;
    return res.json({ User });
  } catch (ex) {
    return res.json({ error: ex.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await User.findOne({ username });
    if (data && data.is_verified) {
      const match = await bcrypt.compare(password, data.password);
      if (match) {
        const userData = await {
          username: data.username,
          email: data.email,
        };
        if (data.institute) {
          userData.institute = data.institute;
        }
        if (data.name) {
          userData.name = data.name;
        }
        const token = await jwt.sign(userData, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return await res
          .cookie("token", token, {
            secure: true,
            sameSite: "strict",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
          })
          .json({ message: "Login successgully" });
      } else {
        return res.json({ error: "Username or Password not match" });
      }
    } else {
      return res.json({ error: "User not exist" });
    }
  } catch (ex) {
    return res.json({ error: ex.message });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token").json({ message: "Logout successfully" });
};

module.exports.updateUserData = async (req, res) => {
  const userData = await req.body;
  let userRes = {};
  if (userData.username) {
    if (userData.name && userData.institute) {
      userRes = await User.updateOne(
        { username: userData.username },
        { $set: { name: userData.name, institute: userData.institute } }
      );
    } else if (userData.name) {
      userRes = await User.updateOne(
        { username: userData.username },
        { $set: { name: userData.name } }
      );
    } else if (userData.institute) {
      userRes = await User.updateOne(
        { username: userData.username },
        { $set: { institute: userData.institute } }
      );
    }
    if (userRes.modifiedCount != 0) {
      userData1 = {};
      const token1 = await req.cookies.token;
      const data = await jwt.verify(token1, process.env.JWT_SECRET);
      userData1 = { ...data, ...userData };
      await res.clearCookie("token");
      const token = await jwt.sign(userData1, process.env.JWT_SECRET);
      await res.cookie("token", token, {
        secure: true,
        sameSite: "strict",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.json({ message: "User data updated successfully" });
    } else {
      return res.json({ error: "User not found" });
    }
  } else {
    return res.json({ error: "User not found" });
  }
};

module.exports.deleteUserData = async (req, res) => {
  const { username } = req.body;
  const userData = await User.findOne({ username }).select("_id");
  const usersID = await userData._id;
  await User.deleteOne({ username });
  await QuizDataModel.deleteMany({ userid: usersID });
  return res
    .clearCookie("token")
    .json({ message: "User deleted successfully" });
};

module.exports.forgetPassword = async (req, res) => {
  const { username } = req.body;
  if (username) {
    const data = await User.findOne({ username });
    if (data && data.is_verified) {
      otp = parseInt(Math.random() * 1000000);
      changePassword(data.email, data.username);
      return res.json({ message: "OTP sent to your Email" });
    } else {
      return res.json({ error: "Username not found" });
    }
  } else {
    return res.json({ error: "Invalid Username" });
  }
};

module.exports.updatePassword = async (req, res) => {
  if (req.body.otp == otp) {
    const hashedPassword = await bcrypt.hash(req.body.createpassword, 10);
    userRes = await User.updateOne(
      { username: req.body.username },
      { $set: { password: hashedPassword } }
    );
    return res.json({ message: "password updated successfully" });
  } else {
    return res.json({ error: "OTP is not valid" });
  }
};

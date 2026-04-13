const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios"); 


// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, hashedPassword]
  );

  res.json({ message: "User registered successfully" });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password, captcha } = req.body;

  try {
    // ✅ Only verify captcha if it exists
    if (captcha) {
      const verify = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret: process.env.RECAPTCHA_SECRET,
            response: captcha,
          },
        }
      );

      if (!verify.data.success) {
        return res.status(400).json({ msg: "Captcha failed ❌" });
      }
    }

    // 🔐 LOGIN LOGIC
    const [users] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (users.length === 0)
      return res.status(400).json({ msg: "User not found" });

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

  
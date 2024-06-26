const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
      // return res.send(error(400, "All fields are required"));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      // return res.status(409).send("User is already registered");
      return res.send(error(409, "User is already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      user,
    });
  } catch (e) {
    console.log(e);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
      // return res.send(error(400, "All fields are required"));
    }

    const user = await User.findOne({ email }); // olduser
    if (!user) {
      return res.status(404).send("User is not registered");
      // return res.send(error(404, "User is not registered"));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(403).send("Incorrect password");
      // return res.send(error(403, "Incorrect password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
      email: user.email,
    });

    return res.json({ accessToken });
  } catch (e) {
    console.log(e);
  }
};

// internal func
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "15m",
    });
    console.log(token);
    return token;
  } catch (e) {
    console.log(e);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    console.log(token);
    return token;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signupController,
  loginController,
};

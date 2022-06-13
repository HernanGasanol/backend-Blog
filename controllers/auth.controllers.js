const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");
const { generateJWT } = require("../helpers/generateJWT.js");

//funciona
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      name,
      lastname,
      age,
      profilepic
    } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ ok: false, msg: "existing user" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      username,
      name,
      lastname,
      age,
      profilepic,
    });

    await user.save();

    return res.status(201).json({
      ok: true,
      msg: "user created successfully",
      user: {
        id: user._id,
        username,
        name,
        lastname,
        age,
        email,
        profilepic,

      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: "internal error",
    });

  }
};

//funciona

const login = async (req, res) => {
  const { email, password } = req.body;




  try {

    let user = await User.findOne({ email });

    if (user) {

      const validatePassword = await bcrypt.compare(password, user.password);

      if (!validatePassword) {
        return res.status(400).json({ ok: false, msg: "wrong credentials or nonexistent user" });
      }

      const { email, username, profilepic, posts, name, lastname, age } = user;

      const token = await generateJWT(user.id, email);

      return res.status(200).json({
        ok: true,
        msg: "successful login",
        user: {
          id: user._id,
          email,
          username,
          name,
          lastname,
          age,
          profilepic,
          posts,
          token,
        },
      });

    } else {
      return res.status(400).json({ ok: false, msg: "wrong credentials or nonexistent user" });
    }

  } catch (e) {
    console.log(e)

    return res.status(500).json({
      ok: false,
      msg: "internal error",
    });

  }
};

module.exports = {
  login,
  register,
};




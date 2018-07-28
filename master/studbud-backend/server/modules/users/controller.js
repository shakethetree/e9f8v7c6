import User from "./model";
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
const keys = require("../../config/db");

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "Name must be provided!" });
  } else if (typeof name !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Name must be a string!" });
  } else if (name.length > 32) {
    return res.status(400).json({ error: true, message: "Name too long!" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "Email must be provided!" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Email must be provided!" });
  } else if (password.length < 5) {
    return res
      .status(400)
      .json({ error: true, message: "Password too short!" });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Search user by email
  User.findOne({ email: email }).then(user => {
    // If user doesn't exist return error
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Validate password
    bcrypt.compare(password, user.password).then(isCorrect => {
      if (isCorrect) {
        // Create JWT payload, user._id
        const payload = { id: user._id, name: user.name, avatar: user.avatar };

        // Create JWT token
        jwt.sign(
          payload,
          keys.JWT_SECRET,
          { expiresIn: "30 days" },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
};

export const currentUser = async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

/*import { createToken } from './utils/createToken';
import { facebookAuth } from './utils/facebookAuth';
import { googleAuth } from './utils/googleAuth';

export const loginWithAuth0 = async (req, res) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  const { provider, token } = req.body;
  let userInfo;

  try {
    if (provider === 'google') {
      userInfo = await googleAuth(token);
    } else {
      userInfo = await facebookAuth(token);
    }

    const user = await User.findOrCreate(userInfo);

    console.log('====================================');
    console.log(user);
    console.log('====================================');

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
      },
      token: `JWT ${createToken(user)}`,
    });
  } catch (e) {
    return res.status(400).json({ error: true, errorMessage: e.message });
  }
};
*/

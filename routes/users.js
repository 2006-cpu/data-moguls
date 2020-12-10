const express = require("express");
const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET = 'dontTell' } = process.env;

const bcrypt = require("bcrypt");

const { getUserByUsername, createUser, getOrdersByUser, getUser } = require("../db");
const { requireUser } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    imageURL,
    isAdmin,
  } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
      return;
    }
    if (password.length < 8) {
      next({
        name: "ShortPassword",
        message: "Password Too Short!",
      });
      return;
    }
    const user = await createUser({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageURL: imageURL,
      isAdmin: isAdmin,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: 'Thank you for signing up!',
      token: token,
      user: user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "You are logged in!", token, username });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId/orders", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userOrders = await getOrdersByUser(userId);

    res.send(userOrders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const data = req.user;
    res.send(data);
  } catch (error) {
    throw error;
  };
});

module.exports = usersRouter;

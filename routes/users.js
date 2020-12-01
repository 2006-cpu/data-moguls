const express = require("express");
const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const bcrypt = require("bcrypt");

const { getUserByUsername, createUser, getOrderById, getOrderByUserId } = require("../db");
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
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
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
    const user = await getUserByUsername(username);
    console.log(user);
    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "you're logged in!", token });
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

usersRouter.get("/me", requireUser, async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next({
      name: "No auth",
      message: "You must be logged in to perform this action",
    });
    return;
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { username } = jwt.verify(token, JWT_SECRET);

      if (username) {
        req.user = await getUserByUsername(username);
        res.send({ username: req.user.username });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `You must be logged in to perform this action`,
    });
  }
});

usersRouter.get("/:userId/orders", requireUser, async (req, res, next) => {
  const {userId} = req.params;
  try {
    const userOrders = await getOrderByUserId({id:userId});

    res.send(userOrders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;

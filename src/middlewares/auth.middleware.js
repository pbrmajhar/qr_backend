const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Users = require("../models/user.model");

exports.authCheck = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).send({ error: "you must be logged in." });
    }

    jwt.verify(token, process.env.TOKEN_SECRATE, async (error, payload) => {
      if (error) {
        return res.status(401).send({ error: "you must be logged in." });
      }
      const { userId } = payload;
      const user = await Users.findById(userId);
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send({ error });
  }
};

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/user.model");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(404).send("Email not found!");
  }
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send("password not matched");
    }
    const token = jwt.sign({ userId: user._id }, "my_secrate_key");
    res.send({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token,
    });
  } catch (error) {}
});

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const response = await new Users({ fullname, email, password }).save();
    const token = jwt.sign(
      { user_id: response._id },
      process.env.TOKEN_SECRATE
    );
    res.send({
      _id: response._id,
      fullname: response.fullname,
      email: response.email,
      token,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;

const router = require("express").Router();
const { authCheck } = require("../middlewares/auth.middleware");
const Tokens = require("../models/token.model");

router.use(authCheck);

router.post("/create", async (req, res) => {
  try {
    const { fullname, number, price } = req.body;
    const adminId = req.user._id;
    const response = await new Tokens({
      fullname,
      number,
      price,
      admin: adminId,
    }).save();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;

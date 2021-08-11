const router = require("express").Router();
const { authCheck } = require("../middlewares/auth.middleware");
const Tokens = require("../models/token.model");

router.use(authCheck);

router.post("/create", async (req, res) => {
  try {
    const { fullname, phone, price } = req.body;
    const adminId = req.user._id;
    const response = await new Tokens({
      fullname,
      phone,
      price,
      admin: adminId,
    }).save();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/all", async (req, res) => {
  const response = await Tokens.find({}).sort([["createdAt", "desc"]]);
  res.send(response);
});

router.delete("/delete/:id", async (req, res) => {
  const response = await Tokens.deleteOne({ _id: req.params.id });
  res.send(response);
});

module.exports = router;

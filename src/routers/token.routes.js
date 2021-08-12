const router = require("express").Router();
const { authCheck } = require("../middlewares/auth.middleware");
const Tokens = require("../models/token.model");

// router.use(authCheck);

router.post("/create", authCheck, async (req, res) => {
  try {
    const { fullname, phone, price, used } = req.body;
    const adminId = req.user._id;
    const response = await new Tokens({
      fullname,
      phone,
      price,
      used,
      admin: adminId,
    }).save();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/all", authCheck, async (req, res) => {
  const { limit, sort, order, page } = req.query;
  const currentPage = page || 1;
  const perPage = limit;

  const response = await Tokens.find({})
    .skip((currentPage - 1) * perPage)
    .sort([[sort, order]])
    .limit(parseInt(limit));

  // const response = await req.user.populate({
  //   path: "tokens",
  //   match: {
  //     used: false,
  //   },
  // });

  res.send(response);
});

router.get("/count", async (req, res) => {
  const response = await Tokens.find({}).count();
  res.send({ response });
});

router.delete("/delete/:id", authCheck, async (req, res) => {
  const response = await Tokens.deleteOne({ _id: req.params.id });
  res.send(response);
});

module.exports = router;

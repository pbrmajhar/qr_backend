const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const tokenSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    phone: {
      type: Number,
    },
    price: {
      type: Number,
      require: true,
    },
    admin: {
      type: ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tokens", tokenSchema);

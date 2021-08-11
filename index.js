const express = require("express");
const mongoose = require("mongoose");
const bodyPaeser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyPaeser.json());
const mongoUri = process.env.DATABASE;

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

const authRouter = require("./src/routers/auth.routes");
const tokenRouter = require("./src/routers/token.routes");

app.use("/api/auth", authRouter);
app.use("/api/token", tokenRouter);

app.listen(PORT, () => console.log("server is running"));

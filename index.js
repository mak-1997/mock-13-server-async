const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { blogRoute } = require("./routes/blog.route");
const {checkAuthMiddleware} = require("./middleware/auth.middleware");

const app = express();

app.options("*", cors());
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/", userRouter);
app.use("/blogs",checkAuthMiddleware, blogRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
    console.log("failed to connect to the database");
  }
  console.log(`server is running on port ${process.env.port}`);
});

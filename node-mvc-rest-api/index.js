const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
const { connectMongoDb } = require("./connection");
const DATABASE_ENDPOINT = "mongodb://127.0.0.1:27017/rest-api-test";

// connect mongoDB
connectMongoDb(DATABASE_ENDPOINT);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// Routes
const userRouter = require("./routes/user");
app.use("/api/users", userRouter); // MATCH '/api/user' and then use 'userRouter'

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});

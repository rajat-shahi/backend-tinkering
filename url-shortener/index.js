const express = require("express");
const app = express();
const PORT = 8001;
const urlRouter = require("./routes/url");
const redirectRouter = require("./routes/redirect");
const { connectMongoDb } = require("./connection");
const DB_ENDPOINT = "mongodb://127.0.0.1:27017/short-url";
const url = require("./models/url");

connectMongoDb(DB_ENDPOINT);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// middlewares
app.use(express.json({ extended: false }));

app.use("/url", urlRouter);
app.use("/", redirectRouter);

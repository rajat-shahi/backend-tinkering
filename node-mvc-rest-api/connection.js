const mongoose = require("mongoose");

function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Mongo DB is connected");
    })
    .catch((err) => {
      console.error("Error occurred while connecting to DB : ", err);
    });
}

module.exports = {
  connectMongoDb,
};

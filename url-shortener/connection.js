const mongoose = require("mongoose");

function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then((conn) => {
      console.log("Mongo DB is connected");

      console.log("DB name : ", conn.connection.name);
      console.log("HOST : ", conn.connection.host);
      console.log("READY STATE : ", conn.connection.readyState);
      return conn;
    })
    .catch((err) => {
      console.error("Error occurred while connecting to DB : ", err);
      throw err;
    });
}

module.exports = {
  connectMongoDb,
};

const mongoose = require("mongoose");
let database;

const connect = () => {
  if (database) {
    return;
  }
  mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};

module.exports = { connect, disconnect };
const express = require("express");
const { connect } = require("./db/database");
const cors = require("cors");
const morgan = require("morgan");
const userRouters = require("./routers/user");
const authRouters = require("./routers/auth");
const employeeRouters = require("./routers/employee");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/auth", authRouters);
app.use("/users", userRouters);
app.use("/employees", employeeRouters);
app.get("/", (_, res) => {
  res.send("It's a workshop");
});
//connect with mongo
connect();

app.listen(process.env.PORT, () => {
  console.log("Hello", process.env.PORT);
});

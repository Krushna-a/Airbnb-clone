const express = require("express");
const app = express();

const initData = require("./init/data");

const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDB = require("./config/db");
connectToDB();

app.use(express.static("public"));

const listing = require("./model/listing");

const router = require("./routes/listing.routes");

app.set("view engine", "ejs");

app.use("/", router);

app.get("/home", (req, res) => {
  const initDB = async () => {
    await listing.deleteMany();
    await listing.insertMany(initData.data);
  };
  initDB();
  res.send("data added");
});

// async handler
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// custom error handling
class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// error handling
app.get("/random", (req, res, next) => {
  try {
    hi = hi;
  } catch (err) {
    next(err);
  }
});

app.get("/random", (req, res, next) => {
  hi = hi;
  if (ReferenceError) {
    throw new AppError(500, "hi is not defined");
  }
});

app.get(
  "/random",
  asyncHandler((req, res, next) => {
    hi = hi;
  })
);
//   global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


app.listen(3000, () => {
  console.log("server running on port 3000");
});

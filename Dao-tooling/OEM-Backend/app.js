const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controller/errorController");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/myAppError");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config({ path: "./.env" });
const app = express();

//database
const connectDB = require("./DB/connect");

//defining routes
const problemRoutes = require("./route/problem");
const solutionRoutes = require("./route/solution");
const authRoutes = require("./route/auth");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// parse cookies
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      "https://daoaid.netlify.app",
      "https://productionClient.com",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/solutions", solutionRoutes);

// home route
app.get("/", (req, res) => {
  res.status(200).json({ success: " Submit your proposal here" });
});

// 404 error handler
app.all(
  "*",
  catchAsync((req, res, next) => {
    const message = `Can't find ${req.originalUrl} on this server!`;

    return next(new AppError(message, 404));
  })
);

// global error handler
app.use(globalErrorHandler);

// declaring server port inside the environment variables and database
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => {
        console.log("database connected");
      })
      .catch((err) => {
        console.log("Unable to connect to database");
        console.log(err);
      });

    app.listen(port, () => {
      console.log(`listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

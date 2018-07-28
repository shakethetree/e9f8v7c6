import express from "express";
import dbConfig from "./config/db";
import passport from "passport";
//import devConfig from "./config/config";
import middlewaresConfig from "./config/middleware";
import {
  MeetupRoutes,
  GroupRoutes,
  UserRoutes,
  PostRoutes,
  ProfileRoutes
} from "./modules";
const mongoose = require("mongoose");

const app = express();

/**
 * Database
 */
//dbConfig();

/**
 * Middlewares
 */
middlewaresConfig(app);

// DB Config
const db = require("./config/db").mongoURI;
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/app", [
  MeetupRoutes,
  GroupRoutes,
  UserRoutes,
  PostRoutes,
  ProfileRoutes
]);

//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});

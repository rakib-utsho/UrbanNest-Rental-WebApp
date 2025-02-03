// Require Express
const express = require("express");
const app = express();
// Require Mongoose
const mongoose = require("mongoose");
// Require Path
const path = require("path");
// Method Override
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// Require error handler
const ExpressError = require("./utils/ExpressError.js");
// Require Router routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

// Connect MongoDB Database
const MONGO_URL = "mongodb://127.0.0.1:27017/urbannest";

async function main() {
  await mongoose.connect(MONGO_URL);
}
// Call main function
main()
  .then(() => {
    console.log("Connected to DB successful");
  })
  .catch((err) => {
    console.log(err);
  });
// Connect MongoDB Database Ends Here

// set path and others uses
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// REST API Creation
// Root Route
app.get("/", (req, res) => {
  res.send("Root Route");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Handle Errors
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// Custom Middleware for handel errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server is Listening on port 8080");
});
// Configure Localhost server port

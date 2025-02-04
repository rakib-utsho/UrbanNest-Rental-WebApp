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
// Require utils
const ExpressError = require("./utils/ExpressError.js");
// Express-Session
const session = require("express-session");
const flash = require("connect-flash");
// Require Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// model
const User = require("./models/user.js");
// Require Router routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

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

// session - options
const sessionOptions = {
  secret: "mysupersecretecode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Root Route
app.get("/", (req, res) => {
  res.send("Root Route");
});

// use session
app.use(session(sessionOptions));
app.use(flash());

// use passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash message middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// demo user
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta student",
//   });

//   let newUser = await User.register(fakeUser, "helloworld");
//   res.send(newUser);
// });

//routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

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

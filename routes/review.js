const express = require("express");
const router = express.Router({ mergeParams: true });
// error handler
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// schema
const { reviewSchema } = require("../schema.js");
// model
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//Review Schema Validation Middleware
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  // server side error handel
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// POST REVIEW ROUTE
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  })
);

// DELETE REVIEW ROUTE
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;

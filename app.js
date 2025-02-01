// Require Express
const express = require("express");
const app = express();
// Require Mongoose
const mongoose = require("mongoose");
// Require Model
const Listing = require("./models/listing.js");
// Require Path
const path = require("path");
// Method Override
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");


// Connect MongoDB Database
const MONGO_URL = "mongodb://127.0.0.1:27017/urbannest";

async function main() {
    await mongoose.connect(MONGO_URL);
}
// Call main function
main()
.then(()=>{
    console.log("Connected to DB successful");
}).catch((err)=>{
    console.log(err);
});

// set path and others uses
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



// REST API Creation
// Root Route
app.get("/", (req, res)=>{
    res.send("Root Route");
});

// Index route
app.get("/listings", wrapAsync( async (req, res)=> {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

// Create Route
// Create New sub-route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
// Create Route
app.post("/listings", 
    wrapAsync( async (req, res, next) => {
        if(!req.body.listing) {
            throw new ExpressError(400, "Send valid data for listing");
        }
        // let{title, description, image, price, location, country} = req.body;
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
}));

// Show Route
app.get("/listings/:id", wrapAsync( async (req, res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
}));

// Edit Route
app.get("/listings/:id/edit", wrapAsync( async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

// Update Route
app.put("/listings/:id", wrapAsync( async (req, res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// Delete Route
app.delete("/listings/:id", wrapAsync( async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    res.redirect("/listings");
}));

// Handle Errors
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Custom Middleware for handel errors
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", {err});
    // res.status(statusCode).send(message);
});

// test route
// app.get("/testlisting", async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My Cottage",
//         description: "By the beach",
//         price: 12000,
//         location: "Maldive Islands",
//         country:"Maldives"
//     });
//     await sampleListing.save()
//     console.log("sample was saved");
//     res.send("successful testing");
// });

 

app.listen(8080, ()=>{
    console.log("Server is Listening on port 8080");
});
// Configure Localhost server port
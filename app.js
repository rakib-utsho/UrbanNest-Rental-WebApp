// Require Express
const express = require("express");
const app = express();
// Require Mongoose
const mongoose = require("mongoose");
// Require Model
const Listing = require("./models/listing.js");
// Require Path
const path = require("path");


// set path and others uses
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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


// REST API Creation
// Root Route
app.get("/", (req, res)=>{
    res.send("Root Route");
});

// index route
app.get("/listings", async (req, res)=> {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
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
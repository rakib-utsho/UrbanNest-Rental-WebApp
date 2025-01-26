const express = require("express");
const app = express();
// Require Express
const mongoose = require("mongoose");
// Require Mongoose

app.listen(8080, ()=>{
    console.log("Server is Listening on port 8080");
});
// Configure Local server port
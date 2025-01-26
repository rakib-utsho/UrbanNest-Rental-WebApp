const express = require("express");
const app = express();
// Require Express
const mongoose = require("mongoose");
// Require Mongoose

// Connect MongoDB Database
main()
.then(()=>{
    console.log("Connected to DB successful");
}).catch((err)=>{
    console.log(err);
});

const MONGO_URL = "mongodb://127.0.0.1:27017/urbannest";
async function main() {
    await mongoose.connect(MONGO_URL);
}

// REST API Creation
// Root Route
app.get("/", (req, res)=>{
    res.send("Root Route");
})

app.listen(8080, ()=>{
    console.log("Server is Listening on port 8080");
});
// Configure Localhost server port
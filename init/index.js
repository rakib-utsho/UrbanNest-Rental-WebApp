const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67a15aa6ed8a5db145369ac4",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

const mongoose = require("mongoose");
const Review = require("../model/review");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://blog.sothebysrealty.ae/hs-fs/hubfs/Villa%20Projects%20in%20Dubai-jpg.jpeg?width=2500&height=1404&name=Villa%20Projects%20in%20Dubai-jpg.jpeg",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

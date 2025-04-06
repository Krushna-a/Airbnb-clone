const express = require("express");
const router = express.Router();
const Listing = require("../model/listing");
const Review = require("../model/review");

// const initDB = async ()=>{
//     await Listing.deleteMany()
//     await Listing.insertMany(initData.data)
// }
// initDB();

router.get("/listing", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listing", { allListings });
});

router.get("/listing/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/listing/:id", async (req, res) => {
  let { title, description, price, location, country, image } = req.body;
  const newData = {
    title,
    description,
    price,
    location,
    country,
    image,
  };
  console.log(newData);
  const newListing = new Listing(newData);
  await newListing.save();
  res.redirect("/listing");
});
router.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id);
  res.render("show", { data });
});

router.post("/listing/:id/review", async (req, res) => {
  try {
    let { id } = req.params;
    let { rating, review } = req.body;

    const newReview = new Review({ rating, review });
    await newReview.save();

    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    listing.reviews.push(newReview._id);
    await listing.save();

    res.redirect(`/listing/${id}`);
  } catch (error) {
    console.error("Error saving review:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id);
  res.render("edit", { id, data });
});





router.post("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  let { title, description, price, location, country, image } = req.body;
  const newData = {
    title,
    description,
    price,
    location,
    country,
    image,
  };
  let updatedData = await Listing.findByIdAndUpdate(id, newData);
  res.redirect("/listing");
});

router.post("/listing/:id/delete", async (req, res) => {
  let { id } = req.params;
  let deletedData = await Listing.findByIdAndDelete(id);
  console.log(deletedData);
  res.redirect("/listing");
});

module.exports = router;

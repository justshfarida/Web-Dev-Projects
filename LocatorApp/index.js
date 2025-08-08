import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// ✅ Load environment variables from .env file
dotenv.config();

// ✅ Get the Geoapify API key from .env
const geoapifyKey = process.env.GEOAPIFY_API_KEY;

// ✅ Create Express app and set port
const app = express();
const port = 3000;

// ✅ Set the view engine to EJS for rendering HTML
app.set("view engine", "ejs");

// ✅ Serve static files from the "public" directory (e.g. CSS, images)
app.use(express.static("public"));

// ✅ Use body-parser to handle form POST data
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ GET route to render the main page (on first visit)
app.get("/", (req, res) => {
  res.render("index.ejs", {
    apiKey: geoapifyKey, // Pass API key to front end (for autocomplete & map)
    data: null,           // No search results yet
    error: null           // No error to show
  });
});

// ✅ POST route for handling search submissions
app.post("/", async (req, res) => {
  try {
    const radius = 5000; // Search radius in meters
    const category = req.body.category; // E.g. "commercial.supermarket"
    const lat = req.body.lat;          // Latitude from hidden input
    const lon = req.body.lon;          // Longitude from hidden input

    console.log("Search category:", category);
    console.log("Coordinates:", lat, lon);

    // ✅ If no coordinates, return early with error
    if (!lat || !lon) {
      return res.render("index.ejs", {
        apiKey: geoapifyKey,
        data: null,
        error: "Please choose a location before submitting the form.",
      });
    }

    // ✅ Make request to Geoapify Places API
    const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${geoapifyKey}`;
    const response = await axios.get(url);

    const places = response.data.features; // Extract results

    // ✅ Render the page again with the results
    res.render("index.ejs", {
      apiKey: geoapifyKey,
      data: { category, places },
      error: null
    });

  } catch (error) {
    // ✅ Catch and display any error that occurred
    console.error("Geoapify request failed:", error.message);

    res.render("index.ejs", {
      apiKey: geoapifyKey,
      data: null,
      error: "Something went wrong. Please try again."
    });
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});

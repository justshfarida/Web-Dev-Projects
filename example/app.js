import express from "express";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

// Boilerplate to use __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home route
app.get("/", (req, res) => {
  const options = {
    hostname: "bored-api.appbrewery.com",
    path: "/random",
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const result = JSON.parse(data);
        res.render("index", { activity: result.activity });
      } catch (error) {
        console.error("Failed to parse response:", error.message);
        res.status(500).send("Failed to fetch activity. Please try again.");
      }
    });
  });

  request.on("error", (error) => {
    console.error("Failed to make request:", error.message);
    res.status(500).send("Failed to fetch activity. Please try again.");
  });

  request.end();
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

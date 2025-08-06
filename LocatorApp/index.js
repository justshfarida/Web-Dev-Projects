import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const YOUR_API_KEY="";

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res)=>
{
    res.render("index.ejs");
});

app.post("/", async (req, res)=>{
try{
    const radius= 5000;
    const category=req.body.category;
    const lat = req.body.lat;
    const lon = req.body.lon;
    console.log(category);
    const response = await axios.get(`https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${YOUR_API_KEY}`);
    console.log(response.data);
    const places = response.data.features;
    console.log(places);
    res.render("index.ejs", {
      data: { category, places },
    });
}
catch(error)
{
    console.log(error.message);
}


});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
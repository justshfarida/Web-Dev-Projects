import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db= new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  port: 5432,  
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  try{
    const result = await db.query("SELECT country_code FROM visited_countries");
    db.end();
    let country_codes=[];
    result.rows.forEach((country)=>{country_codes.push(country.country_code)})
    console.log(country_codes);
      res.render("index.ejs", {countries: country_codes, total:country_codes.length});
  }
  catch(error)
  {
      res.send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

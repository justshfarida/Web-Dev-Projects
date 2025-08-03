import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "nanay";
const yourPassword = "simba";
const yourAPIKey = "";
const yourBearerToken = "964c7d67-6b63-4d65-a4b9-40edf21ddf29";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  try{
    const response= await axios.get(API_URL+"random");
    console.log(response.data);
    res.render("index.ejs",{content : JSON.stringify(response.data)} );
  }
  catch(error){
    res.render("index.ejs", {content:error.message});
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
        username: yourUsername,      // use your real username here
        password: yourPassword       // and real password
      },
    });

    res.render("index.ejs", { content: JSON.stringify(response.data) });

  } catch (error) {
    console.error("Axios error:", error.message);

    // Show more helpful error info to you:
    const status = error.response?.status;
    const message = error.response?.statusText || error.message;

    res.render("index.ejs", { content: `❌ ${status} ${message}` });
  }
});


app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try
  {
    const response=await axios.get(API_URL+"filter?score=5&apiKey="+yourAPIKey);
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  }
 catch(error)
 {
  res.render("index.ejs", {content:error.message});

 }
});

const config={headers: { Authorization: `Bearer ${yourBearerToken}`}}
app.get("/bearerToken",async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try
  {
    const response = await axios.get(API_URL+"secrets/2", config);
    res.render("index.ejs", {content: JSON.stringify(response.data)})

  }
  catch(error)
  {
    res.render("index.ejs", {content:error.message});

  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

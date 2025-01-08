import express from "express"
const app=express();
const port=3000;
app.get("/", (req,res)=>
{
    res.send("<h1>Hello World!</h1>");
})
app.get("/about", (req, res) => {
    res.send(`
        <h1>About me</h1>
        <p>I am just a girl</p>
    `);
});
app.get("/contact", (req, res)=>
{
    res.send("<h1>My Contact Info</h1>");
})
app.listen(port,
    ()=>{console.log(`Server runnig on port ${port}`)})
app.post("/register", (req, res)=>{res.sendStatus(201)});
app.put("/user/angela",(req, res)=>{res.sendStatus(200)});
app.patch("/user/angela", (req, res)=>{res.sendStatus(200)});
app.delete("/user/angela",(req, res)=>{res.sendStatus(200)});
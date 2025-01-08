//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from 'express';
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';

const app=express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const password = "ILoveProgramming";
    
var IsAuthorised=false;
app.use(bodyParser.urlencoded({ extended: true }));

function checkPassword(req, res, next) {
    if(req.body.password === password){
        IsAuthorised=true;
    } else {
        IsAuthorised=false;
    }
    next();
}
app.use(checkPassword);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
})
app.post('/check', function(req, res){
    if(IsAuthorised)
    {
        res.sendFile(__dirname + '/public/secret.html');
    }
    else{
        res.sendFile(__dirname + '/public/index.html');
    }
}
)
app.listen(3000, function(){
    console.log('Server running on port 3000');
});
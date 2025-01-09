import express from 'express';
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';

const app=express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const d=new Date();
let day=d.getDay();
//app.use(express.urlencoded({ extended: true })); Same as above when you don't want to install bodyParser
app.get('/', function(req, res){
    res.render(__dirname+'/views/index.ejs',{
        day: day
    });
});
app.listen(3000, function(){
    console.log('Server running on port 3000');
});
import express from 'express'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'
import * as exphbs from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url';
import { HomeController } from './controllers/HomeController.js'
import { CollectionController,CollectionDetailsController } from './controllers/CollectionController.js'
import {SearchController} from './controllers/SearchController.js'
import dotenv  from "dotenv"
import cors from 'cors';
// const express = require("express");
// const ViteExpress = require("vite-express");

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __joindirname = path.join(__filename);


const app = express();
const router = express.Router()


// app.use(express.static('./public/', {
//   redirect:true
// }))




const hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials/'
})


app.engine('handlebars', hbs.engine)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
// app.use('/', express.static('public/'));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// app.get("/sw.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/", "sw.js"));
// });

app.get("/", HomeController);
app.get("/:?q", SearchController);

app.get("/collection", CollectionController);
app.get("/collection/:id", CollectionDetailsController);

ViteExpress.listen(app, 3000, () => {

  console.log("Server is listening on port 3000...")
});

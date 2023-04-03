import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { HomeController } from './server/controllers/HomeController.js';
import { CollectionController,CollectionDetailsController } from './server/controllers/CollectionController.js';
import {SearchController} from './server/controllers/SearchController.js';
import dotenv  from "dotenv";
import logger from 'morgan';
import cors from 'cors';
import compression from 'compression';

// const express = require("express");
// const ViteExpress = require("vite-express");

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __joindirname = path.join(__filename);


const app = express();

const PORT = process.env.PORT || 3000;
const router = express.Router()
app.use(logger('dev'));
app.use(compression())

app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=365000000, immutable');
  next();
});


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
app.use('/', express.static('/static'));
// app.use('/', express.static('src/public'));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));


// app.get("/sw.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/", "sw.js"));
// });

app.get("/", HomeController);
app.get("/:?q", SearchController);

app.get("/collection", CollectionController);
app.get("/collection/:id", CollectionDetailsController);

ViteExpress.listen(app, PORT, () => {
  console.log(__dirname)
  console.log("Server is listening on port 3000...")
});




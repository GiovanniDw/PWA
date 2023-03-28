import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import * as exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
`https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;
const searchAll = async (q) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;
  const search = `&q=${q}`;
  const URL = baseURL + search;
  console.log({ "VITE_RIJKSMUSEUM_API": "S3GLzVAr", "VITE_API_KEY": "S3GLzVAr", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true });
  try {
    const searchResults = await request(URL);
    return searchResults;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("SearchDone");
  }
};
const searchId = async (id) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=${process.env.VITE_API_KEY}`;
  console.log({ "VITE_RIJKSMUSEUM_API": "S3GLzVAr", "VITE_API_KEY": "S3GLzVAr", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true });
  try {
    const data = await request(baseURL);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Got id ");
  }
};
const request = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
const HomeController = async (req, res) => {
  try {
    res.render("index", {
      title: "home"
    });
  } catch (error) {
    console.log(error);
  }
};
const CollectionController = async (req, res) => {
  try {
    const data = await searchAll("Rembrand");
    res.render("collection", {
      title: "Collecton",
      query: "Rembrand",
      data: data.artObjects
    });
  } catch (error) {
    console.log(error);
  }
};
const CollectionDetailsController = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await searchId(id);
    console.log(req.params);
    res.render("details", {
      title: "Collecton",
      data: data.artObject
    });
  } catch (error) {
    console.log(error);
  }
};
const SearchController = async (req, res) => {
  const query = req.query.q;
  console.log(query);
  try {
    const data = await searchAll(query);
    console.log(data);
    res.render("search", {
      title: "Search",
      query,
      data: data.artObjects
    });
  } catch (error) {
    console.log(error);
  }
};
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static("public/"));
ViteExpress.config({
  mode: "development"
});
const hbs = exphbs.create({
  defaultLayout: "main",
  partialsDir: __dirname + "/views/partials/"
});
app.engine("handlebars", hbs.engine);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.get("/", HomeController);
app.get("/:?q", SearchController);
app.get("/collection", CollectionController);
app.get("/collection/:id", CollectionDetailsController);
ViteExpress.listen(app, 3e3, () => {
  console.log("Server is listening on port 3000...");
});
//# sourceMappingURL=server.js.map

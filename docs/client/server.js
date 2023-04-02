import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import * as exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import "cors";
`https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;
const searchAll = async (q) => {
  try {
    const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true&ps=50`;
    const search = `&q=${q}`;
    const URL = baseURL + search;
    const data = await request(URL);
    const formattedResults = await formatMuseumResults(data);
    return formattedResults;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("SearchDone");
  }
};
const getMuseumDataByMaker = async (q) => {
  try {
    const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}`;
    const maker = `&involvedMaker=${q}`;
    const options = "&imgonly=true&ps=5&toppieces=true";
    const URL = baseURL + maker;
    console.log(URL);
    const data = await request(URL);
    const formattedResults = await formatMuseumResults(data);
    return formattedResults;
  } catch (err2) {
    console.log(err2);
  } finally {
    console.log("got By maker");
  }
};
const searchId = async (id) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=${process.env.VITE_API_KEY}`;
  console.log({ "VITE_RIJKSMUSEUM_API": "S3GLzVAr", "VITE_API_KEY": "S3GLzVAr", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true });
  try {
    const data = await request(baseURL);
    const formattedResult = await formatMuseumResult(data.artObject);
    return formattedResult;
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
  } catch (err2) {
    console.log(err2);
    throw new Error(err2);
  }
};
const formatMuseumResults = (data) => {
  const array = data.artObjects;
  return array.map((d) => {
    return {
      id: d.objectNumber,
      title: d.title,
      name: d.name,
      headerImage: d.headerImage,
      productionPlaces: d.productionPlaces,
      links: d.links,
      longTitle: d.longTitle,
      webImage: d.webImage,
      principalOrFirstMaker: d.principalOrFirstMaker
      // sizeScale: sizeScaleValue,
      // colorScale: colorScaleValue,
    };
  });
};
const formatMuseumResult = (d) => {
  return {
    id: d.objectNumber,
    title: d.title,
    titles: d.titles,
    materials: d.materials,
    description: d.description,
    productionPlaces: d.productionPlaces,
    longTitle: d.longTitle,
    webImage: d.webImage,
    principalOrFirstMaker: d.principalOrFirstMaker,
    productionPlaces: d.productionPlaces,
    physicalMedium: d.physicalMedium,
    longTitle: d.longTitle,
    subTitle: d.subTitle,
    plaqueDescription: d.plaqueDescription,
    principalMaker: d.principalMaker,
    location: d.location
  };
};
const HomeController = async (req, res, next) => {
  try {
    const rembrand = await getMuseumDataByMaker("Rembrandt+van+Rijn");
    const Johannes = await getMuseumDataByMaker("Johannes+Vermeer");
    res.render("index", {
      title: "home",
      makers: [
        {
          name: "Rembrand",
          data: rembrand
        },
        {
          name: "Johannes Vermeer",
          data: Johannes
        }
      ]
    });
  } catch (err2) {
    console.log(err2);
    next(err2);
  }
};
const CollectionController = async (req, res, next) => {
  try {
    const data = await searchAll("Rembrand");
    res.render("collection", {
      title: "Collecton",
      query: "Rembrand",
      data
    });
  } catch (err2) {
    console.log(err2);
    next(err2);
  }
};
const CollectionDetailsController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await searchId(id);
    res.render("details", {
      title: "Collecton",
      data
    });
  } catch (err2) {
    console.log(err2);
    next(err2);
  }
};
const SearchController = async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  try {
    const data = await searchAll(query);
    res.render("search", {
      title: "Search",
      query,
      data
    });
    next();
  } catch (error) {
    next(err);
  }
};
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
express.Router();
const hbs = exphbs.create({
  defaultLayout: "main",
  partialsDir: __dirname + "/views/partials/"
});
app.engine("handlebars", hbs.engine);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static("src/static"));
app.use("/", express.static("src/public"));
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

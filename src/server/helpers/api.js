const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;

export const searchAll = async (q) => {
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

export const searchId = async (id) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=${process.env.VITE_API_KEY}`;

  // const URL = baseURL + search;
  console.log(import.meta.env);
  try {
    const data = await request(baseURL);
    const formattedResult = await formatMuseumResult(data.artObject);
    console.log(formattedResult);
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
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const formatMuseumResults = (data) => {
  const array = data.artObjects;
  return array.map((d) => {
    // const sizeScaleValue = (d) => sizeScale(sizeValue(d));
    // const colorScaleValue = (d) => colorScale(colorValue(d));
    // console.log(colorScaleValue);
    return {
      id: d.objectNumber,
      title: d.title,
      name: d.name,
      headerImage: d.headerImage,
      productionPlaces: d.productionPlaces,
      links: d.links,
      longTitle: d.longTitle,
      webImage: d.webImage,
      principalOrFirstMaker: d.principalOrFirstMaker,

      // sizeScale: sizeScaleValue,
      // colorScale: colorScaleValue,
    };
  });
};

const formatMuseumResult = (d) => {
  // const keys = Object.keys(data.artObject)

  // const sizeScaleValue = (d) => sizeScale(sizeValue(d));
  // const colorScaleValue = (d) => colorScale(colorValue(d));
  // console.log(colorScaleValue);
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
    location: d.location,
  };
};

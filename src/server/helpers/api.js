const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;

export const searchAll = async (q) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;
  const search = `&q=${q}`;
  const URL = baseURL + search;
  console.log(import.meta.env);
  try {
    const searchResults = await request(URL);
    return searchResults;
  } catch (error) {
    console.log(error);
  } finally {
    console.log('SearchDone');
  }
};

export const searchId = async (id) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=${process.env.VITE_API_KEY}`;
  
  // const URL = baseURL + search;
  console.log(import.meta.env);
  try {
    const data = await request(baseURL);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Got id ');
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

const apiKey = import.meta.env.VITE_RIJKSMUSEUM_API;
const URL = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&imgonly=true`;
export const getMuseumData = async () => {
  const urlParams = `${URL}`;
  return request(urlParams);
}

export const getDynamicMuseumData = async (options, id) => {
  const { lang, color, involvedMaker, search } = options;
  if (!id) {
    const urlParams = `${URL}&ps=20`
    const data = await request(urlParams)
    console.log(data);
    return data
  } else {
    const urlParams = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${apiKey}`
    console.log(urlParams)
    const data = await request(urlParams)
    return data
  }
};

export const searchMuseumData = async (options) => {
  const { lang, apiKey, color, involvedMaker, search } = options;
  const urlParams = `${URL}&q=${search}`
  return request(urlParams)
}

export function fetchData(url) {
  const data = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

const request = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data
  } catch (err) {
      console.log(err);
      throw new Error(err)
      
    }
  };


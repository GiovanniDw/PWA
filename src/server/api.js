export const request = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data
  } catch (err) {
      console.log(err);
      throw new Error(err)
  } finally {
    console.log("hoi")
  }
};



export const getDynamicMuseumData = async (options, id) => {
  const { lang, color, involvedMaker, search, toppieces } = options;
  if (!id) {
    const urlParams = `${URL}&q=${search}&ps=100&toppieces=${toppieces}`
    console.log(urlParams);
    const data = await request(urlParams)
    return data
  } else {
    const urlParams = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${apiKey}`
    console.log(urlParams)
    const data = await request(urlParams)
    return data
  }
};
export const getMuseumData = async (options) => {
  const { lang, apiKey, color, involvedMaker, URL, search } = options;

  const urlParams = `${URL}&q=${search}`

console.log(urlParams)
  return request(urlParams);
};


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

  
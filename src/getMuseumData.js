export const getMuseumData = (options) => {
  const { lang, apiKey, color, involvedMaker, URL } = options;

  return request(URL);
};


export function fetchData(url) {
  const data = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}


  const request = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (data) {
        return data;
      
    } else {
      console.log('Error');
    }
  };

  
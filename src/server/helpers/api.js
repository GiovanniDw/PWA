
const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;

export const searchAll =  async (q) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;
const search = `&q=${q}`
const URL = baseURL+search
console.log(import.meta.env)
try {
  const searchResults = await request(URL)
  return searchResults
} catch (error) {
  console.log(error)
} finally {
  console.log('SearchDone')
}
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
import { searchMuseumData } from "./api.js";
import {$, $$} from './ui.js'
const input = document.forms["searchForm"]["search"].value;
const searchButton = $('#search-button')

export const handleSearch = async () => {
  // const query = input;

const searchQuerry = searchQ()

  const options = {
    search: searchQuerry
  }

  
  
  console.log(searchQuerry);

  const data = await searchMuseumData(options)
  console.log(data);

    return data
}




const getSearchResults = async (options) => {
  const { lang, apiKey, color, involvedMaker, search } = options;
  
  

  const data = searchMuseumData(searchInput);
  console.log(data)

  return data;

}
 

const searchQ = async () => { searchButton.addEventListener('click', () => {
  const query = document.forms["searchForm"]["search"].value;
  return query
})}
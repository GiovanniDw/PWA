import { searchMuseumData } from "./api.js";
import {$, $$} from './ui.js'
const input = document.forms["searchForm"]["search"].value;
const searchButton = $('#search-button')

export const handleSearch = async () => {
  // const query = input;

  const options = {
    search: input
  }

  console.log(input);

  const data = await searchMuseumData(options)
  console.log(data);

    return data
}




const getSearchResults = async (options) => {

  

  const { lang, apiKey, color, involvedMaker, search } = options;
  
  console.log(input)

  const data = searchMuseumData(searchInput);
  console.log(data)

  return data;

}
 


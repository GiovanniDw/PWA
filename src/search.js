import { searchMuseumData } from "./api.js";
import {$, $$} from './ui.js'
const input = $('#search').value;
const searchButton = $('#search-button')

export const handleSearch = async () => {
  const query = input.value;

  const options = {
    search: query
  }

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
 


import './vendor/routie.js';
import { getMuseumData, getDynamicMuseumData, searchMuseumData, getLocalSearchInput } from './api.js';
import { updateUI } from './ui.js'
import { render } from './render.js'
import { handleSearch } from './search.js';

const museumOptions = {
  lang: 'en',
  color: '',
  involvedMaker: '',
  URL: URL,
  search: ''
};


const searchInput = getLocalSearchInput()

export const handleRoutes = () => {
  routie(
    {
      '': async () => { //entreepagina
        const data = await getDynamicMuseumData(museumOptions)  
        render(data)
        updateUI('home')
      },
      'art/:id': async id => { //detailpagina
        const data = await getDynamicMuseumData(museumOptions, id)
        render(data, id)
        updateUI('art')
      },
      'search': async () => {
        const data = await searchMuseumData(searchInput)
        render(data, "search")
        updateUI('search')
      }
    })
}
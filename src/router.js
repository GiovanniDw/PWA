import { getMuseumData, getDynamicMuseumData } from './api.js';
import { updateUI } from './ui.js'
import { render } from './render.js'
import './vendor/routie.js';
import { handleSearch } from './search.js';

const museumOptions = {
  lang: 'en',
  color: '',
  involvedMaker: '',
  URL: URL,
  search: ''
};


export async function handleRoutes() {
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
      'search': () => {
        handleSearch().then(data => {
          render(data)
          updateUI('search')
        })
        
      }

    })
}
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


export function handleRoutes() {
  routie(
    {
      'art': () => { //entreepagina
        getDynamicMuseumData(museumOptions).then(data => {
          render(data)
          updateUI('art')
        });
      },
      'art/:id': id => { //detailpagina
        getDynamicMuseumData(museumOptions, id).then(data => {
          render(data, id)
          updateUI('art', id)
        });
      },
      'search': () => {
        handleSearch().then(data => {
          render(data)
          updateUI('search')
        })
        
      }

    })
}
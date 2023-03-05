import Routie from './vendor/routie.js';
import { getMuseumData, getDynamicMuseumData, searchMuseumData, getLocalSearchInput } from './api.js';
import { updateUI } from './ui.js'
import { render } from './render.js'
import { handleSearch } from './search.js';
// import routie from './vendor/routie.js';

// import Router from 'vanilla-router';




const museumOptions = {
  lang: 'en',
  color: '',
  involvedMaker: '',
  URL: URL,
  search: ''
};

export function handleRoutes() {
  Routie(
    {
      '': async () => {
        const data = await getDynamicMuseumData(museumOptions);
        render(data);
        updateUI('home');
      },
      'art/:id': async (id) => {
        const data = await getDynamicMuseumData(museumOptions, id);
        render(data, id);
        updateUI('art');
      },
      'search': async () => {
        const searchInput = await getLocalSearchInput();
        console.log(searchInput);
        const data = await searchMuseumData(searchInput);
        render(data, "search");
        updateUI('search');
      }
    });
}


// const searchInput = getLocalSearchInput()
// console.log(searchInput)

// const router = new Router({
//   mode: 'hash',
//   root: '/SPA/index.html',
//   page404: function (path) {
//     console.log('"/' + path + '" Page not found');
//   }
// });

// router.add('', async () => {
//   const data = await getDynamicMuseumData(museumOptions)
//   render(data)
//   updateUI('home')
//   });

// router.add('art/(:any)', async (name) => {
//   const data = await getDynamicMuseumData(museumOptions, id)
//   render(data, id)
//   updateUI('art')
//   });

// router.add('search', async () => {
//   const searchInput = await getLocalSearchInput()
//   console.log(searchInput)
//   const data = await searchMuseumData(searchInput)
//   render(data, "search")
//   updateUI('search')  });



// export const handleRoutes = () => {
//   router.add('', async () => {
//     const data = await getDynamicMuseumData(museumOptions)
//     render(data)
//     updateUI('home')
//   });

//   router.add('art/(:any)', async (name) => {
//     const data = await getDynamicMuseumData(museumOptions, id)
//     render(data, id)
//     updateUI('art')
//   });

//   router.add('search', async () => {
//     const searchInput = await getLocalSearchInput()
//     console.log(searchInput)
//     const data = await searchMuseumData(searchInput)
//     render(data, "search")
//     updateUI('search')
//   });
// }


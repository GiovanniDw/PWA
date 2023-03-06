import { $, $$, updateUI } from './ui.js'

import { getLocalSearchInput } from './api.js'


export function render(data, id, page) {
  console.log(data)

  switch (page) {
    case "home":
      homePage(data.artObjects)
      break;
    case "art":
      collection(data.artObjects)
      break;
    case "art-detail":
      item(data.artObject, id)
      break;
    case "search":
      collectionSearch(data.artObjects)
      break;
    default:
      collection(data.artObjects)
      break;
  }





  // if (!id) {
  //    collection(data.artObjects)
  // } else if (id === 'search') {
  //    collectionSearch(data.artObjects)
  // } else {
  //     item(data.artObject)

  // }
}

function homePage(data) {
  const section = $('section[data-route=home]')
  console.log(data)
  data.forEach((item) => {
    const { webImage, objectNumber, headerImage } = item

    const id = objectNumber;

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = `
      <article class='museum-item' id='${id}'">
        <img class='museum-item-image' src="${webImage.url}" alt="" />
        <div class='item-content'>
        <a href="#art/${id}">
          <h4>${item.title}</h4>
        </a>
        </div>
      </article>
    `;
    section.insertAdjacentHTML('beforeend', html)
  })


}


function collection(data) {
  const section = $('section[data-route=art]')
  console.log(data)
  data.forEach((item) => {
    const { webImage, objectNumber, headerImage } = item

    const id = objectNumber;

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = `
      <article class='museum-item' id='${id}'">
        <img class='museum-item-image' src="${webImage.url}" alt="" />
        <div class='item-content'>
        <a href="#art/${id}">
          <h4>${item.title}</h4>
        </a>
        </div>
      </article>
    `;
    section.insertAdjacentHTML('beforeend', html)
  })


  


}


function item(data, id) {
  console.log(data)
  const section = $('section[data-route=art]')
  const currentItem = section.querySelector(`#${id}`);
  const allItems = section.querySelectorAll('.museum-item');
  const moreContent = $$('.extra-content')
  const { title, webImage } = data;


  const html = /*html*/`
    <article>
      <h2>${title}</h2>
      <img src="${webImage.url}">
    </article>
  `;

  const insertHTML = /*html*/`
  <div class='extra-content'>
      <h2>${title}</h2>
      <img src="${webImage.url}">
    </div>
  
  `



  console.log(currentItem);


  if (!currentItem) {
    const section = $('section[data-route=art-detail]')
    clearElement(section)
    section.insertAdjacentHTML('beforeend', html)
    updateUI('art-detail')
  } else {
    
    console.log(allItems)
    allItems.forEach(item => {
      item.classList.remove('active')
clearElement(item)
      console.log(item.moreContent)
        
      // item.removeChild(moreContent);
      
      if (item.matches('.extra-content')) {
          console.log(item)
        }
    })
    

    currentItem.classList.add('active')
    clearElement(allItems)
    currentItem.insertAdjacentHTML('beforeend', insertHTML)

}

//   if (currentItem) {


// console.log(currentItem.length)
//     allItems.forEach(item => {
//       item.classList.remove('active')

//       item.removeChild()


//     })

//     currentItem.classList.add('active')
//         clearElement(allItems)
//     currentItem.insertAdjacentHTML('beforeend', insertHTML)


//   } else if (allItems.length > 0) {
//     allItems.classList.remove('active')
//   } else {
//     const section = $('section[data-route=art-detail]')
//     clearElement(section)
//     section.insertAdjacentHTML('beforeend', html)
// }




  
  // try {
  //   // clearElement(currentItem)
  //   currentItem.insertAdjacentHTML('beforeend', insertHTML)
  // } catch (error) {
    
  // }
  
  
}


const collectionSearch = async (data) => {
  const section = $('section[data-route=search]')
  console.log(data)

  const UserSearch = await getLocalSearchInput()

  console.log(UserSearch)

  const renderQuerry = `
  <h2>${UserSearch}</h2>
  `;
  data.forEach((item) => {
    const { webImage, objectNumber } = item;

    const id = objectNumber;

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = /*html*/ `
      <article class='museum-item' id='${id}'">
        <img src="${webImage.url}" alt="" />
        <a href="#art/${id}">
        <h4>${item.title}</h4>
        </a>
      </article>
    `;
    // clearElement(section)
    section.insertAdjacentHTML('beforeend', html)
  })
  section.insertAdjacentHTML('beforestart', renderQuerry)
}



// function item(data) {
//   const section = $('section[data-route=art]')
//   const { title, id } = data[0]

//   const html = `
//     <article>
//       <h2>${title}</h2>
//       <img src="${webImage.url}">
//     </article>
//   `;

//   clearElement(section)
//   section.insertAdjacentHTML('beforeend', html)
// }

function clearElement(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild)
  }
}

import { $ } from './ui.js'

export function render(data, id) {
  console.log(data)
  if (!id) {
    collection(data.artObjects)
  } else if (id !== 'search') {
    item(data.artObject)
  } else {
    
  }
}

function collection(data) {
  const section = $('section[data-route=home]')
  console.log(data)
  data.forEach((item) => {
    const { webImage, objectNumber } = item

    const id = objectNumber;

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = `
      <article class='museum-item'
        id='${id}'
        style="background-image: url('${webImage.url}');">
        <img src="${webImage.url}" alt="" />
        <a href="#art/${id}">
        <h4>${item.title}</h4>
        </a>
      </article>
    `;
    section.insertAdjacentHTML('beforeend', html)
  })
}


function item(data) {
  console.log(data)
  const section = $('section[data-route=art]')
  const { title, webImage } = data;


  const html = `
    <article>
      <h2>${title}</h2>
      <img src="${webImage.url}">
    </article>
  `;

  clearElement(section)
  section.insertAdjacentHTML('beforeend', html)
}


function collectionSearch(data) {
  const section = $('section[data-route=search]')
  console.log(data)
  data.forEach((item) => {
    const { webImage, objectNumber } = item

    const id = objectNumber;

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = `
      <article class='museum-item'
        id='${id}'
        style="background-image: url('${webImage.url}');">
        <img src="${webImage.url}" alt="" />
        <a href="#art/${id}">
        <h4>${item.title}</h4>
        </a>
      </article>
    `;
    section.insertAdjacentHTML('beforeend', html)
  })
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

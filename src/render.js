import { $ } from './ui.js'

export function render(data, id) {
  
  if (!id) {
    collection(data.artObjects)
  } else {
    item(id)
  }
}

function collection(data) {
  const section = $('section[data-route=art]')



  data.forEach((item) => {
    const { id, webImage } = item

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = `
      <article class='museum-item'
        id='${id}'
        style="background-image: url('${webImage.url}');">
        <a href="#art/${id}">
        <h4>${item.title}</h4>
        </a>
      </article>
    `;

    section.insertAdjacentHTML('beforeend', html)
  })
}


function item(data) {
  const section = $('section[data-route=art]')
  const { title, id } = data[0]

  const html = `
    <article>
      <h2>${title}</h2>
      <img src="${webImage.url}">
    </article>
  `;

  clearElement(section)
  section.insertAdjacentHTML('beforeend', html)
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

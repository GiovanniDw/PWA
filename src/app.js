import { getMuseumData } from './getMuseumData.js';

const apiKey = import.meta.env.VITE_RIJKSMUSEUM_API;
const URL = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}`;
const rembrand = '&involvedMaker=Rembrandt+van+Rijn';

const museumOptions = {
  lang: 'en',
  apiKey: apiKey,
  color: '',
  involvedMaker: 'Rembrand',
  URL: URL,
};

const museumData = await getMuseumData(museumOptions);

 console.log(museumData)
createMuseumItemWithTemplate(museumData);


async function createMuseumItemWithTemplate(museumData) {
  const museumItems = museumData.artObjects;
  console.log(museumItems);
  const articles = document.createElement('article');
  articles.classList.add('art-container');

  const template = document.getElementById('museum-item');

  museumItems.forEach((museumItem) => {
    const articleItem = document.importNode(template.content, true);
    articleItem.querySelector('.title').textContent = museumItem.longTitle;
    articleItem.querySelector('.image').src = museumItem.webImage.url;
    article.appendChild(articleItem);
  });
  template.replaceWith(articles);
}

// function createListWithTemplate(heroes: Hero[]) {
//   const ul = document.createElement('ul');
//   ul.classList.add('list', 'hero-list');
//   const template = document.getElementById('museumItem') as HTMLTemplateElement;
//   heroes.forEach((hero: Hero) => {
//     const heroCard = document.importNode(template.content, true);
//     heroCard.querySelector('.description').textContent = hero.description;
//     heroCard.querySelector('.name').textContent = hero.name;
//     ul.appendChild(heroCard);
//   });
//   heroPlaceholder.replaceWith(ul);
// }


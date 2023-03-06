import { checkForHash } from "./checkForHash.js";
import { createListItem } from "./createListItem.js";

export function fetchData(query = 'vermeer'){

  let parent = document.querySelector('section ul');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  console.log(query);
  // const kunstobjecten ='https://www.rijksmuseum.nl/api/nl/collection/SK-C-5/tiles?key=Y5aZWyUP'
  const kunstobjecten = 'https://www.rijksmuseum.nl/api/nl/collection/?key=Y5aZWyUP&q='+query+'&ps=9&imgonly=true&s=chronologic'

  fetch(kunstobjecten)
    .then(response => {
      return response.json();
    })
    .then(data => {
      
      //console.log(data);
      data.artObjects.forEach((aObject) => {
        if (!aObject.hasImage) return;

        let listItem = createListItem(aObject)
        document.querySelector('section ul').appendChild(listItem)

      })
    })
    .catch(error => {
      console.error('Probleem gedetecteerd:', error);
    });

    checkForHash();
    
}


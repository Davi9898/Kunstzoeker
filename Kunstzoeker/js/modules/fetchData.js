import { checkForHash } from "./checkForHash.js";
import { createListItem } from "./createListItem.js";



export function fetchData(query = 'Rembrandt'){

  let parent = document.querySelector('section ul');

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  const artContainer = document.querySelector('main > section:nth-of-type(2)')


  const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
  const apiKey = 'BQfKnS2c'
  const ifImage = "imgonly=true";
  const sortedBy = "relevance";
  const resultAmount = "ps=20";

  console.log(query);
  
  // String Interpolatie doormiddel van backticks
  // Expressions zijn wrapped in ${}
  const url = `${urlApi}/?key=${apiKey}&q=${query}&${resultAmount}&${ifImage}&s=${sortedBy}`;

  

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data.artObjects)
      console.log(data.artObjects.length)
      if (data.artObjects.length <= 1) {
        document.querySelector('section:nth-of-type(4)').style.display = 'flex';
        return;
      }
     
      if (data.artObjects.length >= 1) {
        document.querySelector('section:nth-of-type(4)').style.display = 'none';        
      } 

      //console.log(data);
      data.artObjects.forEach((aObject) => {
        if (!aObject.hasImage) return;

        let listItem = createListItem(aObject)
        document.querySelector('section ul').appendChild(listItem)

        artContainer.textContent = "";

        
        
      })
    })
    .catch(error => {
      console.error('Probleem gedetecteerd:', error);
    });

    checkForHash();
    
}


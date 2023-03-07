import { fillObjectModal } from "./fillObjectModal.js";
import keys from "../keys.js";


export function createListItem(aObject) {

    let li = document.createElement("li");
    let image = document.createElement("img");
  
    const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
    const apiKey = keys.API_KEY
  
    //Fetch afbeelding data
    console.log('Test: '+ aObject)
    const afbeeldingen = `${urlApi}/${aObject.objectNumber}/tiles?key=${apiKey}`;
  
    //console.log(afbeeldingen);
  
    fetch(afbeeldingen)
      .then(response => {
        return response.json();
      })
      .then(images => {
        console.log(images)
        var mobileLevelIndex = 0;
  
        images.levels.forEach((level, index) => {
          if (level.width <= 750 && level.width > 250) {
            if (images.levels[index].tiles.length == 1) {
              mobileLevelIndex = index;
  
              
            }
          }
        })
        
        image.src = images.levels[mobileLevelIndex].tiles[0].url
      })
      .catch(error => {
        console.error('Probleem gedetecteerd:', error);
      });
  
  
    
    image.setAttribute('rijksobject-nummer', aObject.objectNumber);
  
    li.addEventListener('click', () => {
     
  
      fillObjectModal(aObject.objectNumber);
  
    })
    li.appendChild(image);
    return li;
  }



 
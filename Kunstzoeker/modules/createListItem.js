import { fillObjectModal } from "./fillObjectModal.js";



export function createListItem(aObject) {
    let li = document.createElement("li");
    let image = document.createElement("img");
  
  
  
    //Fetch afbeelding data
    const afbeeldingen = 'https://www.rijksmuseum.nl/api/nl/collection/' + aObject.objectNumber + '/tiles?key=Y5aZWyUP'
  
    //console.log(afbeeldingen);
  
    fetch(afbeeldingen)
      .then(response => {
        return response.json();
      })
      .then(images => {
        
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
      .finally(()=> {
        
      })
  
  
    
    image.setAttribute('rijksobject-nummer', aObject.objectNumber);
  
    li.addEventListener('click', () => {
     
  
      fillObjectModal(aObject.objectNumber);
  
    })
    li.appendChild(image);
    return li;
  }



 
fetchData()

function fetchData(){
    // const kunstobjecten ='https://www.rijksmuseum.nl/api/nl/collection/SK-C-5/tiles?key=Y5aZWyUP'
    const kunstobjecten ='https://www.rijksmuseum.nl/api/nl/collection/?key=Y5aZWyUP&q=Mark&ps=90&imgonly=true&s=chronologic'

    fetch(kunstobjecten)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        data.artObjects.forEach((aObject) => {
          if(!aObject.hasImage) return;

          let listItem = createListItem(aObject)
          document.querySelector('section ul').appendChild(listItem)

          //Fetch afbeelding data
          const afbeeldingen ='https://www.rijksmuseum.nl/api/nl/collection/'+aObject.objectNumber+'/tiles?key=Y5aZWyUP'
                    
          console.log(afbeeldingen);

          fetch(afbeeldingen)
            .then(response => {
              return response.json();
            })
            .then(images => {
              
              var mobileLevelIndex = 0;
              
              images.levels.forEach((level, index) => {
                if(level.width <= 750 && level.width > 250){
                  if(images.levels[index].tiles.length == 1){
                    mobileLevelIndex = index;
                  }
                }
              })
              image = document.querySelector('[rijksobject-nummer="'+aObject.objectNumber+'"]');
              image.src = images.levels[mobileLevelIndex].tiles[0].url
            })

        })
      })
      .catch(error => {
        console.error('Probleem detected:', error);
      });
}

function createListItem(aObject)
{
          let li = document.createElement("li");
          let image = document.createElement("img");
          image.style.width = '100%';
          image.setAttribute('rijksobject-nummer', aObject.objectNumber);

          li.addEventListener('click', () => {
            const h3 = document.createElement("h3");
            h3.classList.add("my-class");
            image.classList.add("schaduweffect")
            const p = document.createElement("p");

            h3.textContent = aObject.longTitle;
            p.textContent = aObject.description;
            image.parentNode.appendChild(h3);
            image.parentNode.appendChild(p);
          })
          li.appendChild(image);
          return li;
}

    // fetch(afbeeldingen)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     data.levels.forEach((aObject) => {
    //       // if(!aObject.hasImage) return;
    //       let li = document.createElement("li");
    //       let image = document.createElement("img");
    //       image.src = aObject.tiles.url;
    //       image.style.width = '100%';

    //       li.addEventListener('click', () => {
    //         alert(aObject.title);
    //       })

    //       li.appendChild(image);
    //       document.querySelector('section ul').appendChild(li)
    //     })
    //   })
    //   .catch(error => {
    //     console.error('Probleem detected:', error);
    //   });
    // }

//   fetch(afbeeldingen)
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//     data.levels.forEach((aObject) => {
//       if (!aObject.tiles.length) return;
//       let li = document.createElement("li");
//       let image = document.createElement("img");
//       image.src = aObject.tiles[7].url;

//       li.addEventListener('click', () => {
//         alert(aObject.title);
//       })

//       li.appendChild(image);
//       document.querySelector('section ul').appendChild(li)
//     })
//   })
//   .catch(error => {
//     console.error('Probleem detected:', error);
//   });
// }


// Stap 1. Kijken of ik die zoom4/5 kan implementeren.
// Lazyloading
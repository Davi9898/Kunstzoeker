fetchData()




function displayLoading() { // Bron: https://dev.to/vaishnavs/displaying-loading-animation-on-fetch-api-calls-1e5m
  if (!document.querySelector("#loading")){
    return
  }
  const loader = document.querySelector("#loading");
  loader.classList.add("display");
  
  // to stop loading after some time
  setTimeout(() => {
      loader.classList.remove("display");
  }, 5000);
}

// hiding loading 
function hideLoading() {
  loader.classList.remove("display");
}

function fetchData() {
  
  // const kunstobjecten ='https://www.rijksmuseum.nl/api/nl/collection/SK-C-5/tiles?key=Y5aZWyUP'
  const kunstobjecten = 'https://www.rijksmuseum.nl/api/nl/collection/?key=Y5aZWyUP&q=Mark&ps=100&imgonly=true&s=chronologic'

  fetch(kunstobjecten)
    .then(response => {
      return response.json();
    })
    .then(data => {
      
      console.log(data);
      data.artObjects.forEach((aObject) => {
        if (!aObject.hasImage) return;

        let listItem = createListItem(aObject)
        document.querySelector('section ul').appendChild(listItem)

      })
    })
    .catch(error => {
      console.error('Probleem gedetecteerd:', error);
    });
    
}

function createListItem(aObject) {
  displayLoading()
  let li = document.createElement("li");
  let image = document.createElement("img");



  //Fetch afbeelding data
  const afbeeldingen = 'https://www.rijksmuseum.nl/api/nl/collection/' + aObject.objectNumber + '/tiles?key=Y5aZWyUP'

  console.log(afbeeldingen);

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

            // hideLoading()
          }
        }
      })
      //image = document.querySelector('[rijksobject-nummer="' + aObject.objectNumber + '"]');
      image.src = images.levels[mobileLevelIndex].tiles[0].url
    })
    .finally(()=> {
      
    })


  // image.style.width = '100%';
  image.setAttribute('rijksobject-nummer', aObject.objectNumber);

  li.addEventListener('click', () => {
    // [...document.querySelectorAll('.my-class, .schaduweffect')].forEach((el) => {
    //   el.classList.remove('my-class')
    //   el.classList.remove('schaduweffect')
    // })

    // h3.classList.add("my-class");
    // image.classList.add("schaduweffect")

    fillObjectModal(aObject);

  })
  li.appendChild(image);
  return li;
}

function fillObjectModal(aObject){

  //Fetch afbeelding data
  const artObjectUrl = 'https://www.rijksmuseum.nl/api/nl/collection/' + aObject.objectNumber + '?key=Y5aZWyUP'

  fetch(artObjectUrl)
    .then(response => {
      return response.json();
    })
    .then(response => {
      let model = document.querySelector('.details');
      console.log(response.artObject);
      model.querySelector('.details-title').textContent = response.artObject.longTitle;
      model.querySelector('.object-afbeelding').src = response.artObject.webImage.url;
      model.querySelector('.object-omschrijving').textContent = response.artObject.description;
        
     
      model.classList.remove('hidden')

      const terugButton = document.querySelector('button')
      terugButton.addEventListener('click', () => {
        model.classList.add('hidden');
        model.querySelector('.object-afbeelding').src = '';
      })
      .catch(error => {
        let errorState = document.querySelector('.error');
        errorState = remove('error-hidden')
      });
    })
}

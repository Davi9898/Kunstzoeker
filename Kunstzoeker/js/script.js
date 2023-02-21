fetchData()

function zoekText() {
  console.log('zoektest draait')
  let zoekWaarde = document.querySelector('[search-input]').value 
  if(zoekWaarde.length > 2){
    fetchData(zoekWaarde)
  }
}

document.querySelector('[search-input]').addEventListener('keyup', zoekText)

function fetchData(query = 'vermeer'){

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

function checkForHash(){
  console.log(location.hash)// Weergave van specifieke hash
  if(location.hash != ''){
    fillObjectModal(location.hash.split('#')[1]);
    return;
  }
  hideModal();
}

function createListItem(aObject) {
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

    fillObjectModal(aObject.objectNumber);

  })
  li.appendChild(image);
  return li;
}

function fillObjectModal(aObject){
  // displayLoading()
  console.log(aObject)
  //Fetch afbeelding data
  const artObjectUrl = 'https://www.rijksmuseum.nl/api/nl/collection/' + aObject + '?key=Y5aZWyUP'

  fetch(artObjectUrl)
    .then(response => {
      return response.json();
    })
    .then(response => {
      // hideLoading()
      let model = document.querySelector('.details');
      console.log(response.artObject);
      model.querySelector('.details-title').textContent = response.artObject.longTitle;
      model.querySelector('.object-afbeelding').src = response.artObject.webImage.url;
      model.querySelector('.object-omschrijving').textContent = response.artObject.description;
      
      if (response.artObject.description === "") {
        return model.querySelector('.object-omschrijving').textContent = "Er is geen beschrijving hiervoor."
      }

      window.history.pushState({objectNumber:aObject}, "Kunstobject: aObject.objectNumber", "#"+aObject);
     
      model.classList.remove('hidden')

      let terugButton = document.querySelector('button')
      terugButton.addEventListener('click', () => {
        history.pushState("", document.title, window.location.pathname + window.location.search);
        model.classList.add('hidden');
        model.querySelector('.object-afbeelding').src = '';
      })
      
    })
}

function hideModal(){
  let modal = document.querySelector('.details');
  modal.classList.add('hidden');
  modal.querySelector('.object-afbeelding').src = '';
}

window.addEventListener('popstate', checkForHash)

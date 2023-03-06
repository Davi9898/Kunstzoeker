
export function fillObjectModal(aObject){
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


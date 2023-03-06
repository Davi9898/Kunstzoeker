
export function fillObjectModal(aObject){
    
    console.log(aObject)
    //Fetch afbeelding data
    const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
    const apiKey = 'Y5aZWyUP&q'
    const artObjectUrl = `${urlApi}/${aObject}?key=${apiKey}`

  
    fetch(artObjectUrl)
      .then(response => {
        return response.json();
      })
      .then(response => {
        
        let modal = document.querySelector('.details');
        console.log(response.artObject);
        modal.querySelector('.details-title').textContent = response.artObject.longTitle;
        modal.querySelector('.object-afbeelding').src = response.artObject.webImage.url;
        modal.querySelector('.object-omschrijving').textContent = response.artObject.description;
        
        if (!response.artObject || !response.artObject.description) {
          modal.querySelector('.object-omschrijving').textContent = "Er is geen beschrijving voor dit kunstobject";
        } else {
          modal.querySelector('.object-omschrijving').textContent = response.artObject.description;
        }
  
        window.history.pushState({objectNumber:aObject}, "Kunstobject: aObject.objectNumber", "#"+aObject);
       
        modal.classList.remove('hidden')
  
        let terugButton = document.querySelector('button')
        terugButton.addEventListener('click', () => {
          history.pushState("", document.title, window.location.pathname + window.location.search);
          modal.classList.add('hidden');
          modal.querySelector('.object-afbeelding').src = '';
        })
        
      })
  }


import keys from "../keys.js"

export function fillObjectModal(aObject){
    
    console.log(aObject)
    //Fetch afbeelding data
    const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
    const apiKey = keys.API_KEY
    const artObjectUrl = `${urlApi}/${aObject}?key=${apiKey}`

  
    fetch(artObjectUrl)
      .then(response => {
        return response.json();
      })
      .then(response => {
        
        let modal = document.querySelector('.details');
        console.log(response.artObject);
        modal.querySelector('section:nth-of-type(3) article h2').textContent = response.artObject.longTitle;
        modal.querySelector('section:nth-of-type(3) article img').src = response.artObject.webImage.url;
        modal.querySelector('section:nth-of-type(3) article p').textContent = response.artObject.description;
        
        if (!response.artObject || !response.artObject.description) {
          modal.querySelector('section:nth-of-type(3) article p').textContent = "Er is geen beschrijving voor dit kunstobject";
        } else {
          modal.querySelector('section:nth-of-type(3) article p').textContent = response.artObject.description;
        }
  
        window.history.pushState({objectNumber:aObject}, "Kunstobject: aObject.objectNumber", "#"+aObject);
       
        modal.classList.remove('hidden')
  
        let terugButton = document.querySelector('button')
        terugButton.addEventListener('click', () => {
          history.pushState("", document.title, window.location.pathname + window.location.search);
          modal.classList.add('hidden');
          modal.querySelector('section:nth-of-type(3) article img').src = '';
        })
        
      })
  }


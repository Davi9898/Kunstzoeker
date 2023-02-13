fetchData()

function fetchData(){
    const url ='https://www.rijksmuseum.nl/api/nl/collection?key=Y5aZWyUP&'
    
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }

console.log(fetchData)
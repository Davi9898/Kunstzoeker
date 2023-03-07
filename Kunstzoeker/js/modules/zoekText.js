import { fetchData } from './fetchData.js';

export function zoekText() {
    console.log('zoektest draait')
    let zoekWaarde = document.querySelector('[search-input]').value 
    if(zoekWaarde.length > 2 && zoekWaarde != ''){
      fetchData(zoekWaarde)
    } else if (zoekWaarde.length < 2) {
      fetchData('Rembrandt')
    }

  }

  document.querySelector('[search-input]').addEventListener('keyup', zoekText)


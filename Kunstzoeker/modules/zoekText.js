import { fetchData } from './fetchData.js';

export function zoekText() {
    console.log('zoektest draait')
    let zoekWaarde = document.querySelector('[search-input]').value 
    if(zoekWaarde.length > 2){
      fetchData(zoekWaarde)
    }
  }

  document.querySelector('[search-input]').addEventListener('keyup', zoekText)


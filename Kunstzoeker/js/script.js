import { fetchData } from './modules/fetchData.js';
import { checkForHash } from './modules/checkForHash.js';
import { zoekText } from './modules/zoekText.js';

fetchData()

document.querySelector('[search-input]').addEventListener('keyup', zoekText)

window.addEventListener('popstate', checkForHash)
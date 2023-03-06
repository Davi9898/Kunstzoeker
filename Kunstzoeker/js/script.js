import { fetchData } from '../modules/fetchData.js';
import { createListItem } from '../modules/createListItem.js';
import { fillObjectModal } from '../modules/fillObjectModal.js';
import { checkForHash } from '../modules/checkForHash.js';
import { hideModal } from '../modules/hideModal.js';
import { zoekText } from '../modules/zoekText.js';

fetchData()
createListItem()
fillObjectModal()
hideModal()



document.querySelector('[search-input]').addEventListener('keyup', zoekText)

window.addEventListener('popstate', checkForHash)
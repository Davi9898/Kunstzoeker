import { fillObjectModal } from "./fillObjectModal.js";
import { hideModal } from "./hideModal.js";

export function checkForHash(){
    console.log(location.hash)// Weergave van specifieke hash
    if(location.hash != ''){
      fillObjectModal(location.hash.split('#')[1]);
      return;
    }
    hideModal();
  }

  console.log(checkForHash)


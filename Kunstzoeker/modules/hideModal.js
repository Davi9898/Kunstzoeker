export function hideModal(){
    let modal = document.querySelector('.details');
    modal.classList.add('hidden');
    modal.querySelector('.object-afbeelding').src = '';
  }
  
  

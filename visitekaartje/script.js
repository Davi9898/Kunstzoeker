console.log(document.querySelectorAll('.stack .card')) 
const apiNaam = document.querySelector('h1')
const cards = [...document.querySelectorAll('.stack .card')]; // Maakt een Array van Nodelist
console.log(cards)

cards.forEach(card => { // maakt een loop die itereert 
  card.addEventListener('click', () => { // maakt een click even listener
    card.classList.add('animate-out'); // voegt de class animate-out toe
    setTimeout(() => { // 1 second delay
      card.classList.remove('animate-out'); // Hierdoor stopt de animatie

      const cardParent = card.parentNode; // We slaan hier het dom element'Stack' in een variable op
      const firstCard = cardParent.querySelector('.card:first-of-type'); // Je selecteert de eerste child van het stack element

      cardParent.insertBefore(card, firstCard); // Bovenaan DOM plaatsen van card Element
    }, 1000);
  });
});

fetchData()

function fetchData(){
const url = 'https://whois.fdnd.nl/api/v1/member?id=cldex6lhk48ci0auoyotb1ivk'

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    veranderH1(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function veranderH1(data){
  console.log(data)
  const name = data.member.name
  apiNaam.innerHTML = name
}


  // cldex6lhk48ci0auoyotb1ivk ID
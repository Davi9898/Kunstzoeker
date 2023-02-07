const apiNaam = document.querySelector('h1')
const cards = document.querySelectorAll('.card'); // elementen selecteren met queryselectorAll card
const order = [...cards].map(card => card.classList[1]); //Maakt een array // ... Spread opeartor wordt gebruikt om de Nodelist returned door QuerySAll in een Array te zetten. map method wordt gebruikt om de tweede class van elke card te extracten

cards.forEach(card => { // maakt een loop die itereert 
  card.addEventListener('click', () => { // maakt een click even listener
    card.classList.add('animate-out'); // voegt de class animate-out toe
    setTimeout(() => { // 1 second delay
      card.classList.remove('animate-out'); // Hierdoor stopt de animatie
      const currentIndex = order.indexOf(card.classList[1]); // Vind de index van de huidige card en slaat het op
      const nextIndex = (currentIndex + 1) % order.length; // Berekent de index van de volgende card door 1 toe teveogen aan huidige Index
      const nextCard = document.querySelector(`.${order[nextIndex]}`);
      nextCard.parentNode.insertBefore(card, nextCard);
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
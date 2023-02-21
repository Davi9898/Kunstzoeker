# Kunstzoeker

## Week 1

https://davi9898.github.io/web-app-from-scratch-2223/Kunstzoeker/

Voor dit project heb ik gekozen om de tweede user story uit te werken:

2. As an art lover, I want to be able to search and view art from the Rijksmuseum at home, so that I can still enjoy art during a lockdown Rijksmuseum - RijksData API

Deze opdracht spreekt mij aan omdat ik hoorde dat je bij de quote API iets minder zou leren, en deze ook zeker te doen zou zijn voor een beginner zoals ik.

### Dag 1
Op de eerste dag van Web-app from scratch ben ik bezig gegaan met het maken van een design voor het scherm van de kunstzoeker. Hieronder staan enkele schermen weergegeven
<img src="" width="500">
<img src="" width="500">
<img src="" width="500">
<img src="" width="500">

Na het realiseren van de schetsen van de schermen ben ik me gaan bezig houden met fetchen van de eerste data via de rijksmuseum API. Je doet dit door een private key aan te vragen op de website van het Rijksmuseum. Hiervoor heb je een account nodig.


### Dag 2
Op de tweede dag van web-app from scratch ben ik bezig gegaan om de data daadwerkelijk in een lijst weer te geven. Dit lukte snel doormiddel van de fetch en elementen te creëeren.

### Problemen

Ik liep als allereerst tegen het probleem aan dat de images die gefetched worden enorm groot zijn. Hierdoor kan het soms heel lang duren voordat deze geladen worden op de pagina. De API biedt een functie waarin je kleinere images kan ophalen. Dit doe je door gebruik te maken van tiles in de URL en daar overheen te loopen om het goede formaat te krijgen.

### Oplossing

De API van Rijksmuseum biedt de functie om verschillende tiles te fetchen. Deze tiles staan in een array en hebben allemaal verschillende groottes. Door in JavaScript een if statement te schrijven waarin je meegeeft dat de img niet groter mag zijn dan aangegeven waardes. Zorg je ervoor dat de image die gereturned wordt de juiste afmetingen heeft. Hierdoor is de img grootte klein en worden ze sneller geladen. Interessant om te vermelden is dat ik ook heb gekeken naar LazyLoading. Ik kreeg dit niet aan de praat.

<code> 
function createListItem(aObject) {
  displayLoading()
  let li = document.createElement("li");
  let image = document.createElement("img");



  //Fetch afbeelding data
  const afbeeldingen = 'https://www.rijksmuseum.nl/api/nl/collection/' + aObject.objectNumber + '/tiles?key=Y5aZWyUP'
  fetch(afbeeldingen)
    .then(response => {
      return response.json();
    })
    .then(images => {
      var mobileLevelIndex = 0;
      images.levels.forEach((level, index) => {
        if (level.width <= 750 && level.width > 250) {
          if (images.levels[index].tiles.length == 1) {
            mobileLevelIndex = index;
          }
        }
      })
      image.src = images.levels[mobileLevelIndex].tiles[0].url
    })
    
 </code>

### Verder functionaliteiten 
De volgende functionaliteiten wil ik nog realiseren:
-SearchQuery
-States
-Detail scherm
-Router
-Modules
-Algehele styling

## Week 2

### Dag 3
Op de derde dag ben ik begonnen met het maken van het detail scherm. De bedoeling is dat de gebruiker een detail scherm krijgt wanneer er op een schilderij geklikt wordt. Deze schuift dan uit van links en geeft meer informatie over het kunstobject. Ik heb dit gedaan door een hidden class van een section af te halen waardoor hij 100vw verschuift naar rechts. Vervolgens wordt alle data van de API ingeladen op het scherm.
<code>
 const artObjectUrl = 'https://www.rijksmuseum.nl/api/nl/collection/' + aObject.objectNumber + '?key=Y5aZWyUP'

  fetch(artObjectUrl)
    .then(response => {
      return response.json();
    })
    .then(response => {
      let model = document.querySelector('.details');
      console.log(response.artObject);
      model.querySelector('.details-title').textContent = response.artObject.longTitle;
      model.querySelector('.object-afbeelding').src = response.artObject.webImage.url;
      model.querySelector('.object-omschrijving').textContent = response.artObject.description;
        
     
      model.classList.remove('hidden')

      const terugButton = document.querySelector('button')
      terugButton.addEventListener('click', () => {
        model.classList.add('hidden');
        model.querySelector('.object-afbeelding').src = '';
      })
</code>
Ook is onderaan de code te zien dat er een terugbutton functionaliteit is toegevoegd. Hierdoor kan de gebruiker op telefoon als in de browser makkelijk terug navigeren.

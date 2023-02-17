# Kunstzoeker

## Week 1

https://davi9898.github.io/web-app-from-scratch-2223/Kunstzoeker/

Voor dit project heb ik gekozen om de tweede user story uit te werken:

2. As an art lover, I want to be able to search and view art from the Rijksmuseum at home, so that I can still enjoy art during a lockdown Rijksmuseum - RijksData API

Deze opdracht spreekt mij aan omdat ik hoorde dat je bij de quote API iets minder zou leren, en deze ook zeker te doen zou zijn voor een beginner zoals ik.

### Problemen

Ik liep als allereerst tegen het probleem aan dat de images die gefetched worden enorm groot zijn. Hierdoor kan het soms heel lang duren voordat deze geladen worden op de pagina. De API biedt een functie waarin je kleinere images kan ophalen. Dit doe je door gebruik te maken van tiles in de URL en daar overheen te loopen om het goede formaat te krijgen.

### Oplossing

De API van Rijksmuseum biedt de functie om verschillende tiles te fetchen. Deze tiles staan in een array en hebben allemaal verschillende groottes. Door in JavaScript een if statement te schrijven waarin je meegeeft dat de img niet groter mag zijn dan aangegeven waardes. Zorg je ervoor dat de image die gereturned wordt de juiste afmetingen heeft. Hierdoor is de img grootte klein en worden ze sneller geladen. Interessant om te vermelden is dat ik ook heb gekeken naar LazyLoading. Ik kreeg dit niet aan de praat.

### Verder functionaliteiten

Verder heb ik alle images die gefetched worden geinjecteerd in een list element en die worden weergegeven op de pagina.

Verder wil ik nog toevoegen:

- SearchQuery (Nog nooit meegewerkt)

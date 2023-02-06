fetch('https://cors-anywhere.herokuapp.com/https://whois.fdnd.nl/api/v1/member?id=cldex6lhk48ci0auoyotb1ivk')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  // cldex6lhk48ci0auoyotb1ivk ID
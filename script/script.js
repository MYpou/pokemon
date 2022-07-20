var form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  //Block the page to refresh
  e.preventDefault();

  //URL for the search
  let urlForm = " https://pokeapi.co/api/v2/pokemon/";
  //Value of the input Name
  let name = document.getElementById("name");
  //Concatenate the url with the input name
  urlForm += this.name.value;
  //Transform all values in lowercase
  urlForm = urlForm.toLocaleLowerCase();

  //ID content
  let answer = document.getElementById("content");
  //ID imgPokemon
  let image = document.getElementById("imgPokemon");

  //HTML answer
  let html = "";

  fetch(urlForm)
    .then((answer) => answer.json())
    .then(function (data) {
      console.log(data);
      html = "Name : " + uppercase(data.name) + "<br>";
      html += "Type : " + uppercase(data.types[0].type.name);

      answer.innerHTML = html;

      image.innerHTML =
        "<img src='" +
        data.sprites.front_default +
        "'><img src='" +
        data.sprites.back_default +
        "'>";
    })
    .catch(function (err) {
      if (err == "SyntaxError: Unexpected token N in JSON at position 0") {
        html = "Pokémon not found! 😵";
      } else {
        html = "Error : " + err;
      }
      answer.innerHTML = html;
    });
});

function uppercase(val) {
  return val[0].toUpperCase() + val.substr(1);
}

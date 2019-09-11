

const BASE_URL = 'http://localhost:3000'

function getBottles() {
  clearForm();
 let main = document.getElementById('main');
 main.innerHTML = '<ul>';
 fetch( '/bottles/home_index')
 .then(resp => resp.json())
 .then(bottles => {
   main.innerHTML += bottles.map(bottle => `<li><a href="#" data-id="${bottle.id}">${bottle.name}</a></li>`).join('')
   main.innerHTML += '</ul>'
 })
}



function displayBottleForm() {
  let bottleFormDiv = document.getElementById('bottle-form');
  let html = `
<form onsubmit="createBottle(); return false;">
  <label>Name: </label>
  <input type="text" id="name"><br/>
  <label>Variety: </label>
  <input type="text" id="variety"><br/>
  <label>Producer: </label>
  <input type="text" id="producer"><br/>
  <label>Year: </label>
  <input type="number" min="1950" max="2099" step="1" value="2019"/><br/>
  <label>Category: </label>
  <select name="category">
  <option value="red">Red</option>
  <option value="white">White</option>
  <option value="rose">Rose</option>
  <option value="orange">Orange</option>
  <option value="sparkling">Sparkling</option>
  <option value="dessert">Dessert</option>
</select><br/>

  <label>Price in USD: </label>
  <input type="number" id="price" min="1"><br/>

  <input type="submit" value="Add Bottle">
</form>
`

bottleFormDiv.innerHTML = html;
}



function displayBottleInfo(e) {
e.preventDefault();

let id = this.dataset.id;
let main = document.getElementById('main');
main.innerHTML = '';
fetch('/bottles/' + id)
  .then(resp => resp.json())
  .then(bottle => {
    main.innerHTML += `<h2>${bottle.name}</h2>`
  })
}

function createBottle() {
  const bottle = {
    name: document.getElementById('name').value,
    variety: document.getElementById('variety').value,
    producer: document.getElementById('producer').value,
    year: document.getElementById('year').value,
    category: document.getElementById('category').value,
    price: document.getElementById('price').value
   }
  fetch( '/bottles/home_index', {
    method: 'POST',
      body: JSON.stringify({ bottle }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  .then(bottle => {
    document.querySelector("#main ul").innerHTML += `<li>${bottle.name}</li>`
    debugger
    let bottleFormDiv = document.getElementById('bottle-form');
    bottleFormDiv.innerHTML = '';
  })
}



function clearForm() {
  let bottleFormDiv = document.getElementById('bottle-form');
bottleFormDiv.innerHTML = '';
}

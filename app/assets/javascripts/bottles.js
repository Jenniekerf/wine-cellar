

const BASE_URL = 'http://localhost:3000'

function getBottles() {
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
  <input type="date" id="year"><br/>
  <label>Category: </label>
  <input type="text" id="category"><br/>
  <label>Price: </label>
  <input type="number" id="price"><br/>

  <input type="submit" value="Add Bottle">
</form>
`

bottleFormDiv.innerHTML = html;
}



// function displayBottleInfo(e) {
//   debugger
// e.preventDefault();
// clearForm();
// let id = this.dataset.id;
// let main = document.getElementById('main');
// main.innerHTML = '';
// fetch(BASE_URL + '/bottles/' + id + '.json')
//   .then(resp => resp.json())
//   .then(bottle => {
//     main.innerHTML += `<h2>${bottle.name}</h2>`
//   })
// }
//
function createBottle() {
  const bottle = {
    name: document.getElementById('name').value,
    variety: document.getElementById('variety').value,
    producer: document.getElementById('producer').value,
    year: document.getElementById('year').value,
    category: document.getElementById('category').value,
    price: document.getElementById('price').value

   }
  fetch(BASE_URL + '/bottles', {
    method: 'POST',
      body: JSON.stringify({ bottle }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  .then(bottle => {
    document.querySelector("#main ul").innerHTML += `<li>${bottle.name}</li>`
    let bottleFormDiv = document.getElementById('bottle-form');
    bottleFormDiv.innerHTML = '';
  })
}



// function clearForm() {
//   let commentFormDiv = document.getElementById('comment-form');
// commentFormDiv.innerHTML = '';
// }



const BASE_URL = 'http://localhost:3000'

class Bottle {
	constructor(bottle) {
		this.id = bottle.id
		this.name = bottle.name
		this.variety = bottle.variety
    this.producer = bottle.producer
    this.year = bottle.year
    this.category = bottle.category
    this.price_cents = bottle.price_cents
		this.comments = bottle.comments

	}

  renderBottles(){
    return (`<a href="/bottles/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.name}</br></h1></a>`)

  }

  renderBottle(){
    let bottleComments = this.comments.map(comment => {
      return (`
        <p>- ${comment.tasting_note}</p>
      `)
    }).join('')

    return (`<h2>${this.name}</h2><h3>Variety:</h3><h4>${this.variety}</h4><h3>Producer: </h3><h4>${this.producer}</h4><h3>Year: </h3><h4>${this.year}</h4><h3>Category: </h3><h4>${this.category}</h4><h3>Price: </h3><h4>$${this.price_cents}</h4><h3>Tasting notes: </h3><h4>${bottleComments}</h4><a onclick="editBottle(event);" data-id="${this.id}" style="color: #337ab7; text-decoration: none; cursor: pointer;">Edit Bottle</a>`)
  }

}


function getBottles() {
  clearForm();
 let main = document.getElementById('main');
 main.innerHTML = '<ul>';
 fetch( '/bottles/home_index')
 .then(resp => resp.json())
 .then(bottles => {
   main.innerHTML += bottles.map(bottle =>
   {const btl = new Bottle(bottle)
   return btl.renderBottles()}).join('')
   main.innerHTML += '</ul>'

 })


 $(document).on('click', ".show_link", function(e) {
   clearForm()
   e.preventDefault()
   $('#js-container').html('')
   let id = $(this).attr('data-id')
   fetch(`/bottles/${id}.json`)
   .then(res => res.json())
   .then(bottle => {
    let newBottle = new Bottle(bottle)
    let bottleHtml = newBottle.renderBottle()

    $('#js-container').append(bottleHtml)
    })
  })

}


function displayBottleForm() {
  clearForm();
  let bottleFormDiv = document.getElementById('bottle-form');
	let html =
	`<form onsubmit="createBottle(); return false;">
		<label>Name: </label>
	  <input type="text" id="name" class="form-control"><br/>
		<label>Variety: </label>
	  <input type="text" id="variety" class="form-control"><br/>
	  <label>Producer: </label>
	  <input type="text" id="producer" class="form-control"><br/>
	  <label>Year: </label>
	  <input type="number" id="year" class="form-control" min="1950" max="2099" step="1" value="2019"/><br/>
	  <label>Category: </label>
	<select id="category" class="form-control">
	  <option value="Red">Red</option>
	  <option value="White">White</option>
	  <option value="Rosé">Rose</option>
	  <option value="Orange">Orange</option>
	  <option value="Sparkling">Sparkling</option>
	  <option value="Dessert">Dessert</option>
	</select><br/>
	  <label>Price in USD: </label>
	  <input type="number" id="price_cents" class="form-control" min="1" max="5000" step="1" value="10"><br/>
	  <input type="submit" class="btn btn-primary" value="Submit">

	</form>
	`
  bottleFormDiv.innerHTML = html;
}



function createBottle() {

  const bottle = {

    name: document.getElementById('name').value,
    variety: document.getElementById('variety').value,
    producer: document.getElementById('producer').value,
    year: document.getElementById('year').valueAsNumber,
    category: document.getElementById('category').value,
    price_cents: document.getElementById('price_cents').valueAsNumber,
    //comments: document.getElementById('comments').value
    }

  fetch('/bottles/home_index', {
    method: 'POST',
      body: JSON.stringify({ bottle }),

    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

  }).then(resp => resp.json())
    .then(bottle => {
    const btl = new Bottle(bottle)
    document.querySelector("#main ul").innerHTML += btl.renderBottle()

    let bottleFormDiv = document.getElementById('bottle-form');
    bottleFormDiv.innerHTML = '';
  })
}


function patchBottle(event) {
  event.preventDefault();
  const bottle = {

    name: document.getElementById('name').value,
    variety: document.getElementById('variety').value,
    producer: document.getElementById('producer').value,
    year: document.getElementById('year').valueAsNumber,
    category: document.getElementById('category').value,
    price_cents: document.getElementById('price_cents').valueAsNumber,
    //comments: document.getElementById('comments').value
  }
  id = parseInt(event.target.attributes["data-id"].value);
  fetch(BASE_URL + `/bottles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ bottle }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
	  .then(resp => resp.json())
    .then(bottle => {
    document.querySelector('#js-container').innerHTML = '';
    let updatedBottle = new Bottle(bottle)
    let bottleHtml = updatedBottle.renderBottle()

    document.querySelector("#js-container").innerHTML = bottleHtml;
  })
}

function editBottle(e) {
  let id;
  e.preventDefault();
  id = parseInt(event.target.attributes["data-id"].value);
  fetch(BASE_URL + `/bottles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(bottle => {
    let container, html;
    document.querySelector('#js-container').innerHTML = '';
    html =
      `<form onsubmit="patchBottle(event); return false;" data-id="${bottle.id}">
        <label>Name: </label>
      <input type="text" id="name" class="form-control" value="${bottle.name}"><br/>
        <label>Variety: </label>
      <input type="text" id="variety" class="form-control" value="${bottle.variety}"><br/>
      <label>Producer: </label>
      <input type="text" id="producer" class="form-control" value="${bottle.producer}"><br/>
      <label>Year: </label>
      <input type="number" id="year" class="form-control" min="1950" max="2099" step="1" value="2019"/><br/>
      <label>Category: </label>
    <select id="category" class="form-control">
      <option value="Red">Red</option>
      <option value="White">White</option>
      <option value="Rosé">Rose</option>
      <option value="Orange">Orange</option>
      <option value="Sparkling">Sparkling</option>
      <option value="Dessert">Dessert</option>
    </select><br/>
      <label>Price in USD: </label>
      <input type="number" id="price_cents" class="form-control" min="1" max="5000" step="1" value="${bottle.price_cents}"><br/>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  `
  document.querySelector('#js-container').innerHTML = html
  document.querySelector('#category').value = bottle.category
  document.querySelector('#year').value = bottle.year
  })
}


function clearForm() {
  let bottleFormDiv = document.getElementById('bottle-form');
bottleFormDiv.innerHTML = '';
}

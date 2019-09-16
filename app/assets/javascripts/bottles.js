

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
    let bottleComments = this.comments.map(comment => {
      return (`
        <p>${comment.tasting_note}</p>
      `)
    }).join('')

    return (`<a href="/bottles/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.name}</br></h1></a>`)

  }

  renderBottle(){
    let bottleComments = this.comments.map(comment => {
      return (`
        <p>${comment.tasting_note}</p>
      `)
    }).join('')

    return (`<h2>${this.name}</br>Variety: ${this.variety}</br>Producer: ${this.producer}</br>Year: ${this.year}</br>Category: ${this.category}</br>Price: $${this.price_cents}</br>Tasting notes: ${bottleComments}<br></br></h2></a>`)

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
   $('#app-container').html('')
   let id = $(this).attr('data-id')
   fetch(`/bottles/${id}.json`)
   .then(res => res.json())
   .then(bottle => {
    let newBottle = new Bottle(bottle)
    let bottleHtml = newBottle.renderBottle()

    $('#app-container').append(bottleHtml)
    })
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
  <input type="number" id="year" min="1950" max="2099" step="1" value="2019"/><br/>
  <label>Category: </label>
<select id="category">
  <option value="red">Red</option>
  <option value="white">White</option>
  <option value="rose">Rose</option>
  <option value="orange">Orange</option>
  <option value="sparkling">Sparkling</option>
  <option value="dessert">Dessert</option>
</select><br/>
  <label>Price in USD: </label>
  <input type="number" id="price_cents" min="1" max="5000" step="1" value="10"><br/>
  <label>Comments: </label>
  <input type="textarea" id="comments"></br>
  <input type="submit" value="Submit">
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
    comments: document.getElementById('comments').value
    }

  fetch(BASE_URL + '/bottles/home_index', {
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

function clearForm() {
  let bottleFormDiv = document.getElementById('bottle-form');
bottleFormDiv.innerHTML = '';
}

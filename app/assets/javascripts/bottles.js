# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

const BASE_URL = 'http://localhost:3000'

function getBottles() {
  clearForm();
 let main = document.getElementById('main');
 main.innerHTML = '<ul>';
 fetch(BASE_URL + '/bottles/home.json')
 .then(resp => resp.json())
 .then(bottles => {
   main.innerHTML += bottles.map(bottle => `<li><a href="#" data-id="${bottle.id}">${bottle.name}</a></li>`).join('')
   main.innerHTML += '</ul>'
 })
}

function displayBottle(e) {
e.preventDefault();
clearForm();
let id = this.dataset.id;
let main = document.getElementById('main');
main.innerHTML = '';
fetch(BASE_URL + '/bottles/' + id + '.json')
  .then(resp => resp.json())
  .then(todo => {
    main.innerHTML += `<h2>${bottle.name}</h2>`
  })
}

function createComment() {
  const comment = {
    comment: document.getElementById('comment-form').value,
   }
  fetch(BASE_URL + '/bottles/' + id + .’json’, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  .then(comment => {
    document.querySelector("#main ul").innerHTML += `<li>${comment.tasting_note} - ${comment.commentor.username}</li>`
    let commentFormDiv = document.getElementById('comment-form');
    commentFormDiv.innerHTML = '';
  })


function displayCommentForm() {
  let commentFormDiv = document.getElementById(‘comment-form’);
  let html = `
<form onsubmit=”createComment(); return false;”>
  <label>Tasting Note: </label>
  <input type=”text” id=”tasting-note”><br/>
  <lnput type=”submit” value=”Add comment”>
</form>
`

commentFormDiv.innerHTML = html;
}

function clearForm() {
  let commetnFormDiv = document.getElementById('comment-form');
commentFormDiv.innerHTML = ‘’;
}



const BASE_URL = 'http://localhost:3000'

function getBottles() {

 let main = document.getElementById('main');
 main.innerHTML = '<ul>';
 fetch(BASE_URL + '/bottles/home.json')
 .then(resp => resp.json())
 .then(bottles => {
   main.innerHTML += bottles.map(bottle => `<li><a href="#" data-id="${bottle.id}">${bottle.name}</a></li>`).join('')
   main.innerHTML += '</ul>'
 })
}




function getBottleInfo() {

  let main = document.getElementById('main');
  main.innerHTML = '<ul>';
  fetch(BASE_URL + '/bottles/' + id + '.json')
  .then(resp => resp.json())
  .then(bottle => {
    main.innerHTML += `<h2>${bottle.name}</h2>`
    main.innerHTML += '</ul>'
  })
}

function displayCommentForm() {
  let commentFormDiv = document.getElementById('comment-form');
  let html = `
<form onsubmit="createComment(); return false;">
  <label>Tasting Note: </label>
  <input type="text" id="tasting-note"><br/>
  <input type="submit" value="Add comment">
</form>
`

commentFormDiv.innerHTML = html;
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
function createComment() {
  const comment = {
    comment: document.getElementById('tasting_note').value
   }
  fetch(BASE_URL + '/bottles/' + bottle_id + '/comments', {
    method: 'POST',
      body: JSON.stringify({ comment }),
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
}



// function clearForm() {
//   let commentFormDiv = document.getElementById('comment-form');
// commentFormDiv.innerHTML = '';
// }

var requestURL = 'assets/bdd.json';
var request = new XMLHttpRequest();
/* nouvelle requete */
request.open('GET', requestURL);
/* envoi de la requete */
request.responseType = 'json';
request.send();
/* reponse du serveur et traitement */
request.onload = function() {
	var randomMovie = getRandomInt(request.response.movies.length);
  var moviesRequest = request.response.movies[randomMovie];
  cardMovie(moviesRequest);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function cardMovie(jsonObject) {
	var ratingSection = document.getElementById('ratingId');
	ratingSection.removeAttribute('class');
	ratingSection.classList.add(jsonObject.rating);

	var quoteSection = document.getElementById('quoteId');
	quoteSection.textContent = "« " + jsonObject.quote + " »";

	var authorSection = document.getElementById('authorId');
	authorSection.textContent = jsonObject.author + ", ";

	var siteSection = document.createElement('cite');
  siteSection.textContent = jsonObject.site;
  authorSection.appendChild(siteSection);

  var movieSection = document.getElementById('movieId');
	movieSection.textContent = jsonObject.movie;
	var directorSection = document.getElementById('directorId');
	directorSection.textContent = jsonObject.director;
	var dateSection = document.getElementById('dateId');
	dateSection.textContent = "(" + jsonObject.publication + ")";

	authorSection.setAttribute('href', jsonObject.url);
	var blockquoteSection = document.getElementById('blockquoteId');
	blockquoteSection.setAttribute('cite', jsonObject.url);
}

window.onload = function(){ 
	var generate = document.getElementById('generateId');
	generate.onclick = function() {
	  // location.reload();
	  answer.removeAttribute('class');
	  var randomMovie = getRandomInt(request.response.movies.length);
  	var moviesRequest = request.response.movies[randomMovie];
  	cardMovie(moviesRequest);
	}

	var answer = document.getElementById('answerId');
	answer.onclick = function() {
		answer.classList.add('open');
	}

	
};

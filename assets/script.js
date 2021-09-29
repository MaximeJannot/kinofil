var requestURL = 'assets/bdd.json';
var request = new XMLHttpRequest();
/* nouvelle requete */
request.open('GET', requestURL);
/* envoi de la requete */
request.responseType = 'json';
request.send();
/* reponse du serveur et traitement */
request.onload = function() {
	var arrayMovie = request.response.movies;
	shuffleArray(arrayMovie);
	let i = 0;
	var selectMovie = arrayMovie[i];
	cardMovie(selectMovie);

	var counter = document.getElementById('counterId');
	let counterInit = 1;
	counter.textContent = counterInit + "/" + arrayMovie.length;

	window.onload = function(){ 
		var generate = document.getElementById('generateId');
		var answer = document.getElementById('answerId');
		
		generate.onclick = function() {
			answer.removeAttribute('class');

			const j = i++;
			const counterInitPlus = counterInit++;
			if (i < arrayMovie.length) {
				var selectMovie = arrayMovie[i];
				cardMovie(selectMovie);
				counter.textContent = counterInit + "/" + arrayMovie.length;
			} else {
				console.log('prout');
			}
		}

		answer.onclick = function() {
			answer.classList.add('open');
		}
	};

}

function shuffleArray(inputArray){
  inputArray.sort(()=> Math.random() - 0.5);
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
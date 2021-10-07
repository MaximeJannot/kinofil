var requestURL = 'assets/bdd.json';
var request = new XMLHttpRequest();
/* nouvelle requete */
request.open('GET', requestURL);
/* envoi de la requete */
request.responseType = 'json';
request.send();
/* reponse du serveur et traitement */
request.onload = function() {
	/*
		jsonObject : selectMovie = 1 object in array
		arrayBdd : arrayMovie = array movies
	*/
	var arrayMovie = request.response.movies;
	shuffleArray(arrayMovie);
	let i = 0;
	var selectMovie = arrayMovie[i];

	cardMovie(selectMovie);
	counterMovies(arrayMovie);
	choiceQcm(selectMovie, arrayMovie, i);
	btnNext(arrayMovie);

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

function shuffleArray(inputArray){
  inputArray.sort(()=> Math.random() - 0.5);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function choiceQcm(jsonObject, arrayBdd, counter) {
	// var arraySplice = arrayBdd.splice(0, 1);

	var arrayNbChoice = [];
	for (i = 0; i < arrayBdd.length; i++) {
		arrayNbChoice.push(i);
	}
	arrayNbChoice.splice(counter,1);
	console.log(arrayNbChoice);
	shuffleArray(arrayNbChoice);
	var choise1 = arrayNbChoice[0];
	var choise2 = arrayNbChoice[1];
	var choise3 = arrayNbChoice[2];
	var arrayQcm = [jsonObject,arrayBdd[choise1],arrayBdd[choise2],arrayBdd[choise3]];
	shuffleArray(arrayQcm);
	let id = 1;
	for (i = 0; i < 4; i++) {
		document.getElementById('choix'+id+'Label').textContent = arrayQcm[i].movie + ", " + arrayQcm[i].director + "(" + arrayQcm[i].publication + ")";
		document.getElementById('choix'+id+'Input').setAttribute('value', arrayQcm[i].movie);
		const idAdd = id++;
	}

	/*var arrayNbChoice = [2,6,8];
	shuffleArray(arrayNbChoice);
	var choiceRandom1 = arrayNbChoice[0];
	var choiceRandom2 = arrayNbChoice[1];
	var choiceRandom3 = arrayNbChoice[2];
	var arrayQcm = [jsonObject,arrayBdd[choiceRandom1],arrayBdd[choiceRandom2],arrayBdd[choiceRandom3]];
	shuffleArray(arrayQcm);

	let id = 1;
	for (i = 0; i < 4; i++) {
		document.getElementById('choix'+id+'Label').textContent = arrayQcm[i].movie + ", " + arrayQcm[i].director + "(" + arrayQcm[i].publication + ")";
		document.getElementById('choix'+id+'Input').setAttribute('value', arrayQcm[i].movie);
		const idAdd = id++;
	}*/
}

function counterMovies(arrayBdd) {
	var counter = document.getElementById('counterId');
	let counterInit = 1;
	counter.textContent = counterInit + "/" + arrayBdd.length;
}

function btnNext(arrayBdd) {
	window.onload = function(){ 
		var generate = document.getElementById('generateId');
		var answer = document.getElementById('answerId');
		var counter = document.getElementById('counterId');

		let i = 0;
		let counterInit = 1;
		
		generate.onclick = function() {
			answer.removeAttribute('class');

			const j = i++;
			const counterInitPlus = counterInit++;
			if (i < arrayBdd.length) {
				var arrayMovie = arrayBdd;
				var selectMovie = arrayMovie[i];
				cardMovie(selectMovie);
				choiceQcm(selectMovie, arrayMovie, i);
				counter.textContent = counterInit + "/" + arrayBdd.length;
			} else {
				console.log('prout');
			}
		}

		answer.onclick = function() {
			answer.classList.add('open');
		}
	};
}
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

	counterMovies(arrayMovie);
	cardMovie(selectMovie);
	choiceQcm(selectMovie, arrayMovie, i);
	btnApp(arrayMovie);
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
	var arrayNbChoice = [];
	for (i = 0; i < arrayBdd.length; i++) {
		arrayNbChoice.push(i);
	}
	arrayNbChoice.splice(counter,1);
	shuffleArray(arrayNbChoice);
	var choise1 = arrayNbChoice[0];
	var choise2 = arrayNbChoice[1];
	var choise3 = arrayNbChoice[2];
	var arrayQcm = [jsonObject,arrayBdd[choise1],arrayBdd[choise2],arrayBdd[choise3]];
	shuffleArray(arrayQcm);
	var inputRadio = document.getElementsByName("choiceMovie");
	var alertAnswer = document.getElementById('alertAnswer');
	var alertAnswerTrue = document.getElementById('alertAnswerTrue');
	var alertAnswerFalse = document.getElementById('alertAnswerFalse');
	var alertAnswerDetail = document.getElementById('alertAnswerDetail');

	let id = 1;

	for (i = 0; i < 4; i++) {
		document.getElementById('choix'+id+'Label').textContent = arrayQcm[i].movie /*+ ", " + arrayQcm[i].director*/ + " (" + arrayQcm[i].publication + ")";
		document.getElementById('choix'+id+'Input').removeAttribute('value');
		document.getElementById('choix'+id+'Input').checked = false;
		alertAnswer.removeAttribute('class');
		alertAnswer.textContent = "";
		alertAnswerDetail.textContent = "";
		css(alertAnswerTrue, {
		    display: 'none'
		});
		css(alertAnswerFalse, {
		    display: 'none'
		});
		css(document.getElementById('answerVerification'), {
		    display: 'flex'
		});
		document.getElementById('errorAnswer').textContent = "";
		if (arrayQcm[i].movie == jsonObject.movie) {
			document.getElementById('choix'+id+'Input').setAttribute('value', 1);
		} 
		const idAdd = id++;
	}

	document.getElementById('answerVerification').onclick = function() {
		if (!document.querySelector('input[type="radio"]:checked')) {
			document.getElementById('errorAnswer').textContent = "Tu n'as pas selectionné de réponse.";
		}
		if (document.querySelector('input[type="radio"]:checked').getAttribute('value')) {
			alertAnswer.textContent = "Bonne réponse";
			alertAnswer.classList.add('true');
			css(alertAnswerTrue, {
			    display: 'flex'
			});
			css(document.getElementById('answerVerification'), {
			    display: 'none'
			});
			alertAnswerTrue.textContent = " " + jsonObject.movie + ", " + jsonObject.director + " (" + jsonObject.publication + ")";
			disabledRadioBtn(true);
			document.getElementById('errorAnswer').textContent = "";
		} else {
			alertAnswer.textContent = "Mauvaise réponse";
			alertAnswer.classList.add('false');
			css(alertAnswerFalse, {
			    display: 'flex'
			});
			css(document.getElementById('answerVerification'), {
			    display: 'none'
			});
			alertAnswerDetail.textContent = " " + jsonObject.movie + ", " + jsonObject.director + " (" + jsonObject.publication + ")";
			disabledRadioBtn(true);
			document.getElementById('errorAnswer').textContent = "";
		}
	};
}

function disabledRadioBtn(value) {
	document.getElementById("choix1Input").disabled = value;
	document.getElementById("choix2Input").disabled = value;
	document.getElementById("choix3Input").disabled = value;
	document.getElementById("choix4Input").disabled = value;
}

function css(element, style) {
	for (const property in style) {
		element.style[property] = style[property];
	}    
}

function counterMovies(arrayBdd) {
	var counter = document.getElementById('counterId');
	let counterInit = 1;
	counter.textContent = counterInit + "/" + 20;
}

function btnApp(arrayBdd) {
	window.onload = function(){ 
		var generate = document.getElementById('generateId');
		var answerVerification = document.getElementById('answerVerification');
		var generateScore = document.getElementById('generateScore');
		var containerScore = document.getElementById('boxPointCounter');
		var counter = document.getElementById('counterId');
		var counterScore = document.getElementById('pointCounter');
		var reset = document.getElementById('resetId');
		var score = [];

		let i = 0;
		let counterInit = 1;
		
		/* Next movie */
		generate.onclick = function() {

			/* counter score */
			if (alertAnswer.textContent == "Bonne réponse") {
				score.push('true');
			}
			/* ** */

			disabledRadioBtn(false);
			/* generate new movie */
			const j = i++;
			const counterInitPlus = counterInit++;
			if (i < arrayBdd.length) {
				var arrayMovie = arrayBdd;
				var selectMovie = arrayMovie[i];
				
				cardMovie(selectMovie);
				choiceQcm(selectMovie, arrayMovie, i);
				
				counter.textContent = counterInit + "/" + 20;

				if (counterInit == 20) {
					css(generate, {
				    display: 'none'
					});
					css(generateScore, {
				    display: 'flex'
					});
				}
			} else {
				console.log(i);
			}
		}

		/* Generate score */
		generateScore.onclick = function() {
			if (alertAnswer.textContent == "Bonne réponse") {
				score.push('true');
			}
			var pourcentageScore = ((score.length / arrayBdd.length) * 100);
			counterScore.textContent = score.length + "/" + arrayBdd.length;
			css(reset, {
		    display: 'flex'
			});
			css(containerScore, {
		    display: 'flex'
			});
			css(generateScore, {
		    display: 'none'
			});
			var commentPointCounter = document.getElementById("commentPointCounter");
			if (pourcentageScore < 25) {
				commentPointCounter.textContent = "Outch ! C'est franchement mauvais."
			} else if (pourcentageScore >= 50 && pourcentageScore < 90 ) {
				commentPointCounter.textContent = "Mouai pas mal."
			} else if (pourcentageScore >= 90) {
				commentPointCounter.textContent = "T'es incollable !"
			}
			disabledRadioBtn(true);
		}
	};
}
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
		if (arrayQcm[i].movie == jsonObject.movie) {
			document.getElementById('choix'+id+'Input').setAttribute('value', 1);
		} 
		const idAdd = id++;
	}
	
	for (i = 0; i < 4; i++) {
		if (inputRadio[i].getAttribute('value')) {
			inputRadio[i].onclick = function() {
				alertAnswer.textContent = "Bonne réponse";
				alertAnswer.classList.add('true');
				css(alertAnswerTrue, {
				    display: 'flex'
				});
				alertAnswerTrue.textContent = " " + jsonObject.movie + ", " + jsonObject.director + " (" + jsonObject.publication + ")";
				disabledRadioBtn(true);
			};
		} else {
			inputRadio[i].onclick = function() {
				alertAnswer.textContent = "Mauvaise réponse";
				alertAnswer.classList.add('false');
				css(alertAnswerFalse, {
				    display: 'flex'
				});
				alertAnswerDetail.textContent = " " + jsonObject.movie + ", " + jsonObject.director + " (" + jsonObject.publication + ")";
				disabledRadioBtn(true);
			};
		}
	}
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
	counter.textContent = counterInit + "/" + arrayBdd.length;
}

function btnApp(arrayBdd) {
	window.onload = function(){ 
		var generate = document.getElementById('generateId');
		// var answer = document.getElementById('answerId');
		var counter = document.getElementById('counterId');
		var reset = document.getElementById('resetId');

		let i = 0;
		let counterInit = 1;

		/* Counter Point */
		var inputRadio = document.getElementsByName("choiceMovie");
		let pointCounterValue = 0;
		document.getElementById("pointCounter").textContent = pointCounterValue + "/" + arrayBdd.length;

		for (i = 0; i < 4; i++) {
			if (inputRadio[i].getAttribute('value')) {
				inputRadio[i].onclick = function() {
					const pointCounterValueAdd = pointCounterValue++;
					document.getElementById("pointCounter").textContent = pointCounterValue + "/" + arrayBdd.length;
				};
			} 
		}
		
		/* Next movie */
		generate.onclick = function() {
			disabledRadioBtn(false);
			
			const j = i++;
			const counterInitPlus = counterInit++;
			if (i < arrayBdd.length) {
				var arrayMovie = arrayBdd;
				var selectMovie = arrayMovie[i];
				cardMovie(selectMovie);
				choiceQcm(selectMovie, arrayMovie, i);
				counter.textContent = counterInit + "/" + arrayBdd.length;
				if (counterInit == arrayBdd.length) {
					css(reset, {
				    display: 'flex'
					});
					if (counterInit == arrayBdd.length) {
						css(generate, {
					    display: 'none'
						});
					}
				}
			} else {
				console.log(i);
			}

			/* Counter Point */
			for (i = 0; i < 4; i++) {
				if (inputRadio[i].getAttribute('value')) {
					inputRadio[i].onclick = function() {
						const pointCounterValueAdd = pointCounterValue++;
						document.getElementById("pointCounter").textContent = pointCounterValue + "/" + arrayBdd.length;
					};
				} 
			}
			/* ** */
		}
	};
}
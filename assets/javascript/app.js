


// This will start the timer once  page Loads//
var  refreshIntervalid;

function showCorrectAnswer() {
	console.log(quiz.getQuestionIndex().answer);
	var answer = document.getElementById("answer");
	answer.innerHTML = quiz.getQuestionIndex().answer;
	var button_div = document.getElementById("button_div");
	button_div.style.visibility = "hidden";
	var refreshIntervalAnswer = setInterval(function () {
		clearInterval(refreshIntervalAnswer);
		quiz.guess("");
  		populate();
		button_div.style.visibility = "visible";
  		answer.innerHTML = "";
  		startTimer();

    }, 3000);
}


function startTimer() {
	console.log("it started");
    var timer = 25;
    refreshIntervalid = setInterval(function () {
    	var clock = document.getElementById("timer");
	    clock.innerHTML = "You have" + " " + timer + " " + "seconds left!";
    	if (timer === 0) {
    		clearInterval(refreshIntervalid);
    		showCorrectAnswer();
    	} else {
    		timer = timer - 1;
       	}
	    console.log("timer value" + timer);

    }, 1000);



}

window.onload = function () {
	var button = document.getElementById("START");
	button.onclick = function() {
		console.log("clicked");
		populate();
	}

};


// function for timer ends here
// ///////////////////////////////////////////////////////
// New function starts here




function populate() {
	if(quiz.isEnded()) {
		showScores();
	}

	else {
		startTimer();
		console.log("hi")
		// This will show a question //
		// returns the element that has the ID "question" //
		
		var element = document.getElementById("question");

		// then display question in Web; pulling it from Quiz.prototype.getQuestionIndex = function() { //
		// This will also return a value to the caller; //
	
		element.innerHTML = quiz.getQuestionIndex().text;

		// This will show choices //
		
		var choices = quiz.getQuestionIndex().choices;

		// This is a for loop so it executed repeatedly //
		
		for (var i = 0; i< choices.length; i++) {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			addclicklistener("btn" + i, choices[i]);
		}
	}

};

function addclicklistener (id, guess) {
	var button = document.getElementById(id);
	button.onclick = function() {
		clearInterval(refreshIntervalid);
		quiz.guess(guess);
		populate();
	}
};


// these are my questions for the trivia game

var questions = [
	new Question("Who was Michael Myer's first victim at age six?", ["his mother", "his teacher", "his sister", "the town sherriff"], "his sister"),
	new Question("What kind of creature was the thing?", ["Sea Monster", "Mummy", "Space Alien", "A man made Monster"], "Space Alien"),
	new Question("In 'Nightmare on Elm Street', what colors are Freddy Krueger's sweater?", ["Black and Gold", "Red and Green", "Red and Black", "White and Black"], "Red and Green"),
	new Question("In 'The Exorcist', what was the little girl's name?", ["Regan", "Susie", "Amy", "Krissy"], "Regan"),
	new Question("In what movie did Jack Nicholson play Jack Torrance?", ["The Shining", "Psycho", "Texas Chainsaw Massacre", "Get Out"], "The Shining"),
	new Question("In the movie 'Child's Play', what was Chuckie?", ["A stuffed animal", "a dog", "a monkey", "Good guys doll"], "Good guys doll"),
	new Question("What famous villian stalks children in their dreams?", ["Jason Vorhees", "Leatherface", "Freddy Kreuger", "Hannibal Lector"], "Freddy Kreuger"),
	new Question("Who was the psycho in the movie Halloween?", ["Pennywise", "Freddy Kreuger", "Michael Myers", "Jason"], "Michael Meyers"),
	new Question("What Horror movie makes you believe that everyone has died, when they have not?", ["Friday the 13th", "April Fools Day", "Get Out", "Carrie"], "April Fools Day"),
	new Question("Which movie, starring Brad Pitt, featured the Seven Deadly Sins from the Bible?", ["Fear No Evil", "Seven", "Saw IV", "House of Wax"], "Seven"),
];

var quiz = new Quiz (questions);

populate();

$(document).ready(function() {
    
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function that is triggered by the start button, and generates the HTML seen on the screen

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();

	timerWrapper();

}); 

//mouseover function

$(".answer").mouseover(function(){
    $("answer").css("background-color", "yellow");
});


$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); 
});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

//Create all the global variables

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["In the movie The Wizard of Oz, what did the Scarecrow want from the wizard?", 
"What was Marilyn Monroe's name at birth?", 
"Which actor played the main character in the 1990 film Edward Scissorhands?", 
"In the Superman movies what newspaper does Clark Kent Work for?", 
"In what movie, if you watch a certain video you'll die in 7 days?", 
"Who was the main lead in Singin in the Rain?", 
"In The Lord Of The Rings, what's the name of the Elf that takes part in The Fellowship Of The Ring?", 
"In the Lion King, what was Simba's fathers name?"];

var answerArray = [["Courage", "Brain", "Map", "Dog"],
 ["Norma Jeane Mortenson","Mary-Jane Watson","Lois Lane","Money Penny"],
 ["George Clooney", "Johnny Depp", "Matt Damon", "Brad Pitt"],
  ["The Daily Planet","The New York Times","The Washington Post","The Telegraph"],
  ["The Round", "The Circle", "The Bell", "The Ring"], 
  ["Gene Kelly","Fred Astaire","Frank Sinatra","Spencer Tracy"], 
  ["Peggie", "Toto", "Logoman", "Legolas"], ["Scare", "Jumbo","Batista", "Mufasa"]];

var imageArray = ["<img class='center-block img-right' src='assets/images/scarecrow.jpg'>",
 "<img class='center-block img-right' src='assets/images/marilyn.jpg'>",
  "<img class='center-block img-right' src='assets/images/edward.jpg'>", 
  "<img class='center-block img-right' src='assets/images/kent.jpg'>",
   "<img class='center-block img-right' src='assets/images/ring.jpg'>",
    "<img class='center-block img-right' src='assets/images/singin.jpg'>", 
    "<img class='center-block img-right' src='assets/images/legolas.jpg'>", 
    "<img class='center-block img-right' src='assets/images/mufasa.jpg'>"];

var correctAnswers = ["B. Brain", "A. Norma Jeane Mortenson", "B. Johnny Depp", "A. The Daily Planet", "D. The Ring", "A. Gene Kelly", "D. Legolas", "D. Mufasa"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/buttonclick.mp3");

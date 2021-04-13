

//Runs once at the beginning
function setup() {
    var googleSheetLink = "1f9ctZqIIHu5QFUSp-ZDEpHOv4nCBnLACKx_12-U25-I";
    loadGoogleSheet(googleSheetLink).then(displayWelcome); 

  }
  
  function displayWelcome() {
    $(".screen").hide();
    $("#welcome-screen").show();
  }
  
  function displayQuestion() {
    $(".screen").hide();
    $("#question-screen").show();
    $("#correctAnswer").removeClass("highlight");
    $("#feedback").hide();
    insertQuestionInfo();
    shuffleAnswers();
  }
  
  function displayThankyou() {
    $(".screen").hide();
    $("#thankyou-screen").show();
    $("#game-results").html(`Obtuviste ${getCorrect()} de ${getAnswered()} respuestas correctas.`);
  }
  
  function onClickedAnswer(isCorrect) {
    if (isCorrect) $("#feedback").html(`Correcto!`).show();
    else $("#feedback").html(`Incorrecto!`).show();
    $("#correctAnswer").addClass("highlight"); //highlight right answer
   // setTimeout(trivia.gotoNextQuestion, 3000); //wait 3 secs...next question
   $("#feedback").append(`<br><button class="next-btn" onclick="gotoNextQuestion();">Siguiente</br>`);
  }
  
  function onClickedStart() {
    displayQuestion();
  }
  

  function draw() {
    if (getState() == "welcome") background("yellow");
    else if (getState() == "question") background("lightblue");
    else if (getState() == "correct") background("green");
    else if (getState()== "incorrect") background("red");
    else if (getState() == "thankyou") background("orange");
  }
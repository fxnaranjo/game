

//Runs once at the beginning
function setup() {
    var googleSheetLink = "1f9ctZqIIHu5QFUSp-ZDEpHOv4nCBnLACKx_12-U25-I";
    trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome); 

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
    trivia.insertQuestionInfo();
    trivia.shuffleAnswers();
  }
  
  function displayThankyou() {
    $(".screen").hide();
    $("#thankyou-screen").show();
    $("#game-results").html(`Obtuviste ${trivia.totalCorrect} de ${trivia.totalAnswered} respuestas correctas.`);
  }
  
  function onClickedAnswer(isCorrect) {
    if (isCorrect) $("#feedback").html(`Correcto!`).show();
    else $("#feedback").html(`Incorrecto!`).show();
    $("#correctAnswer").addClass("highlight"); //highlight right answer
   // setTimeout(trivia.gotoNextQuestion, 3000); //wait 3 secs...next question
   $("#feedback").append(`<br><button class="next-btn" onclick="trivia.gotoNextQuestion();">Siguiente</br>`);
  }
  
  function onClickedStart() {
    displayQuestion();
  }
  

  function draw() {
    if (trivia.state == "welcome") background("yellow");
    else if (trivia.state == "question") background("lightblue");
    else if (trivia.state == "correct") background("green");
    else if (trivia.state == "incorrect") background("red");
    else if (trivia.state == "thankyou") background("orange");
  }
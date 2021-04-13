

 var loadGoogleSheet,getCategories,
 getUnfinishedCategories,gotoNextQuestion,insertCategoriesInfo,insertQuestionInfo,shuffleAnswers,startClickListeners,triggerAnswer
 ,getState,getAnswered,getCorrect;

(function () {

   
var trivia = {
    questions: [],
    currentCategory: null,
    categoriesEnabled: false,
    currentQuestion: {},
    questionIndex: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    state: "welcome"
}

     loadGoogleSheet= function (link) {
      return new Promise((resolve, reject) => {
        Tabletop.init({
          key: link,
          callback: data => {
            trivia.questions = data.Sheet1.elements;
            trivia.questions = shuffle(trivia.questions);
            if (trivia.questions.length) trivia.currentQuestion = trivia.questions[0];
            trivia.questionIndex = 0;
            trivia.totalQuestions = trivia.questions.length;
            trivia.totalCorrect = 0;
            trivia.totalAnswered = 0;
            trivia.state = "welcome";
            startClickListeners();
            resolve("success");
          }
        });
      });
    }

    getState =function(){
        return trivia.state;
    }

    getCorrect=function(){
        return trivia.totalCorrect;
    }

    getAnswered=function(){
        return trivia.totalAnswered;
    }

     getCategories= function () {
      var cats = [];
      trivia.questions.filter((q) => {
        if (!cats.includes(q.category)) cats.push(q.category);
      });
      return cats;
    }

     getUnfinishedCategories= function () {
      var cats = [];
      trivia.questions.filter((q) => {
        if (!cats.includes(q.category) && !q.response) cats.push(q.category);
      });
      return cats;
    }

     gotoNextQuestion= function () { //this just forwards a "deprecated function"
      displayQuestion();
    }

    insertCategoriesInfo = function () {
      var cats = trivia.getCategories();
      var unfcats = trivia.getUnfinishedCategories();
      $('#category-set').html('');
      cats.forEach((c) => {
        var $catbtn = $(`<button class="category-btn">${c}</button>`);
        if (unfcats.includes(c)) {
          $catbtn.on('click', function (e) {
            trivia.currentCategory = c;
            onClickedCategory();
          });
        }
        else $catbtn.attr("disabled", true);
        $('#category-set').append($catbtn);
      })
    }

     insertQuestionInfo= function () {
      trivia.state = "question";
      $(".answer-btn").attr("disabled", null);
      trivia.questionIndex = trivia.questions.findIndex((q) => {
        if (!trivia.categoriesEnabled) return !q.response;
        else return !q.response && q.category == trivia.currentCategory;
      });
      if (trivia.questions[trivia.questionIndex]) {
        trivia.currentQuestion = trivia.questions[trivia.questionIndex];
        for (var prop in trivia.currentQuestion) {
          $("#" + prop).html(trivia.currentQuestion[prop]);
        }
      }
      else {
        if (trivia.totalAnswered == trivia.totalQuestions) {
          trivia.state = "thankyou";
          displayThankyou(); //game over
        }
        else if (trivia.categoriesEnabled) {
          trivia.state = "categories";
          displayCategories();
        }
        else alert('Yikes');
      }
    }

     shuffleAnswers= function () {
      $("#answer-set").html(shuffle($("#answer-set").children())); //shuffle answers
    }

     startClickListeners= function () {
      //listen for answer button clicks
      $(".screen").on("click", ".answer-btn", ev => {
        $(".answer-btn").attr("disabled", "disabled"); //turn off buttons to prohibit cheating :)
        triggerAnswer($(ev.target).is("#correctAnswer"));
      });
  
      //listen for restart button click
      $(".screen").on("click", ".start-btn", ev => {
        trivia.questions.forEach(function (q) { delete q.response });
        trivia.questionIndex = 0;
        if (!trivia.categoriesEnabled) trivia.state = "question";
        else trivia.state = "categories";
        trivia.currentQuestion = trivia.questions[0]; //reset to the first question
        onClickedStart();
      });
    }

     triggerAnswer= function (correct) {
      $(".answer-btn").attr("disabled", "disabled");
      if (correct) {
        trivia.currentQuestion.response = "correct";
        trivia.state = "correct";
      } else {
        trivia.currentQuestion.response = "incorrect";
        trivia.state = "incorrect";
      }
      trivia.totalCorrect = trivia.questions.filter(item => {
        return item.response == "correct";
      }).length;
      trivia.totalAnswered = trivia.questions.filter(item => {
        return item.response;
      }).length;
      onClickedAnswer(trivia.currentQuestion.response == "correct");
    }
  
  
})();
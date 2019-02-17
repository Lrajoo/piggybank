// javascript code to run the quiz
(function(){
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  
  const myQuestions = [
      {
        question: "What is the most important factor in calculating your credit score?",
        answers: {
          a: "Credit utilization",
          b: "Your age",
          c: "Payment history"
        },
        correctAnswer: "c"
      },
      {
        question: "How much of your paycheck should you aim to save?",
        answers: {
          a: "5%",
          b: "20%",
          c: "10%"
        },
        correctAnswer: "b"
      },
      {
        question: "How old do you have to be to start investing?",
        answers: {
          a: "45",
          b: "18",
          c: "There's no age limit"
        },
        correctAnswer: "c"
      },
      {
        question: "Is investing a risk-free way to make money?",
        answers: {
          a: "Not exactly - it can sometimes pay off, but always carries some risk",
          b: "You will always make a profit if you invest",
          c: "Investing is a gamble and makes it very easy to lose money",
        },
        correctAnswer: "a"
      }
    ];
  
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}" class="form-radio",checked=false>
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
    
      // keep track of user's answers
      let numCorrect = 0;
    
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
    
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question'+questionNumber+']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    
        // if answer is correct
        if(userAnswer===currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
    
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
    
      var percent = (numCorrect/myQuestions.length)*100;
      // show number of correct answers out of total
      resultsContainer.innerHTML = 'You got '+ percent + '% of the questions correct.'
    }
  
  //function for pagination
  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide===0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide===slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }
  
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  
  buildQuiz();
  
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  
  showSlide(0);
  
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);  
})();


 
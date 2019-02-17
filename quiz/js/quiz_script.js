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

  function buildQuiz(){
    // we'll need a place to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}" class = "form-radio" checked:false>
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
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
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = 'You got '+ numCorrect + ' out of ' + myQuestions.length + ' questions correct.';
  }

  buildQuiz();

  submitButton.addEventListener('click', showResults);
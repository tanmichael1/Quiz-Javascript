//Buttons
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const nextButton = document.getElementById('next-btn');
const checkButton = document.getElementById('check-btn');
const resultsButton = document.getElementById('results-btn');
const toEndPageButton = document.getElementById('toEndPage');
const homeButton = document.getElementById('home-btn');

//Pages
const initialPage = document.getElementById('initial');
const mainPage = document.getElementById('mainPage');
const endPage = document.getElementById('end');
const finalResults = document.getElementById('new-results');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const scoreElement = document.getElementById('score');
const quizTitleElement = document.getElementById('quiz-title');

//Progress
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');

//results
let totalQuestionsTable = document.getElementById("total-question");
let totalCorrectTable = document.getElementById("total-correct");
let totalIncorrectTable = document.getElementById("total-incorrect");
let percentageTable = document.getElementById("percentage");
let totalScoreTable = document.getElementById("total-score");

let currentQuestionIndex, currentSelectedButton;
let correctAnswer;
let questions;

let totalQuestions = 0;
let currentScore = 0;
let selectedAnswer = false;
let answeredQuestion = false;
let breakdownTable = document.getElementById('breakdown');

 
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
resultsButton.addEventListener('click', getResults);
toEndPageButton.addEventListener('click', returnToEndPage);
checkButton.addEventListener('click', selectAnswer);
homeButton.addEventListener('click', returnHome);
nextButton.addEventListener('click', () => {
    if(questions.length > currentQuestionIndex){
        selectedAnswer = false;
        answeredQuestion = false;
        checkButton.classList.add('hide');
        nextButton.classList.add('hide')
        setNextQuestion();
    }
    else{
        selectedAnswer = false;
        answeredQuestion = false;
        mainPage.classList.add('hide');
        endPage.classList.remove('hide');
        checkButton.classList.remove('hide');
        
        restartButton.classList.remove('hide');

        resultsButton.classList.remove('hide');

        totalQuestionsTable.innerText = totalQuestions;
        totalCorrectTable.innerText = currentScore;
        totalIncorrectTable.innerText = totalQuestions - currentScore;
        percentageTable.innerText = Number(Number(currentScore).toFixed(2)/Number(totalQuestions).toFixed(2)).toFixed(2) * 100 + "%";
        totalScoreTable.innerText = currentScore + "/" + totalQuestions;        
    } 
});

function setQuestions(){
    var e = document.getElementById("selectQuestions");
    var topic = e.value;
    if(topic == "maths"){
        questions = questionsMaths;

    }

    else if(topic == "animals"){
        questions = questionsAnimals;

    }

}

function startGame(){
    setQuestions()
    resetBreakdown();
    checkButton.classList.add('hide');
    initialPage.classList.add('hide');
  
    mainPage.classList.add('hide');
    endPage.classList.add('hide');
    finalResults.classList.add('hide');
    mainPage.classList.remove('hide');
    restartButton.classList.add('hide');
    currentQuestionIndex = 0;
    totalQuestions = questions.length;
    questionContainerElement.classList.remove('hide');
    resetScore();
    setNextQuestion();

}

function resetBreakdown(){
    var rowCount = breakdownTable.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            breakdownTable.deleteRow(i);
        }
        console.log(breakdownTable.rows.length);
}

function getResults(){
    endPage.classList.add('hide');
    mainPage.classList.add('hide');
    finalResults.classList.remove('hide');
    
    
}

function returnToEndPage(){
    endPage.classList.remove('hide');
    finalResults.classList.add('hide');

}

function returnHome(){
    resetBreakdown();
    endPage.classList.add('hide');
    initialPage.classList.remove('hide');
}

function setNextQuestion(){
    resetState();
    showQuestion(questions[currentQuestionIndex]);

    progressBarFull.style.width = `${((currentQuestionIndex)/totalQuestions) * 100}%`
}

function showQuestion(question){
    progressText.innerText = "Question " + (currentQuestionIndex + 1) + " of " + totalQuestions;
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('question-btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener('click', markAnswer);
        answerButtonsElement.appendChild(button);
    });
    currentQuestionIndex++;

}

function resetScore(){
    currentScore = 0;
    scoreElement.innerText = currentScore;
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    } 
}

function selectAnswer(){
    if(selectedAnswer){
      
        checkButton.classList.add('hide');
        currentSelectedButton.classList.remove('marked');
        const correct = currentSelectedButton.dataset.correct;
        setStatusClassCheck(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        nextButton.classList.remove('hide');

        var newRow = breakdownTable.insertRow();

        var questionCell = newRow.insertCell();
        var newText1 = document.createTextNode(questionElement.innerText);
        questionCell.appendChild(newText1);
        
        var yourAnswerCell = newRow.insertCell();
        var newText2 = document.createTextNode(currentSelectedButton.innerText);
        yourAnswerCell.appendChild(newText2);

        var trueAnswerCell = newRow.insertCell();
        var newText3 = document.createTextNode(correctAnswer);
        trueAnswerCell.appendChild(newText3);
        if(currentSelectedButton.innerText ==correctAnswer){
            questionCell.style.backgroundColor = "green";
            yourAnswerCell.style.backgroundColor = "green";
            trueAnswerCell.style.backgroundColor = "green";
        }

        else{
            questionCell.style.backgroundColor = "red";
            yourAnswerCell.style.backgroundColor = "red";
            trueAnswerCell.style.backgroundColor = "red";
        }

        answeredQuestion = true;

        
    }  
}

function markAnswer(e){
    if(!answeredQuestion){
        checkButton.classList.remove('hide');
        const selectedButton = e.target;
        Array.from(answerButtonsElement.children).forEach(button => {
            if(selectedButton==button){
                button.classList.add('marked');
                currentSelectedButton = selectedButton;
                selectedAnswer = true;

            }

            else{
                button.classList.remove('marked');
            }
        });
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');   
        correctAnswer = element.innerText;
    }

    else{
        element.classList.add('wrong');
    }
}

function setStatusClassCheck(element, correct){
    clearStatusClass(element);
    if(correct){
        currentScore++;
        scoreElement.innerText = currentScore + "/" + totalQuestions;
    }

    else{
        
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// const questions = [
//     {
//         question: 'What is 2 + 2?',
//         answers: [
//             { text: '4', correct: true},
//             { text: '22', correct: false}
//         ]
//     },
//     {
//         question: 'Is web development fun?',
//         answers: [
//             { text: 'Kinda', correct: false },
//             { text: 'YES!!', correct: true },
//             { text: 'Um no', correct: false },
//             { text: 'IDK', correct: false }
//         ]
//     },
//     {
//         question: 'Is the earth flat?',
//         answers: [
//             { text: 'Yes', correct: false },
//             { text: 'No!', correct: true },
     
//         ]
//     }
// ]



const questionsMaths = [
    {
        question: 'What is 3/5 of 100?',
        answers: [
            { text: '4', correct: false},
            { text: '5', correct: false},
            { text: '20', correct: false},
            { text: '60', correct: true}
        ]
    },
    {
        question: 'If David’s age is 27 years old in 2011, what was his age in 2003?',
        answers: [
            { text: '17 years', correct: false },
            { text: '37 years', correct: false },
            { text: '20 years', correct: false },
            { text: '19 years', correct: true }
        ]
    },
    {
        question: 'What is the remainder of 21 divided by 7?',
        answers: [
            { text: '21', correct: false },
            { text: '7', correct: false },
            { text: '1', correct: false },
            { text: 'None of the above', correct: true }
     
        ]
    },

    {
        question: 'What is 7% equal to?',
        answers: [
            { text: '0.007', correct: false },
            { text: '0.07', correct: true },
            { text: '0.7', correct: false },
            { text: '7', correct: false }
     
        ]
    },

    {
        question: 'How many years are there in a decade?',
        answers: [
            { text: '5', correct: false },
            { text: '10', correct: true },
            { text: '15', correct: false },
            { text: '20', correct: false }
     
        ]
    }
]

const questionsAnimals = [
    {
        question: 'What is a group of owls called?',
        answers: [
            { text: 'An Army', correct: false},
            { text: 'A Bewilderment', correct: false},
            { text: 'A Parliament', correct: true},
            { text: 'A Surprise', correct: false}
        ]
    },
    {
        question: 'How many arms do octopuses have?',
        answers: [
            { text: '8', correct: true },
            { text: '10', correct: false },
            { text: '12', correct: false },
            { text: '20', correct: false }
        ]
    },
    {
        question: 'Which of these animals uses echolocation to navigate?',
        answers: [
            { text: 'Dolphins', correct: true },
            { text: 'Mice', correct: false },
            { text: 'Pigs', correct: false },
            { text: 'Naked mole rats', correct: false }
     
        ]
    },

    {
        question: 'What existing bird has the largest wingspan?',
        answers: [
            { text: 'Stork', correct: false },
            { text: 'Swan', correct: false },
            { text: 'Condor', correct: false },
            { text: 'Albatross', correct: true }
     
        ]
    },

    {
        question: 'What is the biggest animal that has ever lived?',
        answers: [
            { text: 'Blue whale', correct: true },
            { text: 'African elephant', correct: false },
            { text: 'Apatosaurus (aka Brontosaurus)', correct: false },
            { text: 'Spinosaurus', correct: false }
     
        ]
    },

    {
        question: 'What are female elephants called?',
        answers: [
            { text: 'Mare Elephants', correct: false },
            { text: 'Sow Elephants', correct: false },
            { text: 'Cow Elephants', correct: true },
            { text: 'Dam Elephants', correct: false }
     
        ]
    },

    {
        question: 'What is the fastest water animal?',
        answers: [
            { text: 'Porpoise', correct: false },
            { text: 'Sailfish', correct: true },
            { text: 'Flying fish', correct: false },
            { text: 'Tuna', correct: false }
     
        ]
    },

    {
        question: 'Which of the following animals sleeps standing up?',
        answers: [
            { text: 'Gorillas', correct: false },
            { text: 'Flamingos', correct: true },
            { text: 'Hedgehogs', correct: false },
            { text: 'Ravens', correct: false }
     
        ]
    }
]
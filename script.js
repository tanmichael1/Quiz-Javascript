//Buttons
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const nextButton = document.getElementById('next-btn');
const checkButton = document.getElementById('check-btn');
const resultsButton = document.getElementById('results-btn');
const toEndPageButton = document.getElementById('toEndPage');

//Pages
const initialPage = document.getElementById('initial');
const mainPage = document.getElementById('mainPage');
const endPage = document.getElementById('end');
const finalResults = document.getElementById('new-results');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsElement = document.getElementById('results');

const scoreElement = document.getElementById('score');
const scoreTitleElement = document.getElementById('score-title');
const quizTitleElement = document.getElementById('quiz-title');

const progressText = document.getElementById('progressText');

const progressBarFull = document.getElementById('progressBarFull');

//results
let totalQuestionsTable = document.getElementById("total-question");
let totalCorrectTable = document.getElementById("total-correct");
let totalIncorrectTable = document.getElementById("total-incorrect");
let percentageTable = document.getElementById("percentage");
let totalScoreTable = document.getElementById("total-score");

let currentQuestionIndex, currentSelectedButton;

let totalQuestions = 0;
let currentScore = 0;
let selectedAnswer = false;
let answeredQuestion = false;

 
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
resultsButton.addEventListener('click', getResults);
toEndPageButton.addEventListener('click', returnToEndPage);
checkButton.addEventListener('click', selectAnswer);

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
        resultsElement.classList.remove('hide');
        resultsButton.classList.remove('hide');

        totalQuestionsTable.innerText = totalQuestions;
        totalCorrectTable.innerText = currentScore;
        totalIncorrectTable.innerText = totalQuestions - currentScore;
        percentageTable.innerText = Number(Number(currentScore).toFixed(2)/Number(totalQuestions).toFixed(2)).toFixed(2) * 100 + "%";
        totalScoreTable.innerText = currentScore + "/" + totalQuestions;


   
        
    }
    
})

function startGame(){
    checkButton.classList.add('hide');
    quizTitleElement.classList.add("hide");
    initialPage.classList.add('hide');
    initialPage.classList.remove('container');
    mainPage.classList.add('hide');
    endPage.classList.add('hide');
    finalResults.classList.add('hide');
    mainPage.classList.remove('hide');
    startButton.classList.add('hide');
    restartButton.classList.add('hide');
    resultsElement.classList.add('hide');
    currentQuestionIndex = 0;
    totalQuestions = questions.length;
    questionContainerElement.classList.remove('hide');
    resetScore();
    setNextQuestion();

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

function setNextQuestion(){
    scoreTitleElement.classList.remove('hide');
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
        answeredQuestion = true;
        nextButton.classList.remove('hide');
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
    }

    else{
        element.classList.add('wrong');
    }
}

function setStatusClassCheck(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
        currentScore++;
        scoreElement.innerText = currentScore + "/" + totalQuestions;
    }

    else{
        element.classList.add('wrong');
        
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false}
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'Kinda', correct: false },
            { text: 'YES!!', correct: true },
            { text: 'Um no', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'Is the earth flat?',
        answers: [
            { text: 'Yes', correct: false },
            { text: 'No!', correct: true },
     
        ]
    }
]
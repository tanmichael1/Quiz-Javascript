const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const nextButton = document.getElementById('next-btn');

const initialPage = document.getElementById('initial');
const mainPage = document.getElementById('mainPage');
const endPage = document.getElementById('end');

const resultsButton = document.getElementById('results-btn');
const toEndPageButton = document.getElementById('toEndPage');
const questionContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const resultsElement = document.getElementById('results');

const finalResults = document.getElementById('new-results');

//  const currentQuestionElement = document.getElementById('current-question');
//  const questionsTotalElement = document.getElementById('questions-total');

const questionsLeftElement = document.getElementById('questions-left');

const scoreElement = document.getElementById('score');
const scoreTitleElement = document.getElementById('score-title');
const quizTitleElement = document.getElementById('quiz-title');

let shuffledQuestions, currentQuestionIndex;

let totalQuestions = 0;


let currentScore = 0;
 
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
resultsButton.addEventListener('click', getResults);
toEndPageButton.addEventListener('click', returnToEndPage);

nextButton.addEventListener('click', () => {
    console.log("Question index: " + currentQuestionIndex);   

    if(shuffledQuestions.length > currentQuestionIndex){
        setNextQuestion();
    }
    else{
        mainPage.classList.add('hide');
        endPage.classList.remove('hide');
        restartButton.innerText = 'Restart';
        restartButton.classList.remove('hide');
        resultsElement.classList.remove('hide');
        resultsButton.classList.remove('hide');
   
        
    }
    
})

function startGame(){
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
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    totalQuestions = shuffledQuestions.length;
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
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    console.log(currentScore);

    questionsLeftElement.innerText = (currentQuestionIndex + 1) + "/" + totalQuestions + " questions";
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('question-btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    currentQuestionIndex++;

}

function showScore(score){


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

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClassCheck(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    
   
        nextButton.classList.remove('hide');
        
        
    
    
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
        //scoreElement.innerText = currentScore;
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
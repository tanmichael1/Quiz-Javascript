const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const nextButton = document.getElementById('next-btn');

const initialPage = document.getElementById('initial');
const mainPage = document.getElementById('mainPage');

//const resultsButton = document.getElementById('results-btn');
const questionContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const resultsElement = document.getElementById('results');

//  const currentQuestionElement = document.getElementById('current-question');
//  const questionsTotalElement = document.getElementById('questions-total');

const questionsLeftElement = document.getElementById('questions-left');

const scoreElement = document.getElementById('score');
const scoreTitleElement = document.getElementById('score-title');

let shuffledQuestions, currentQuestionIndex;

let totalQuestions = 0;


let currentScore = 0;
 
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    console.log('Started');
    initialPage.classList.add('hide');
    initialPage.classList.remove('container');
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
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

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
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
        
    }
    else{
        restartButton.innerText = 'Restart';
        restartButton.classList.remove('hide');
        resultsElement.classList.remove('hide');
        
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
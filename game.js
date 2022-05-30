const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const botao = document.getElementById('button');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '3',
        choice4: '12',
        answer: 2,
    },
    {
        question: 'What is 2x + 4?',
        choice1: '2',
        choice2: '4',
        choice3: '3',
        choice4: '12',
        answer: 1,
    },
    {
        question: 'What is 1 x 0 + 3?',
        choice1: '2',
        choice2: '4',
        choice3: '3',
        choice4: '12',
        answer: 3,
    },
    {
        question: 'What is 7 x 3?',
        choice1: '21',
        choice2: '4',
        choice3: '3',
        choice4: '12',
        answer: 1,
    },
    {
        question: 'What is 7 x 3 - 9?',
        choice1: '18',
        choice2: '10',
        choice3: '14',
        choice4: '12',
        answer: 4,
    },
    {
        question: 'What is (3 + 7) x 5?',
        choice1: '55',
        choice2: '17',
        choice3: '13',
        choice4: '50',
        answer: 4,
    },
    {
        question: 'What is 4 x 4 : 2?',
        choice1: '27',
        choice2: '41',
        choice3: '8',
        choice4: '23',
        answer: 3,
    },
    {
        question: 'What is (2 x 4) : 2 + 17?',
        choice1: '21',
        choice2: '43',
        choice3: '32',
        choice4: '12',
        answer: 1,
    },
    {
        question: 'What is 8 x 7?',
        choice1: '56',
        choice2: '2',
        choice3: '3',
        choice4: '34',
        answer: 1,
    },
    {
        question: 'What is 6 x 2?',
        choice1: '21',
        choice2: '4',
        choice3: '3',
        choice4: '12',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () =>
{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS)
    {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct' && seconds >= 12)
        {
            incrementScore(SCORE_POINTS + 50)
        }
        else
        {
            if(classToApply === 'correct')
            {
                incrementScore(SCORE_POINTS)
            }   
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            clearInterval(time)
            seconds = 16;
            botao.style.display.block;
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()


let time = document.getElementById('time');
let seconds = 15;
let tempo = setInterval(function(){
    seconds--;

    if(seconds >= 10)
    {
        document.getElementById('time').innerHTML = `00:${seconds}`
    }
    else(seconds < 10)
    {
        document.getElementById('time').innerHTML = `00:0${seconds}`
    }
    
}, 1000)

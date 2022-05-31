const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const botao = document.getElementById('button');
const img = document.getElementById('image');
let time = document.getElementById('time');

let currentQuestion = []
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    [
        'What is 2 + 2?',
         '2',
         '4',
         '3',
         '12',
         2,
    ],
    [
        'What is 2x + 4?',
        '2',
        '4',
        '3',
        '12',
         1,
    ],
    [
        'What is 1 x 0 + 3?',
         '2',
         '4',
         '3',
         '12',
         3,
    ],
    [
        'What is 7 x 3?',
         '21',
         '4',
         '3',
         '12',
         1,
    ],
    [
        'What is 7 x 3 - 9?',
         '18',
         '10',
         '14',
         '12',
         4,
    ],
    [
        'What is (3 + 7) x 5?',
         '55',
         '17',
         '13',
         '50',
         4,
    ],      
    [
        'What is 4 x 4 : 2?',
         '27',
         '41',
         '8',
         '23',
         3,
    ],
    [
        'What is (2 x 4) : 2 + 17?',
            '21',
            '43',
            '32',
            '12',
            1,
    ], 
         
    [
        'What is 8 x 7?',
        '56',
        '2',
        '3',
        '34',
        1,
        'http://s2.glbimg.com/E5oewmPWuzlx_kVsvMkZSqmOI1w=/290x217/s.glbimg.com/jo/g1/f/original/2010/10/07/charlie.jpg',
    ],
    [
         'What is 6 x 2?',
         '21',
         '4',
         '3',
         '12',
         4,
    ],
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10
let tempo, seconds;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () =>
{
    botao.style.display = "none";
    
    choices.forEach((choice) => {
        if (choice.dataset['number'] == currentQuestion[5])
        {
            choice.parentElement.classList.remove('correct')
        }         
        else
        {
            choice.parentElement.classList.remove('incorrect')
        }
    })

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
    question.innerText = currentQuestion[0]

    if (!(currentQuestion[6] == undefined))
    {
        img.style.display = "block"
        img.src = currentQuestion[6];
        document.getElementById('container').classList.add('imageContainer');
    }
    else
    {
        img.style.display = "none";
        document.getElementById('container').classList.remove('imageContainer');
    }
    choices.forEach((choice, index) => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion[index + 1]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true;
    seconds = 15;
    time.innerText = '00:15';
    meuTempo();
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        clearInterval(tempo);
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion[5] ? 'correct' : 'incorrect'

        
    
        if(classToApply === 'correct' && seconds >= 12)
        {
            incrementScore(SCORE_POINTS + 50)
        }
        else
        {
            if(classToApply === 'correct' && seconds >= 7) 
            {
                incrementScore(SCORE_POINTS + 30)
            }
            else
            {
                if(classToApply === 'correct' && seconds > 0)
                { 
                    incrementScore(SCORE_POINTS)
                }  
            }       
        } 
        
        mostrarRespo();
    })
})



incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()


function mostrarRespo()
{
    choices.forEach((choice) => {
        if (choice.dataset['number'] == currentQuestion[5])
        {
            choice.parentElement.classList.add('correct')
        }         
        else
        {
            choice.parentElement.classList.add('incorrect')
        }
    })
    setTimeout(() => {
        botao.style.display = "block";
    }, 500)  
}

function meuTempo()
{
    tempo = setInterval(function(){
        seconds--;
        if(seconds >= 10)
        {
           time.innerHTML = `00:${seconds}`
        }
        else
        {
           time.innerHTML = `00:0${seconds}`
        }
        if(seconds == 0)
        {
            mostrarRespo();
            clearInterval(tempo)
        }
    }, 1000)
}


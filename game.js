const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const botao = document.getElementById('button');
const divImage = document.getElementById('divImage');
const img = document.getElementById('image');
let time = document.getElementById('time');
let contador = document.getElementById('valorIntro')
let emVoltaCont = document.getElementById('intro')
let emVolta = document.getElementById('emVolta')
let bonus = document.getElementById('bonus')
const textoBonus = document.getElementById('textoBonus')
const musicaTema = document.getElementById('player')
const musicErro = document.getElementById('erro')
const musicAcert = document.getElementById('acerto')

let currentQuestion = []
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
const SCORE_POINTS = 100
const MAX_QUESTIONS = 10
let tempo, seconds, tempoInt, secondsInt = 3, cont = 0;

let questions = [
    [
        'Qual é o nome da serpente apresentada em GOW4?',
         'Anaconda',
         'Jormungand ',
         'Ball',
         'Serquet',
         2,
    ],
    [
        'Quantos reinos exitem em GOW4 ou seja na mitologia nordica que foi apresentada?',
        '9',
        '10',
        '8',
        '7',
         1,
    ],
    [
        'Qual nome dos dois filhos de Thor que Kratos e atreus enfrentam em gow 4?',
         'Radir e Rell',
         'Radir e Gelmur',
         'Magni e Modi',
         'Guelder e Roudur',
         3,
         'imgquiz/modi-e-magni.png',
    ],
    [
        'Acorentado em uma das mão de typhon esta promoteu onde deve ser punido por zeus por qual motivo ele recebe tal punição?',
         'Pois ele entregou a chama do olimpo para os humanos',
         'Pois ele se apaixonou por uma mortal',
         'Pois ele duelou contra poseidon e perdeu',
         'Pois ele brigou com zeus',
         1,
         'imgquiz/prometheus.jpeg',
    ],
    [
        'Qual é a mitologia que GOW usa como base para seus jogos?',
         'Egipicia e Nordica',
         'Romana e Nordica',
         'Grega e Egipicia',
         'Grega e Nordica',
         4,
    ],
    [
        'Qual era o nome da mãe do kratos',
         'Lysandra',
         'Reia',
         'Persephone',
         'Callisto',
         4,
    ],      
    [
        'Qual é o nome deste personagem?',
         'Celta',
         'Cernunos ',
         'Mimir',
         'Toros',
         3,
         'imgquiz/mimir.jpg',
    ],
    [
        'É sabido que kratos morreu durante o jogo mais de uma vez você consegue me falar quantas vezes ele morreu?',
            '2',
            '3',
            '4',
            '5',
            1,
    ], 
         
    [
        'Qual o nomes das três irmãs furias?',
        'Clotho, Lahkesis, e Atropos',
        'Lahkesis, Clotho, e Atropos',
        'Atropos, lahkesis, e clotho',
        'Lahkesis, Atropos, e Clotho',
        1,
        'imgquiz/irmas-furia-gow.jpeg',
    ],
    [
         'Qual foi o primeiro deus que kratos matou?',
         'Ares, o deus da guerra',
         'Baldur, o estranho',
         'Hades, o deus do submundo',
         'Alrik, o rei babaro',
         4,
    ],
]

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    intro()
}

getNewQuestion = () =>
{
    botao.style.display = "none";
    bonus.style.display = 'none'
    musicaTema.play()

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
        localStorage.setItem('cont', cont)
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
        divImage.style.display = "block"
        img.src = currentQuestion[6];
        document.getElementById('container').classList.add('imageContainer');
    }
    else
    {
        divImage.style.display = "none";
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

        musicaTema.pause()
        clearInterval(tempo);
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion[5] ? 'correct' : 'incorrect'

        
    
        if(classToApply === 'correct' && seconds >= 12)
        {
            incrementScore(SCORE_POINTS + 50)
            bonus.style.display = 'block'
            textoBonus.innerHTML = 'BÔNUS +50'
            musicAcert.play()
        }
        else
        {
            if(classToApply === 'correct' && seconds >= 7) 
            {
                incrementScore(SCORE_POINTS + 30)
                bonus.style.display = 'block'
                textoBonus.innerHTML = 'BÔNUS +30'
               
            }
            else
            {
                if(classToApply === 'correct' && seconds > 0)
                { 
                    incrementScore(SCORE_POINTS)
                    musicAcert.play()
                } 
                else
                {
                    musicErro.play()
                } 
            }       
        } 
        
        mostrarRespo();
    })
})



incrementScore = num => {
    score += num
    scoreText.innerText = score
    cont++;
}

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
            musicErro.play()
            musicaTema.pause()
            clearInterval(tempo)
        }
    }, 1000)
}

function intro()
{
    tempoInt = setInterval(function(){
        secondsInt--;
        if(secondsInt == 3)
        {
            contador.innerHTML = '3'
        }
        else
        {   
            if(secondsInt == 2)
            {
                contador.innerHTML = '2'
            }
            else
            {
                if(secondsInt == 1)
                {
                    contador.innerHTML = '1'
                }
                else
                {
                    if(secondsInt == 0)
                    {
                        contador.innerHTML = 'VAI!'
                    }
                    else
                    {
                        if(secondsInt < 0)
                        {
                            document.body.removeChild(emVoltaCont)
                            emVolta.style.display = 'block'
                            clearInterval(tempoInt)
                            getNewQuestion()  
                        }     
                    }
                    
                }
            }
        }
    }, 1000)
}

startGame()

    

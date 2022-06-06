const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const numQuest = document.getElementById('numQuest')
const questAcert = localStorage.getItem('cont')



const highScores = JSON.parse(localStorage.getItem('highScores')) || []



const MAX_HIGH_SCORES = 5

finalScore.innerText = `Sua pontuação foi ${mostRecentScore}`
if(questAcert == 10)
{
    numQuest.innerText = `Então você é um grande jogador de GOW. Você acertou um total de ${questAcert} de 10 questões`
}
else{
    if(questAcert >= 7)
    {
        numQuest.innerText = `Parabéns, você realmente conhece bem GOW. Você acertou um total de ${questAcert} de 10 questões`
    }
    else{
        if(questAcert >=4)
        {
            numQuest.innerText = `Parece que você conhece um pouco de GOW. Você acertou um total de ${questAcert} de 10 questões`
        }
        else{
            numQuest.innerText = `Acho que você tem que jogar um pouco mais. Você acertou um total de ${questAcert} de 10 questões`
        }
    }
}

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) =>{
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('index.html')
}

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const numQuest = document.getElementById('numQuest')
const questAcert = localStorage.getItem('cont')



const highScores = JSON.parse(localStorage.getItem('highScores')) || []



const MAX_HIGH_SCORES = 5

finalScore.innerText = `Your score was ${mostRecentScore}`
if(questAcert == 10)
{
    numQuest.innerText = `Entao voce eh um grande jogador de GOW. Voce acertou um total de ${questAcert} de 10 questoes`
}
else{
    if(questAcert >= 7)
    {
        numQuest.innerText = `Parabens, voce realmente conhece bem GOW. Voce acertou um total de ${questAcert} de 10 questoes`
    }
    else{
        if(questAcert >=4)
        {
            numQuest.innerText = `Parece que voce conhece um pouco de GOW. Voce acertou um total de ${questAcert} de 10 questoes`
        }
        else{
            numQuest.innerText = `Acho que voce tem que jogar um pouco mais. Voce acertou um total de ${questAcert} de 10 questoes`
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

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const numQuest = document.getElementById('numQuest')
const questAcert = localStorage.getItem('cont')



const highScores = JSON.parse(localStorage.getItem('highScores')) || []



const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore
numQuest.innerText = `Voce acertou um total de ${questAcert} de 10 questoes`

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

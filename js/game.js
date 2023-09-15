
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const perso = [
    'amity',
    'edalyn',
    'enzoGabriel',
    'Gus',
    'Hunter',
    'King',
    'luz',
    'rainee',
    'Willow',
    'vee',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
let firstCard = ''
let secondCard = ''

const checkEnGame = () => {
    const disableCard = document.querySelectorAll('.disableCard')

    if (disableCard.length == 20) {
        clearInterval(this.loop)
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos!!`)

    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disableCard')
        secondCard.firstChild.classList.add('disableCard')

        firstCard = ''
        secondCard = ''

        checkEnGame()
    } else {

        setTimeout(() => {

            firstCard.classList.remove('revealCard');
            secondCard.classList.remove('revealCard');

            firstCard = ''
            secondCard = ''

        }, 300);

    }

}
const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('revealCard')) {
        return;
    }
    if (firstCard == '') {

        target.parentNode.classList.add('revealCard')
        firstCard = target.parentNode

    } else if (secondCard == '') {

        target.parentNode.classList.add('revealCard')
        secondCard = target.parentNode

    }
    checkCards()



}

const createCard = (perso) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../Imagens/${perso}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', perso)

    return card;
}

const loadGame = () => {

    const duplicatePerso = [...perso, ...perso];

    const shuffledPerso = duplicatePerso.sort(() => Math.random() - 0.5)

    shuffledPerso.forEach((perso) => {
        const card = createCard(perso);
        grid.appendChild(card);

    });
}

const startTimer = () => {

    this.loop = setInterval(() => {

        const tempoAtual = +timer.innerHTML;
        timer.innerHTML = tempoAtual + 1;

    }, 1000)

}

window.onload = () => {

    const playerName = localStorage.getItem('player')

    spanPlayer.innerHTML = playerName
    startTimer()
    loadGame()
}



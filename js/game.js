const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy'
]

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
} 

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disableCards = document.querySelectorAll('.disable-card');
    if(disableCards.length === 20){
        alert('Winner');
        clearInterval(this.loop);
    }
}

const checkCards = ()=>{
    const firstCharcter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');



    if(firstCharcter === secondCharacter){
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    }else{
        setTimeout(() =>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';


        }, 500)
    }
}

const revealCard = ( {target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    

    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if(secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
    
}

const createCard = (character) =>{
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');


    front.style.backgroundImage = `url(../images/${character}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () =>{

    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) =>{
        const card = createCard(character);
        grid.appendChild(card);
    })
}

const startTimer  = () =>{

    this.loop = setInterval(() =>{

        const currentTime  = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);
}

window.onload = () =>{
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame(); 
    
}


import { Card, Player, Pawn, Hero } from './types';

const isPawn = (data: Card): data is Pawn => {
    if ( data.cost ) return true;
    else return false
}


const opponent: Player = {
    hero: document.getElementById('rival-hero') as HTMLDivElement,
    deck: document.getElementById('rival-deck') as HTMLDivElement,
    field: document.getElementById('rival-cards') as HTMLDivElement,
    cost: document.getElementById('rival-cost') as HTMLDivElement,
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
}

const me: Player = {
    hero: document.getElementById('my-hero') as HTMLDivElement,
    deck: document.getElementById('my-deck') as HTMLDivElement,
    field: document.getElementById('my-cards') as HTMLDivElement,
    cost: document.getElementById('my-cost') as HTMLDivElement,
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
}

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true;

const initiate = () => {
    [opponent, me].forEach((item)=> {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    })
    createDeck({ mine: false, count: 5 });
    createDeck({ mine: true, count: 5 });
    createHero({ mine: false });
    createHero({ mine: true });
    redrawScreen({ mine: false });
    redrawScreen({ mine: true });
}

const createDeck = ({ mine, count }:{ mine: boolean, count: number }) => {
    const player = mine ? me : opponent;
    for ( let i:number = 0; i < count; i ++ ) {
        player.deckData.push(new Pawn(mine));
    }
    redrawDeck(player);
}

const createHero = ({ mine }:{ mine: boolean }) => {
    const player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDom({ data: player.heroData, DOM: player.hero, hero: true });
}

interface ConnectCardDom {
    data: Card
    DOM: HTMLDivElement
    hero?:boolean
}

const connectCardDom = ({ data, DOM, hero = false }: ConnectCardDom ) => {
    const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
    cardEl.querySelector('.card-att')!.textContent = String(data.att);
    cardEl.querySelector('.card-hp')!.textContent = String(data.hp);
    if (hero) {
        (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display = 'none';
        const name = document.createElement('div'); 
        name.textContent = 'Hero';
        cardEl.appendChild(name);
    } else {
        cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
    }
    cardEl.addEventListener('click', () => {
        if ( isPawn(data) && data.mine === turn && !data.field ) {
            if (!deckToField({ data })) {
                createDeck({ mine: true, count: 1 })
            }
        } else {

        }

    });
    DOM.appendChild(cardEl);
}

const redrawScreen = ({ mine }: { mine: boolean }) => {
    const player = mine ? me : opponent;
    redrawHero(player);
}

const redrawHero = ( target: Player ) => {
    if ( !target.heroData ) {
        throw new Error('There is no hero data.');
    }
    target.hero.innerHTML = '';
    connectCardDom({ data: target.heroData, DOM: target.hero, hero: true });
}

const redrawDeck = ( target: Player ) => {
    target.deck.innerHTML = '';
    target.deckData.forEach( data => {
        connectCardDom({ data, DOM: target.deck });
    });
}

const redrawField = ( target: Player ) => {
    target.field.innerHTML = '';
    target.fieldData.forEach( data => {
        connectCardDom({ data, DOM: target.field });
    });
}

const deckToField = ({ data }: { data: Pawn  }): boolean => {
    const target = turn ? me : opponent;
    const currentCost = Number(target.cost.textContent);
    if ( currentCost < data.cost ) {
        alert('Not enough costs.');
        return true;
    }
    data.field = true;
    const idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.cost.textContent = String(currentCost - data.cost);
    return false; 
}

initiate();
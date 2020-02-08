"use strict";
exports.__esModule = true;
var types_1 = require("./types");
var isPawn = function (data) {
    if (data.cost)
        return true;
    else
        return false;
};
var opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var turnButton = document.getElementById('turn-btn');
var turn = true;
var initiate = function () {
    [opponent, me].forEach(function (item) {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    createDeck({ mine: false, count: 5 });
    createDeck({ mine: true, count: 5 });
    createHero({ mine: false });
    createHero({ mine: true });
    redrawScreen({ mine: false });
    redrawScreen({ mine: true });
};
var createDeck = function (_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new types_1.Pawn(mine));
    }
    redrawDeck(player);
};
var createHero = function (_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new types_1.Hero(mine);
    connectCardDom({ data: player.heroData, DOM: player.hero, hero: true });
};
var connectCardDom = function (_a) {
    var data = _a.data, DOM = _a.DOM, _b = _a.hero, hero = _b === void 0 ? false : _b;
    var cardEl = document.querySelector('.card-hidden .card').cloneNode(true);
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display = 'none';
        var name_1 = document.createElement('div');
        name_1.textContent = 'Hero';
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    cardEl.addEventListener('click', function () {
        if (isPawn(data) && data.mine === turn && !data.field) {
            if (!deckToField({ data: data })) {
                createDeck({ mine: true, count: 1 });
            }
        }
        else {
        }
    });
    DOM.appendChild(cardEl);
};
var redrawScreen = function (_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawHero(player);
};
var redrawHero = function (target) {
    if (!target.heroData) {
        throw new Error('There is no hero data.');
    }
    target.hero.innerHTML = '';
    connectCardDom({ data: target.heroData, DOM: target.hero, hero: true });
};
var redrawDeck = function (target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDom({ data: data, DOM: target.deck });
    });
};
var redrawField = function (target) {
    target.field.innerHTML = '';
    target.fieldData.forEach(function (data) {
        connectCardDom({ data: data, DOM: target.field });
    });
};
var deckToField = function (_a) {
    var data = _a.data;
    var target = turn ? me : opponent;
    var currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        alert('Not enough costs.');
        return true;
    }
    data.field = true;
    var idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.cost.textContent = String(currentCost - data.cost);
    return false;
};
initiate();

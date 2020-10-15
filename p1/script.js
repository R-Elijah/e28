const app = new Vue({
    el: '#app',
    data: {
        gameButton: 'Start Game',
        rules: true,
        history: false,
        gameRunning: false,
        roundRunning: false,
        cardDisplay: false,
        won: {
            color: 'green'
        },
        lost: {
            color: 'red'
        },
        draw: {
            color: 'black'
        },
        roundHistory: [],
        rounds: 0,
        money: 100,
        deck: [ { "card": "🂡", "value": 11, "color": "Black" },
        { "card": "🂢", "value": 2, "color": "Black" },
        { "card": "🂣", "value": 3, "color": "Black" },
        { "card": "🂤", "value": 4, "color": "Black" },
        { "card": "🂥", "value": 5, "color": "Black" },
        { "card": "🂦", "value": 6, "color": "Black" },
        { "card": "🂧", "value": 7, "color": "Black" },
        { "card": "🂨", "value": 8, "color": "Black" },
        { "card": "🂩", "value": 9, "color": "Black" },
        { "card": "🂪", "value": 10, "color": "Black" },
        { "card": "🂫", "value": 10, "color": "Black" },
        { "card": "🂭", "value": 10, "color": "Black" },
        { "card": "🂮", "value": 10, "color": "Black" },
        { "card": "🂱", "value": 11, "color": "Red" },
        { "card": "🂲", "value": 2, "color": "Red" },
        { "card": "🂳", "value": 3, "color": "Red" },
        { "card": "🂴", "value": 4, "color": "Red" },
        { "card": "🂵", "value": 5, "color": "Red" },
        { "card": "🂶", "value": 6, "color": "Red" },
        { "card": "🂷", "value": 7, "color": "Red" },
        { "card": "🂸", "value": 8, "color": "Red" },
        { "card": "🂹", "value": 9, "color": "Red" },
        { "card": "🂺", "value": 10, "color": "Red" },
        { "card": "🂻", "value": 10, "color": "Red" },
        { "card": "🂽", "value": 10, "color": "Red" },
        { "card": "🂾", "value": 10, "color": "Red" },
        { "card": "🃁", "value": 11, "color": "Red" },
        { "card": "🃂", "value": 2, "color": "Red" },
        { "card": "🃃", "value": 3, "color": "Red" },
        { "card": "🃄", "value": 4, "color": "Red" },
        { "card": "🃅", "value": 5, "color": "Red" },
        { "card": "🃆", "value": 6, "color": "Red" },
        { "card": "🃇", "value": 7, "color": "Red" },
        { "card": "🃈", "value": 8, "color": "Red" },
        { "card": "🃉", "value": 9, "color": "Red" },
        { "card": "🃊", "value": 10, "color": "Red" },
        { "card": "🃋", "value": 10, "color": "Red" },
        { "card": "🃍", "value": 10, "color": "Red" },
        { "card": "🃎", "value": 10, "color": "Red" },
        { "card": "🃑", "value": 11, "color": "Black" },
        { "card": "🃒", "value": 2, "color": "Black" },
        { "card": "🃓", "value": 3, "color": "Black" },
        { "card": "🃔", "value": 4, "color": "Black" },
        { "card": "🃕", "value": 5, "color": "Black" },
        { "card": "🃖", "value": 6, "color": "Black" },
        { "card": "🃗", "value": 7, "color": "Black" },
        { "card": "🃘", "value": 8, "color": "Black" },
        { "card": "🃙", "value": 9, "color": "Black" },
        { "card": "🃚", "value": 10, "color": "Black" },
        { "card": "🃛", "value": 10, "color": "Black" },
        { "card": "🃝", "value": 10, "color": "Black" },
        { "card": "🃞", "value": 10, "color": "Black" } ],
        deckIndex: 0,
        cpuCards: [],
        cpuValue: 0,
        cpuHiddenCard: {},
        playerCards: [],
        playerValue: 0,
        playerBet: 0,
        roundResult: ''
    },
    methods: {
        shuffleDeck(deck) {
            //ES6 Optimised Durstenfeld shuffle taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        },
        countCards(hand) {
            let value = 0;
            for (let i = 0; i < hand.length; i++) {
                if (hand[i].value == 11) {
                    value = (value + 11 < 21) ? value + 11 : value + 1;
                } else {
                    value += hand[i].value;
                }
            }
            return value;
        },
        postRound() {
            this.cpuCards = [];
            this.playerCards = [];
            this.cpuValue = 0;
            this.playerValue = 0;
        },
        hit() {
            if (this.roundRunning) {
                this.playerCards.push(this.deck[this.deckIndex++]);
                this.playerValue = this.countCards(this.playerCards);
                if (this.playerValue > 21) {
                    this.roundResult = 'Player has busted. Round lost.';
                    this.playerBet = 0;
                    this.roundHistory.push({ num: this.rounds++, result: 'lost', text: 'Player busted.' });
                    this.roundRunning = false;
                }
            }
        },
        stand() {
            if (this.roundRunning) {
                this.cpuCards.splice(1, 1, this.cpuHiddenCard);

                this.cpuValue = this.countCards(this.cpuCards);
                while (this.cpuValue < 17) {
                    this.cpuCards.push(this.deck[this.deckIndex++]);
                    this.cpuValue = this.countCards(this.cpuCards);
                }
                if (this.cpuValue > 21) {
                    this.roundResult = 'CPU has busted. Round won.';
                    this.money += this.playerBet * 2;
                    this.roundHistory.push({ num: this.rounds++, result: 'won', text: 'CPU busted.' });
                } else if (this.cpuValue > this.playerValue) {
                    this.roundResult = 'CPU has higher value hand. Round lost.';
                    this.roundHistory.push({ num: this.rounds++, result: 'lost', text: 'CPU had higher value hand.' });
                } else if (this.cpuValue < this.playerValue){
                    this.roundResult = 'Player has higher value hand. Round won.';
                    this.money += this.playerBet * 2;
                    this.roundHistory.push({ num: this.rounds++, result: 'won', text: 'Player had higher value hand.' });
                } else {
                    this.roundResult = 'CPU and player have same value hand. Round drawn.';
                    this.money += this.playerBet;
                    this.roundHistory.push({ num: this.rounds++, result: 'draw', text: 'Player and CPU had same value hand.' });
                }
                this.playerBet = 0;
                this.roundRunning = false;
            }
        },
        playRound() {
            if (this.playerBet > this.money || this.playerBet == 0 || this.playerBet < 0) {
                this.roundResult = 'Invalid bet.';
            } else {
                this.roundRunning = true;
                this.cardDisplay = true;
                this.postRound();
                this.money -= this.playerBet;
                this.roundResult = '';

                // Reshuffle if we have used 75% of the deck or are going to this draw
                if (this.deckIndex + 4 > 154) {
                    this.deckIndex = 0;
                    this.shuffleDeck(this.deck);
                }

                // Draw cards
                let tempCards = [];
                let tempValue = 0;
                this.playerCards.push(this.deck[this.deckIndex++]);
                this.cpuCards.push(this.deck[this.deckIndex]);
                tempCards.push(this.deck[this.deckIndex++]);
                this.playerCards.push(this.deck[this.deckIndex++]);
                this.cpuHiddenCard = this.deck[this.deckIndex++];
                tempCards.push(this.cpuHiddenCard);
                this.cpuCards.push({ "card": "🂠", "value": 0, "color": "Black" });
                this.playerValue = this.countCards(this.playerCards);
                this.cpuValue = this.countCards(this.cpuCards);
                tempValue = this.countCards(tempCards);

                // Check for blackjacks
                if (this.playerValue == 21) {
                    if (tempValue == 21) {
                        this.roundResult = 'Both Player and CPU have a natural. Round drawn.';
                        this.money += this.playerBet;
                        this.playerBet = 0;
                        this.roundHistory.push({ num: this.rounds++, result: 'draw', text: 'Both Player and CPU had a natural.' });
                        this.roundRunning = false;
                    } else {
                        this.roundResult = 'Player has a natural. Round won.';
                        this.money += this.playerBet * 2.5;
                        this.playerBet = 0;
                        this.roundHistory.push({ num: this.rounds++, result: 'won', text: 'Player had a natural.' });
                        this.roundRunning = false;
                    }
                } else if (tempValue == 21) {
                    this.cpuCards.splice(1, 1, this.cpuHiddenCard);
                    this.roundResult = 'CPU has a natural. Round lost.';
                    this.playerBet = 0;
                    this.roundHistory.push({ num: this.rounds++, result: 'lost', text: 'CPU had a natural.' });
                    this.roundRunning = false;
                }
            } 
        },
        runGame() {
            if (!this.gameRunning) {
                // Form deck into a 4 card deck
                this.deck = this.deck.concat(this.deck);
                this.deck = this.deck.concat(this.deck);
                // Shuffle deck
                this.shuffleDeck(this.deck);
                this.gameRunning = true;
                this.gameButton = 'Reset Game';
            } else {
                // reset game to start
                this.roundHistory = [];
                this.postRound();
                this.roundRunning = false;
                this.cardDisplay = false;
                this.money = 100;
                this.playerBet = 0;
                this.shuffleDeck(this.deck);
                this.deckIndex = 0;
            }
        }
    }
});
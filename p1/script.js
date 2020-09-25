const app = new Vue({
    el: '#app',
    data: {
        rules: true,
        history: false,
        gameRunning: false,
        won: {
            color: 'green'
        },
        lost: {
            color: 'red'
        },
        draw: {
            color: 'black'
        },
        roundHistory: []
    }
});
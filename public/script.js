import losuj from './losuj.js';

let socket = io();


const { ref, reactive, createApp, onMounted } = Vue;
createApp({

    setup() {

        let joined = ref(false);
        let nick = ref('');
        let yourplayer = ref('');
        let yourplayerindex = ref(99);

        let players = reactive([]);
        let guesses = ['country', 'city', 'item', 'vocation', 'plant', 'animal'];
        let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w', 'z', 'q', 'x', 'v', 'sz', 'cz'];

        let currentplayer = '';

        let connectedClients = ref(99);

        let gameStarted = ref(false);

        // let dane = reactive({});

        let dane = reactive({});
        let danerazem = reactive([]);

        let litera = ref('');

        let runda = ref(1);

        let danesent = ref(0);

        let timer = ref(5);
        let endgame = ref(false);
        let applied = ref(false);

        let myInterval;

        function addPlayerEmit() {
            yourplayer.value = nick;

            joined.value = true;
            socket.emit('addPlayer', nick.value);
        }

        function start() {
            gameStarted.value = true;
            socket.emit('gameStarted');
        }

        function losuj2() {
            losuj(alphabet, litera, socket);
        }

        function sendResults() {
            if (danesent.value == 0) {
                dane.runda = runda.value;
                dane.playerindex = yourplayerindex.value;
                socket.emit('sendResults', dane);
                danesent.value = 1;
            }
        }


        function setTimerEmit(){
            applied.value = true;
            console.log('emituje setTimer po stronie klienta');
            socket.emit('setTimer');
        }
        

        function setTimer(time) {

            myInterval = setInterval(function () {
                if (endgame.value == false) {
                    if (timer.value > 0) {
                        timer.value = timer.value - 1;
                    } else {
                        endgame.value = true;

                        setTimeout(() => {
                            sendResults();
                        }, 1500)
                    }
                }
            }, 1000)
        }

        function calculatePoints() {

            for (let i = 0; i < danerazem.length; i++) {
                let row = danerazem[i];
                row.results = [];
                let correspondingelem = danerazem.find((el) => el.runda == row.runda);
                console.log(correspondingelem);

                for (let i = 0; i < guesses.length; i++) {
                    let guess = guesses[i];
                    // console.log(guess);

                    let dana = row[guess];


                    console.log(dana);
                    // elem[guess]

                    let wynik = 15;

                    // console.log(guess);

                    if (dana == '') {
                        wynik = 0;
                    }

                    if (correspondingelem[guess] == dana) {
                        wynik = 5;
                    }

                    if (typeof (dana) == 'undefined') {
                        wynik = 0;

                    }

                    row.results.push(wynik)
                }

            }





        }

        onMounted(() => {

            socket.on('addPlayer', (data) => {
                players.push(data);

                yourplayerindex.value = players.indexOf(nick.value);
            })

            socket.on('connectedClients', (data) => {
                connectedClients.value = data;
            })

            socket.on('gameStarted', () => {
                gameStarted.value = true;
            })

            socket.on('litera', (data) => {
                litera.value = data
                alphabet.splice(alphabet.indexOf(data), 1);
            });

            socket.on('setTimer', (data) => {
                console.log('odibera setTimer po stronie klienta');
                setTimer();
            });

            socket.on('sendResults', (data) => {
                // console.log('NASŁUCHUJE SEND RESULTS');
                danerazem.push(data);
                danerazem.push(dane);

                if (danesent.value == 0) {
                    sendResults();
                }

                setTimeout(() => {
                    calculatePoints()
                }, 2000);


            });


        })



        socket.emit('connectedClientClient');


        return {
            applied,nick, players, addPlayerEmit, yourplayer, joined, connectedClients, start, gameStarted, dane, yourplayerindex, guesses, litera, losuj2, sendResults, danerazem, runda, setTimer, timer, setTimerEmit
        }


    }

}).mount('#app')

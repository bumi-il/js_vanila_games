let stats = document.querySelector("#stats");
let board = document.querySelector("#board");

class TicTacToe {
    constructor() {
        this.rows = 3;
        this.columns = 3;
        this.turn = 0;
        this.clicks = [];
        this.buildBoard();
    }
    buildBoard(){
        for(let i = 0; i < this.rows * this.columns; i++){
            let newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.id = 'cell' + i;
            newCell.addEventListener('click',() => this.click(newCell, i));
            board.appendChild(newCell);
            this.clicks.push(i);
        }
    }
    click(cell, i){
        if (this.turn++ % 2 == 0) {
            stats.innerHTML = "O's turn";
            cell.innerHTML = 'X';
            cell.style.color = "blue";
            this.clicks[i] = 'X';
            const sound = new Audio('./assets/sounds/pop1.mp3');
            sound.play();
        }else{
            stats.innerHTML = "X's turn";
            cell.innerHTML = "O";
            cell.style.color = "red";
            this.clicks[i] = 'O';
            const sound = new Audio('./assets/sounds/pop2.mp3');
            sound.play();
        }
        cell.style.backgroundColor = "silver";
        cell.style.boxShadow = "0 0";
        cell.style.pointerEvents = "none";
        this.checkWin();
    }
    checkWin(){
        for(let i = 0; i < this.rows * this.columns; i+=3){
            if (this.clicks[i] == this.clicks[i + 1] &&
                this.clicks[i] == this.clicks[i + 2]) {
                    return this.winGame();
            }
        }
        for(let i = 0; i < this.rows; i++){
            if (this.clicks[i] == this.clicks[i + 3] &&
                this.clicks[i] == this.clicks[i + 6]){
                    return this.winGame();
            }
        }
        if (this.clicks[0] == this.clicks[4] &&
            this.clicks[0] == this.clicks[8]){
                return this.winGame();
        }
        if (this.clicks[2] == this.clicks[4] &&
            this.clicks[2] == this.clicks[6]){
                return this.winGame();
        }
        if (this.turn == 9) {
            return this.tie();
        }
    }
    winGame(){
        for(let i = 0; i < this.rows * this.columns; i++){
            let cell = document.querySelector('#cell' + i);
            cell.style.pointerEvents = 'none';
        }
        if (this.turn % 2 == 0) {
            stats.innerHTML = "O wins 🏆";
        }else{
            stats.innerHTML = "X wins 🏆";
        }
        const sound = new Audio('./assets/sounds/shine.mp3');
        sound.play();
        setTimeout(() => {
            const sound = new Audio('./assets/sounds/applause-cheer.mp3')
            sound.play();
        }, 1000)
    }
    tie(){
        const sound = new Audio('./assets/sounds/tie.mp3');
        sound.play();
        stats.innerHTML = "It's a tie 😐";
    }
}

const game = new TicTacToe();
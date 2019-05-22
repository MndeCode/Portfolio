{
    class Game {
        constructor(el) {
            this.DOM = {
                el: el
            }
            this.DOM.board = this.DOM.el.querySelector('.board');
            this.playerSwitch = true;
            this.winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            this.origBoard = [...Array(9).keys()];
            this.init();
        }

        init() {
            this.initEvents();
        }

        initEvents() {
            this.DOM.board.addEventListener('click', e => {
                if(!(e.target.classList.contains('cell'))) return;
                if(e.target.children.length > 0) return;
                this.playerSwitch ? this.enterTic(e, 'x') : this.enterTic(e, 'o');
                this.playerSwitch = !this.playerSwitch;                
            })
        }

        // Revisit this method
        enterTic(e, player) {
            let cell = e.target;
            let p = document.createElement('p');
            p.textContent = player;
            p.className = 'put';
            cell.appendChild(p);            
            this.origBoard[e.target.dataset.cell] = player;
            let gameWon = this.checkWin(this.origBoard, player);
            this.checkDraw();
            if(gameWon) this.gameOver(gameWon);
        }

        checkWin(board, player) {
            let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a
            , []);
            for(let [index, win] of this.winningCombos.entries()) {
                if(win.every(el => plays.indexOf(el) > -1)) {
                    return {index: index, player: player}
                }
            }
            return null;
        }

        gameOver(gameWon) {
            console.log(`Game Over ${gameWon.player} won!`);
            this.strokeOut()
        }

        checkDraw() {
            if((this.origBoard.filter(el => typeof el === 'number')).length === 0) {
                console.log('It`s a draw!');
            }
        }
    }

    new Game(document.querySelector('#game'));
}




















































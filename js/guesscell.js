"use strict";
(function () {
    let tableCells = document.querySelector('table.cells'),
        tdCells = tableCells.querySelectorAll('td'),
        tryCount = document.querySelector('span[data-color="count"]'),
        cellsRes = document.querySelector('.count'),
        guessCellRes = document.querySelector('.guessCellText.hidden'),
        playBtn = document.querySelector('button');

    tryCount.innerText = 30;
    fillCells();
    playBtn.addEventListener('click', playGame);

    function playGame() {
        let cells = createRandomNums(),
            count = 0;

        tryCount.innerText = 30;
        fillCells();
        playBtn.disabled = true;
        tableCells.addEventListener('click', openCells);

        function openCells(e) {
            let openCell = function (array) {
                if (e.target.tagName == 'TD') {
                    if (Number(tryCount.innerText) > 1) {
                        let clickNum = +e.target.innerText;
                        if (array.includes(clickNum)) {
                            e.target.innerHTML = '<img src="../icons/tick.svg" alt="tick" class="cell">';
                            e.target.classList.add('borderGreen');
                            tryCount.innerText = Number(tryCount.innerText) - 1;
                            count++;
                        } else if (clickNum !== 0) {
                            e.target.innerHTML = '<img src="../icons/cross.svg" alt="cross" class="cell">';
                            tryCount.innerText = Number(tryCount.innerText) - 1;
                        }
                    } else {
                        tryCount.innerText = 0;
                        let clickNum = +e.target.innerText;
                        if (array.includes(clickNum)) {
                            e.target.innerHTML = '<img src="../icons/tick.svg" alt="tick" class="cell">';
                            e.target.classList.add('borderGreen');
                            count++;
                        } else if (clickNum !== 0) {
                            e.target.innerHTML = '<img src="../icons/cross.svg" alt="cross" class="cell">';
                        }
                        showCells();
                        guessCellRes.innerHTML = `Игра окончена! Угадано чисел: <span data-color="result">${count}</span>`;
                        guessCellRes.classList.remove('hidden');
                        count = 0;
                        tableCells.removeEventListener('click', openCells);
                        playBtn.disabled = false;
                    }
                }
            }
            openCell(cells);
        }
        function showCells() {
            for (let cell of tdCells) {
                for (let number of cells) {
                    if (cell.innerText == number) {
                        cell.innerHTML = '<img src="../icons/tick.svg" alt="tick" class="cell">';
                        if (!cell.classList.contains('borderGreen')) {
                            cell.classList.add('borderRed');
                        }
                    }
                }
            }
        }
    }

    function createRandomNums() {
        let array = [];
        for (let i = 0; i < 10; i++) {
            let number = Math.floor(Math.random() * 101) + 1;
            while (true) {
                if (array.includes(number)) {
                    number = Math.floor(Math.random() * 101) + 1;
                } else {
                    break;
                }
            }
            array.push(number);
        }
        console.log(array);
        return array;
    }



    function fillCells() {
        let i = 1;
        for (let cell of tdCells) {
            cell.innerText = i;
            cell.classList.remove('borderRed');
            cell.classList.remove('borderGreen');
            i++;
        }
    }


})();
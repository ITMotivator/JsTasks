"use strict";
(function () {
    const input = document.querySelector('input'),
        playBtn = document.querySelector('button.btn-info'),
        checkNumBtn = document.querySelector('button.btn-secondary'),
        resultPar = document.querySelector('p[data-result]');

    playBtn.addEventListener('click', play);

    function play() {
        resultPar.innerText = '';
        playBtn.disabled = true;
        input.disabled = false;
        checkNumBtn.disabled = false;

        let answer = Math.floor(Math.random() * 101) + 1;
        console.log(`answer = ${answer}`);
        checkNumBtn.addEventListener('click', checkNum);
        input.addEventListener('keypress', enter);

        function enter(e) {
            if (e.keyCode == 13) {
                checkNum();
            }
        }

        function checkNum() {
            let num = Number(input.value);
            if (num >= 1 && num <= 100) {
                if (answer == num) {
                    resultPar.innerText = `${num} - правильно!`;
                    playBtn.disabled = false;
                    input.disabled = true;
                    input.value = null;
                    input.placeholder = 'Твое число';
                    checkNumBtn.disabled = true;
                    checkNumBtn.removeEventListener('click', checkNum);
                    input.removeEventListener('keypress', enter);
                }
                else if (num > answer) {
                    resultPar.innerText = `${num} - слишком большое!`;
                }
                else {
                    resultPar.innerText = `${num} - слишком маленькое!`;
                }
            } else {
                resultPar.innerText = "Ошибка ввода!";
            }
        }
    }
})();
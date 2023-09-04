"use strict";

(function () {
    let inp1 = document.getElementById('player1'),
        inp2 = document.getElementById('player2'),
        inpParent1 = document.getElementsByClassName('inputsDiv')[0],
        inpParent2 = document.getElementsByClassName('inputsDiv')[1],
        errorPar = document.querySelector('p[data-answer="error"]'),
        timerBtn = document.querySelector('button'),
        timerPar = document.querySelector('.timer p');

    let cities = [];

    inp1.addEventListener('keypress', enter);
    inp2.addEventListener('keypress', enter);
    timerBtn.addEventListener('click', startTimer);


    function enter(e) {
        if (e.keyCode == 13) {
            errorPar.innerText = '';
            if (e.target.id == 'player1') {
                play1();
            } else if (e.target.id == 'player2') {
                play2();
            }
        }
    }

    function play1() {
        let city = inp1.value.toLowerCase();
        if (checkCities(city)) {
            inp1.value = null;
            inp1.disabled = true;
            inp2.disabled = false;
        }
    }

    function play2() {
        let city = inp2.value.toLowerCase();
        if (checkCities(city)) {
            inp2.value = null;
            inp2.disabled = true;
            inp1.disabled = false;
        }

    }

    function checkCities(city) {
        if (city.length > 0) {
            if (cities.includes(city)) {
                errorPar.innerText = `Город уже назывался!`;
            }
            else {
                let lastLetter = getPrevCityLastLetter(cities, city);
                if (lastLetter == city.at(0)) {
                    cities.push(city);
                    return true;
                }
                else {
                    errorPar.innerText = `Город должен начинаться с буквы ${lastLetter.toUpperCase()}!`;
                }
            }
        } else {
            errorPar.innerText = `Введите название города!`;
        }
        return false;
    }

    function getPrevCityLastLetter(towns, town) {
        let size = towns.length;
        if (size > 0) {
            town = towns[size - 1];
            if (town.at(-1) == 'ы' || town.at(-1) == 'ь') {
                return town.at(-2);
            } else {
                return town.at(-1);
            }
        } else {
            return town.at(0);
        }
    }

    let timerToClear = null;
    function startTimer() {
        timerPar.innerText = `01 : 00`;
        let time = 59;
        timerBtn.innerText = 'Остановить';
        timerBtn.removeEventListener('click', startTimer);
        timerBtn.addEventListener('click', function clear() {
            stopTimer(timerToClear);
            timerBtn.removeEventListener('click', clear);
            timerBtn.innerText = 'Запустить';
            timerPar.innerText = `01 : 00`;
            timerBtn.addEventListener('click', startTimer);
        });

        let timerId = setTimeout(function tick(timerId) {
            console.log(timerToClear);
            if (time > 9) {
                timerPar.innerText = `0 : ${time}`;
                time--;
                timerId = setTimeout(tick, 1000);
                timerToClear = timerId;
            } else if ((time < 10) && (time > 0)) {
                timerPar.innerText = `0 : 0${time}`;
                time--;
                timerId = setTimeout(tick, 1000);
                timerToClear = timerId;
            } else if (time == 0) {
                timerPar.classList.add('txtRed');
                timerPar.innerText = `0 : 00`;
                clearTimeout(timerId);
                timerBtn.disabled = true;
                if (inp1.disabled) {
                    errorPar.innerHTML = 'Время вышло!<br> Игрок 2 проиграл...';
                } else {
                    errorPar.innerHTML = 'Время вышло!<br> Игрок 1 проиграл...';
                }
            }
        }, 1000);

        function stopTimer(timerId) {
            clearTimeout(timerId);
        }
    }

})();
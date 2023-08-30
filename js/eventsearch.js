"use strict";

(function () {
    let input = document.querySelector('input'),
        btn = document.querySelector('button'),
        resultDiv = document.querySelector('.result');

    let eventsStore = {
        2022: [
            { '24.02': 'Начало Специальной Военной Операции' },
            { '08.09': 'Смерть Королевы Елизаветы II' },
            { '21.09': 'Объявление частичной мобилизации' },
            { '15.11': 'Население Земли достигло 8 миллиардов' },
            { '18.12': 'Аргентина стала чемпионом мира по футболу' },
        ],
        2021: [
            { '06.01': 'Штурм Капитолия сторонниками Трампа' },
            { '23.07': 'Открытие XXXII Летних Олимпийских Игр в Токио' },
            { '30.09': 'Захват Кабула талибами' },
        ],
    };

    btn.addEventListener('click', showEvents);
    input.addEventListener('keypress', enter);

    function enter(e) {
        if (e.keyCode == 13) {
            showEvents();
        }
    }

    function showEvents() {
        resultDiv.innerText = '';
        let yearEntered = input.value;
        if (Object.keys(eventsStore).includes(yearEntered)) {
            let pYear = document.createElement('p'),
                eventsTable = document.createElement('table');
            let events = eventsStore[yearEntered];
            pYear.innerText = 'События' + ' ' + yearEntered + ' года:';
            resultDiv.append(pYear, eventsTable);
            for (let event of events) {
                let tr = document.createElement('tr'),
                    tdDate = document.createElement('td'),
                    tdEvent = document.createElement('td');
                tdDate.innerText = Object.keys(event)[0];
                tdEvent.innerText = Object.values(event)[0];
                tr.append(tdDate, tdEvent);
                eventsTable.append(tr);
            }
        } else {
            resultDiv.innerHTML = `<p>Событий не найдено...</p>`;
        }
    }
})();
"use strict";
(function () {
    let oldUl = document.querySelector('.days'),
        parent = document.querySelector('.main-task'),
        changeYearBtns = document.getElementsByClassName('arrowYear'),
        changeMonthBtns = document.getElementsByClassName('arrowMonth');
    parent.removeChild(oldUl);
    let date = new Date();
    let year = date.getFullYear(),
        month = date.getMonth(),
        currentDate = date.getDate();
    let monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    let calendar = createCalendar(year, month, currentDate, monthes, weekDays);
    parent.append(calendar);

    for (let btn of changeYearBtns) {
        btn.addEventListener('click', changeYear);
    }

    for (let btn of changeMonthBtns) {
        btn.addEventListener('click', changeMonth);
    }

    function changeYear(e) {
        let ul = document.querySelector('.days')
        parent.removeChild(ul);
        if (e.target.classList.contains('left')) {
            year--;
            let calendar = createCalendar(year, month, currentDate, monthes, weekDays);
            parent.append(calendar);
        } else if (e.target.classList.contains('right')) {
            year++;
            let calendar = createCalendar(year, month, currentDate, monthes, weekDays);
            parent.append(calendar);
        }
    }

    function changeMonth(e) {
        let ul = document.querySelector('.days')
        parent.removeChild(ul);
        if (e.target.classList.contains('left')) {
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            let calendar = createCalendar(year, month, currentDate, monthes, weekDays);
            parent.append(calendar);
        } else if (e.target.classList.contains('right')) {
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
            let calendar = createCalendar(year, month, currentDate, monthes, weekDays);
            parent.append(calendar);
        }
    }

    function createCalendar(year, month, date, monthes, weekDays) {
        let ul = document.createElement('ul'),
            yearText = document.querySelector('p.year'),
            monthText = document.querySelector('p.month');
        ul.classList.add('days');
        let daysNum = (new Date(year, month + 1, 0)).getDate();
        yearText.innerText = year;
        monthText.innerText = monthes[month];
        for (let i = 1; i <= daysNum; i++) {
            let dayOfWeek = (new Date(year, month, i)).getDay();
            let li = document.createElement('li'),
                pDayName = document.createElement('p'),
                pDate = document.createElement('p');
            pDate.innerText = i;
            pDayName.innerText = weekDays[dayOfWeek];
            if (pDayName.innerText == 'Вс' || pDayName.innerText == 'Сб') {
                pDayName.classList.add('weekend');
            }
            pDayName.classList.add('gray');
            li.appendChild(pDayName);
            li.appendChild(pDate);
            if (i == date) {
                pDate.classList.add('today');
            }
            ul.appendChild(li);
        }
        return ul;
    }
})();
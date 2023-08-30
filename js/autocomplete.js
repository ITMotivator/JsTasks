"use strict";

(function () {
    let input = document.querySelector('input'),
        list = document.querySelector('ul'),
        countryPar = document.querySelector('p.country'),
        resultTable = document.querySelector('table.info');

    let euMembers = {
        'Австрия': ['Вена', '1 января 1995'],
        'Бельгия': ['Брюссель', '25 марта 1957'],
        'Болгария': ['София', '1 января 2007'],
        'Венгрия': ['Будапешт', '1 мая 2004'],
        'Греция': ['Афины', '1 января 1981'],
        'Германия': ['Берлин', '25 марта 1957'],
        'Дания': ['Копенгаген', '1 января 1973'],
        'Италия': ['Рим', '25 марта 1957'],
        'Ирландия': ['Дублин', '1 января 1973'],
        'Испания': ['Мадрид', '1 января 1986'],
        'Кипр': ['Никосия', '1 мая 2004'],
        'Люксембург': ['Люксембург', '25 марта 1957'],
        'Латвия': ['Рига', '1 мая 2004'],
        'Литва': ['Вильнюс', '1 мая 2004'],
        'Мальта': ['Валлетта', '1 мая 2004'],
        'Нидерланды': ['Амстердам', '25 марта 1957'],
        'Португалия': ['Лиссабон', '1 января 1986'],
        'Польша': ['Варшава', '1 мая 2004'],
        'Румыния': ['Бухарест', '1 января 2007'],
        'Словения': ['Любляна', '1 мая 2004'],
        'Словакия': ['Братислава', '1 мая 2004'],
        'Франция': ['Париж', '25 марта 1957'],
        'Финляндия': ['Хельсинки', '1 января 1995'],
        'Хорватия': ['Загреб', '1 июля 2013'],
        'Чехия': ['Прага', '1 мая 2004'],
        'Швеция': ['Стокгольм', '1 января 1995'],
        'Эстония': ['Таллин', '1 мая 2004']
    }

    let countriesFit = [];


    input.addEventListener('input', showStatesList);

    function showStatesList() {
        list.innerHTML = '';
        resultTable.innerHTML = '';
        countryPar.innerText = '';
        let text = input.value;
        countriesFit = Object.keys(euMembers).filter(country => {
            return country.startsWith(text) && (text.length != 0);
        }
        );
        for (let country of countriesFit) {
            let li = document.createElement('li');
            li.innerText = country;
            list.append(li);
            li.addEventListener('click', showInfo);
        }
    }

    function showInfo(e) {
        let countryName = e.target.innerText,
            capital = euMembers[countryName][0],
            joinDate = euMembers[countryName][1];

        list.innerHTML = '';
        countriesFit = [];
        input.value = null;
        makeInfoTable(countryName, capital, joinDate);
    }

    function makeInfoTable(countryName, capital, joinDate) {
        countryPar.innerText = countryName;

        let trCapitalInfo = document.createElement('tr'),
            trEntryDateInfo = document.createElement('tr'),
            tdCapital = document.createElement('td'),
            tdCapitalName = document.createElement('td'),
            tdEntry = document.createElement('td'),
            tdEntryDate = document.createElement('td');

        tdCapital.innerText = 'Столица';
        tdCapitalName.innerText = capital;
        trCapitalInfo.append(tdCapital, tdCapitalName);

        tdEntry.innerText = 'Дата вступления';
        tdEntryDate.innerText = joinDate;
        trEntryDateInfo.append(tdEntry, tdEntryDate);

        resultTable.append(trCapitalInfo, trEntryDateInfo);

    }

})();
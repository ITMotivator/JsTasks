"use strict";

(function () {
    let kbTable = document.querySelector('table.keyboard'),
        letters = kbTable.querySelectorAll('td.letter'),
        engLetters = kbTable.querySelectorAll('td[data-lang="eng"]'),
        emptyLetters = kbTable.querySelectorAll('td[data-lang="empty"]'),
        capsLock = kbTable.querySelector('#capsLock'),
        langBtn = kbTable.querySelector('#lang'),
        clearBtn = document.getElementById('clear'),
        copyBtn = document.getElementById('copy'),
        textScreen = document.querySelector('.kbText');

    let engAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        ruAlphabet = ['б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'к', 'л', 'м',
            'н', 'о', 'п', 'р', 'с', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'ы', 'ь'],
        ruEmptyAlphabet = ['а', 'и', 'й', 'т', 'у', 'я', 'ъ'];

    kbTable.addEventListener('click', printText);
    clearBtn.addEventListener('click', function () {
        textScreen.value = '';
    });
    copyBtn.addEventListener('click', function () {
        let text = textScreen.value;
        navigator.clipboard.writeText(text);
    })


    function printText(e) {
        if (e.target.tagName == 'TD') {
            if (e.target.dataset.type !== 'serviceKey') {
                textScreen.value += e.target.innerText;
            } else if (e.target.id == "enter") {
                textScreen.value += "\n";
            } else if (e.target.id == "capsLock") {
                pressCapsLock();
            } else if (e.target.id == "space") {
                textScreen.value += " ";
            } else if (e.target.id == "backSpace") {
                textScreen.value = textScreen.value.slice(0, -1);
            } else if (e.target.id == "lang") {
                changeLanguage();
            }
        }
    }

    function pressCapsLock() {
        if (capsLock.classList.contains('uppercase')) {
            for (let letter of letters) {
                letter.innerText = letter.innerText.toLowerCase();
            }
            capsLock.classList.remove('uppercase');
        } else {
            for (let letter of letters) {
                letter.innerText = letter.innerText.toUpperCase();
            }
            capsLock.classList.add('uppercase');
        }
    }

    function changeLanguage() {
        if (langBtn.dataset.langType == 'ru') {
            langBtn.dataset.langType = 'eng';
            langBtn.innerText = 'EN';
            clearBtns();
            for (let i = 0; i < 26; i++) {
                engLetters[i].innerText = engAlphabet[i];
            }

            if (capsLock.classList.contains('uppercase')) {
                for (let letter of letters) {
                    letter.innerText = letter.innerText.toUpperCase();
                }
            }
        } else {
            langBtn.dataset.langType = 'ru';
            fillBtns();
            langBtn.innerText = 'RU';
            for (let i = 0; i < 26; i++) {
                engLetters[i].innerText = ruAlphabet[i];
            }

            if (capsLock.classList.contains('uppercase')) {
                for (let letter of letters) {
                    letter.innerText = letter.innerText.toUpperCase();
                }
            }
        }
    }

    function clearBtns() {
        for (let letter of emptyLetters) {
            letter.innerText = '';
            letter.classList.add('empty');
        }
    }

    function fillBtns() {
        for (let i = 0; i < 7; i++) {
            emptyLetters[i].innerText = ruEmptyAlphabet[i];
            emptyLetters[i].classList.remove('empty');
        }
    }

})();
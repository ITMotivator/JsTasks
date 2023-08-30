"use strict";

(function () {
    let kbTable = document.querySelector('table.keyboard'),
        letters = kbTable.querySelectorAll('td.letter'),
        capsLock = kbTable.querySelector('#capsLock'),
        textScreen = document.querySelector('.kbText');

    kbTable.addEventListener('click', printText);

    function printText(e) {
        if (e.target.tagName == 'TD') {
            if (e.target.id != "capsLock" && e.target.id != "backSpace" &&
                e.target.id != "enter" && e.target.id != "space") {
                textScreen.value += e.target.innerText;
            } else if (e.target.id == "enter") {
                textScreen.value += "\n";
            } else if (e.target.id == "capsLock") {
                pressCapsLock();
            } else if (e.target.id == "space") {
                textScreen.value += " ";
            } else if (e.target.id == "backSpace") {
                textScreen.value = textScreen.value.slice(0, -1);
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

})();
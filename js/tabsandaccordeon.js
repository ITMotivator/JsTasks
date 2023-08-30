"use strict";

(function () {
    let tabs = document.getElementsByClassName('nav-item'),
        contentDivs = document.getElementsByClassName('tab-content');

    for (let tab of tabs) {
        tab.addEventListener('click', showContentDiv);
    }

    function showContentDiv(e) {
        if (e.target.closest('li')) {
            let liElem = e.target.closest('li');
            turnOffActive(tabs);
            hideContent(contentDivs);
            let index = turnOnActive(tabs, liElem);
            contentDivs[index].classList.remove('hidden');
        }
    }

    function turnOnActive(collection, liItem) {
        let length = collection.length;
        for (let i = 0; i < length; i++) {
            if (collection[i] == liItem) {
                liItem.classList.add('active');
                return i;
            }
        }
    }

    function turnOffActive(collection) {
        for (let elem of collection) {
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
                break;
            }
        }
    }

    function hideContent(collection) {
        for (let elem of collection) {
            if (!elem.classList.contains('hidden')) {
                elem.classList.add('hidden');
            }
        }
    }

})();

(function () {
    let accorTabs = document.getElementsByClassName('accordeon-item'),
        accorTextDivs = document.getElementsByClassName('accordeon-text'),
        arrowIcons = document.getElementsByClassName('arrow'),
        accorTitles = document.getElementsByClassName('title');

    for (let tab of accorTabs) {
        tab.addEventListener('click', showTextDiv);
    }

    function showTextDiv(e) {
        if (e.target.closest('.accordeon-item')) {
            let tabElem = e.target.closest('.accordeon-item'),
                arrowImg = tabElem.querySelector('.arrow'),
                textDiv = tabElem.nextElementSibling;
            removeActive(accorTabs);
            changeArrows(arrowIcons);
            tabElem.classList.add('active');
            arrowImg.setAttribute('src', '../icons/up.svg');
            if (textDiv.classList.contains('hidden')) {
                hideTextDivs(accorTextDivs);
                textDiv.classList.remove('hidden');
            } else {
                textDiv.classList.add('hidden');
                tabElem.classList.remove('active');
                arrowImg.setAttribute('src', '../icons/down.svg');
            }
        }
    }

    function removeActive(collection) {
        for (let elem of collection) {
            elem.classList.remove('active');
        }
    }

    function changeArrows(collection) {
        for (let elem of collection) {
            elem.setAttribute('src', '../icons/down.svg');
        }
    }

    function hideTextDivs(collection) {
        for (let elem of collection) {
            elem.classList.add('hidden');
        }
    }

})();
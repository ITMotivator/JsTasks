"use strict";

(function () {

    let sections = document.getElementsByTagName('section'),
        calcBtns = document.getElementsByClassName('calculate');

    let inputs = getAllInputs(sections),
        answerParags = getAllAnswerParags(sections);

    let calcFigureFunctions = [square, triangle, rectangle, circle];

    for (let button of calcBtns) {
        let figureName = button.getAttribute('data-type');
        let inps = inputs[figureName],
            pars = answerParags[figureName];
        for (let func of calcFigureFunctions) {
            if (func.name == figureName) {
                button.addEventListener('click', function () {
                    func(inps, pars);
                });
                break;
            }
        }
    }

    function square(textInputs, parAnswers) {
        if (!parAnswers[2].classList.contains('hidden')) {
            parAnswers[2].classList.add('hidden');
        }
        let sideA = textInputs[0].value;
        if (sideA > 0) {
            let answerP = 4 * sideA,
                answerS = sideA * sideA;
            parAnswers[0].innerHTML = `P = 4a<br>
            <span class = "answer">P = ${answerP}</span>`;
            parAnswers[1].innerHTML = `S = a&sup2;<br>
            <span class = "answer">S = ${answerS}</span>`;
        }
        else {
            parAnswers[0].innerHTML = "P = 4a";
            parAnswers[1].innerHTML = "S = a&sup2;";
            parAnswers[2].innerText = "Ошибка ввода";
            parAnswers[2].classList.remove('hidden');
        }
    };

    function rectangle(textInputs, parAnswers) {
        if (!parAnswers[2].classList.contains('hidden')) {
            parAnswers[2].classList.add('hidden');
        }
        let sideA = textInputs[0].value,
            sideB = textInputs[1].value;
        if (sideA > 0 && sideB > 0) {
            let answerP = 2 * sideA + 2 * sideB,
                answerS = sideA * sideB;
            parAnswers[0].innerHTML = `P = 2(a + b)<br>
            <span class = "answer">P = ${answerP}</span>`;
            parAnswers[1].innerHTML = `S = ab<br>
            <span class = "answer">S = ${answerS}</span>`;
        }
        else {
            parAnswers[0].innerHTML = "P = 2(a + b)";
            parAnswers[1].innerHTML = "S = ab;";
            parAnswers[2].innerText = "Ошибка ввода";
            parAnswers[2].classList.remove('hidden');
        }
    };

    function circle(textInputs, parAnswers) {
        if (!parAnswers[2].classList.contains('hidden')) {
            parAnswers[2].classList.add('hidden');
        }
        const PI = 3.1415926535;
        let radiusR = textInputs[0].value;
        if (radiusR > 0) {
            let answerC = (2 * PI * radiusR).toFixed(2),
                answerS = (PI * radiusR * radiusR).toFixed(2);
            parAnswers[0].innerHTML = `C = 2&pi;r<br>
            <span class = "answer">P &asymp; ${answerC}</span>`;
            parAnswers[1].innerHTML = `S = &pi;r&sup2;<br>
            <span class = "answer">S &asymp; ${answerS}</span>`;
        }
        else {
            parAnswers[0].innerHTML = "C = 2&pi;r";
            parAnswers[1].innerHTML = "S = &pi;r&sup2;";
            parAnswers[2].innerText = "Ошибка ввода";
            parAnswers[2].classList.remove('hidden');
        }
    };

    function triangle(textInputs, parAnswers) {
        if (!parAnswers[1].classList.contains('hidden')) {
            parAnswers[1].classList.add('hidden');
        }
        let sideA = +textInputs[0].value,
            sideB = +textInputs[1].value,
            sideC = +textInputs[2].value;
        if (sideA > 0 && sideB > 0 && sideC > 0) {
            let checkIfTrinagleExists = (sideA + sideB) > sideC &&
                (sideC + sideB) > sideA &&
                (sideA + sideC) > sideB;
            if (checkIfTrinagleExists) {
                let halfP = (sideA + sideB + sideC) / 2;
                let answerS = (Math.sqrt(halfP * (halfP - sideA) * (halfP - sideB) * (halfP - sideC))).toFixed(2);
                parAnswers[0].innerHTML = `S = &radic;<span class="sqrRoot">p(p - a)(p - b)(p - c)</span><br>
            <span class = "answer">S = ${answerS}</span>`;
            } else {
                parAnswers[0].innerHTML = `S = &radic;<span class="sqrRoot">p(p - a)(p - b)(p - c)</span>`;
                parAnswers[1].innerHTML = `Ошибка: треугольника с<br>
             такими сторонами не существует`;
                parAnswers[1].classList.remove('hidden');
            }

        }
        else {
            parAnswers[0].innerHTML = `S = &radic;<span class="sqrRoot">p(p - a)(p - b)(p - c)</span>`;
            parAnswers[1].innerText = "Ошибка ввода";
            parAnswers[1].classList.remove('hidden');
        }
    };

    function getAllInputs(elems) {
        let allInputs = {};
        for (let elem of elems) {
            allInputs[elem.id] = elem.getElementsByClassName('form-control');
        }
        return allInputs;
    };

    function getAllAnswerParags(elems) {
        let allAnswerParags = {};
        for (let elem of elems) {
            let parags = elem.querySelectorAll('p[data-answer]');
            allAnswerParags[elem.id] = parags;
        }
        return allAnswerParags;
    };
})();
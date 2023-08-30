"use strict";

(function () {
    let sections = document.getElementsByTagName('section'),
        calcBtns = document.getElementsByClassName('btn');

    let inputs = getAllInputs(sections),
        answerDivs = getResultDivs(sections);

    let mathCalcFunctions = [equationRoots, pythagorTriple, commonDivisors, LCDandGCD];

    for (let button of calcBtns) {
        let calcFuncName = button.getAttribute('data-type');
        let inps = inputs[calcFuncName],
            answerDiv = answerDivs[calcFuncName];
        for (let func of mathCalcFunctions) {
            if (func.name == calcFuncName) {
                button.addEventListener('click', function () {
                    func(inps, answerDiv);
                });
                break;
            }
        }
    }

    function getAllInputs(elems) {
        let allInputs = {};
        for (let elem of elems) {
            allInputs[elem.id] = elem.getElementsByClassName('form-control');
        }
        return allInputs;
    };

    function getResultDivs(elems) {
        let resultDivs = {};
        for (let elem of elems) {
            let div = elem.querySelector('div.result');
            resultDivs[elem.id] = div;
        }
        return resultDivs;
    };

    function equationRoots(textInputs, resultDiv) {
        let a = textInputs[0].value,
            b = textInputs[1].value,
            c = textInputs[2].value;
        resultDiv.innerText = '';
        if (a <= 0) {
            resultDiv.innerHTML = `<p data-answer="error">Коэффициент a должен быть больше ноля</p>`;
        } else if (a > 0 && !isNaN(b) && !isNaN(c)) {
            let d = b * b - 4 * a * c;
            if (d < 0) {
                resultDiv.innerHTML = `<p data-answer="answer">D = ${d}</p>
                <p data-answer="answer">Корней нет</p>`;
            } else if (d == 0) {
                let x = (-b) / (2 * a);
                let xFloat = Number(x.toFixed(2));
                if (x == xFloat) {
                    resultDiv.innerHTML = `<p data-answer="answer">D = ${d}</p>
                    <p data-answer="answer">x = ${x}</p>`;
                } else {
                    resultDiv.innerHTML = `<p data-answer="answer">D = ${d}</p>
                    <p data-answer="answer">x = ${xFloat}</p>`;
                }
            } else {
                let x1 = ((-b) + Math.sqrt(d)) / (2 * a),
                    x2 = ((-b) - Math.sqrt(d)) / (2 * a);
                let x1Float = Number(x1.toFixed(2)),
                    x2Float = Number(x2.toFixed(2));
                if (x1 == x1Float) {
                    resultDiv.innerHTML = `<p data-answer="answer">D = ${d}</p>
                    <p data-answer="answer">x<sub>1</sub> = ${x1}</p>
                    <p data-answer="answer">x<sub>2</sub> = ${x2}</p>`;
                } else {
                    resultDiv.innerHTML = `<p data-answer="answer">D = ${d}</p>
                    <p data-answer="answer">x<sub>1</sub> = ${x1Float} </p>
                    <p data-answer="answer">x<sub>2</sub> = ${x2Float}</p>`;
                }
            }
        } else {
            resultDiv.innerHTML = `<p data-answer="error">Ошибка ввода!</p>`;
        }
    }

    function pythagorTriple(textInputs, resultDiv) {
        resultDiv.innerText = '';
        let a = textInputs[0].value,
            b = textInputs[1].value,
            c = textInputs[2].value;
        if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
            if (a ** 2 == b ** 2 + c ** 2 || b ** 2 == a ** 2 + c ** 2
                || c ** 2 == a ** 2 + b ** 2) {
                resultDiv.innerHTML = `<p data-answer="answer">Это тройка Пифагора!</p>`;
            } else {
                resultDiv.innerHTML = `<p data-answer="answer">Это НЕ тройка Пифагора!</p>`;
            }
        } else {
            resultDiv.innerHTML = `<p data-answer="error">Ошибка ввода!</p>`;
        }
    }

    function commonDivisors(textInputs, resultDiv) {
        resultDiv.innerText = '';
        let a = textInputs[0].value,
            b = textInputs[1].value;
        if (!isNaN(a) && !isNaN(b)) {
            if (a <= 0 || b <= 0) {
                resultDiv.innerHTML = `<p data-answer="answer">Общих делителей нет</p>`;
            } else {
                let divisors = [],
                    min = Math.min(a, b);
                for (let i = 1; i <= min; i++) {
                    if (a % i == 0 && b % i == 0)
                        divisors.push(i);
                }
                let commonDivisors = divisors.join(', ');
                resultDiv.innerHTML = `<p data-answer="answer">${commonDivisors}</p>`;
            }
        } else {
            resultDiv.innerHTML = `<p data-answer="error">Ошибка ввода!</p>`;
        }
    }

    function LCDandGCD(textInputs, resultDiv) {
        resultDiv.innerText = '';
        let a = textInputs[0].value,
            b = textInputs[1].value;
        if (!isNaN(a) && !isNaN(b)) {
            if (a <= 0 || b <= 0) {
                resultDiv.innerHTML = `<p data-answer="error">Оба числа должны быть больше нуля</p>`;
            } else {
                let theGCD = evklid(a, b),
                    theLCD = getLCD(a, b);

                function evklid(m, n) {
                    let x = Number(m),
                        y = Number(n);
                    while (x != y) {
                        if (x > y) x = x - y;
                        else y = y - x;
                        console.log(x);
                    }
                    return x;
                }

                function getLCD(m, n) {
                    let x = Number(m),
                        y = Number(n),
                        resultArr = [],
                        result;
                    if (x % y == 0 || y % x == 0)
                        return Math.max(x, y)
                    else {
                        let arrX = getSimpleDivisors(x),
                            arrY = getSimpleDivisors(y);
                        if (arrX.length < arrY.length) {
                            for (let i = 0; i < arrX.length; i++) {
                                if (arrX[i] == arrY[i]) {
                                    resultArr.push(arrX[i]);
                                } else {
                                    resultArr.push(arrX[i]);
                                    resultArr.push(arrY[i]);
                                }
                            }
                            for (let i = arrX.length; i < arrY.length; i++) {
                                resultArr.push(arrY[i]);
                            }
                        } else if (arrX.length > arrY.length) {
                            for (let i = 0; i < arrY.length; i++) {
                                if (arrX[i] == arrY[i]) {
                                    resultArr.push(arrY[i]);
                                } else {
                                    resultArr.push(arrX[i]);
                                    resultArr.push(arrY[i]);
                                }
                            }
                            for (let i = arrY.length; i < arrX.length; i++) {
                                resultArr.push(arrX[i]);
                            }
                        } else {
                            for (let i = 0; i < arrY.length; i++) {
                                if (arrX[i] == arrY[i]) {
                                    resultArr.push(arrX[i]);
                                } else {
                                    resultArr.push(arrX[i]);
                                    resultArr.push(arrY[i]);
                                }
                            }
                        }
                        result = resultArr.reduce((acc, current) => acc * current);

                        function getSimpleDivisors(z) {
                            let resultArr = [];
                            while (z != 1) {
                                for (let i = 2; i <= z; i++)
                                    if (z % i == 0) {
                                        resultArr.push(i);
                                        break;
                                    }
                                z = z / resultArr[resultArr.length - 1];
                            }
                            console.log(resultArr);
                            return resultArr;
                        }
                        return result;
                    }
                }
                resultDiv.innerHTML = `<p data-answer="answer">НОД = ${theGCD}</p>
                    <p data-answer="answer">НОК = ${theLCD}</p>`;
            }
        } else {
            resultDiv.innerHTML = `<p data-answer="error">Ошибка ввода!</p>`;
        }
    }

})();
"use strict";

(function () {
    let timerDiv = document.getElementById('timer'),
        startBtn = document.querySelector('button.start'),
        stopBtn = document.querySelector('button.stop'),
        resultPar = document.querySelector('p.result');

    //нечетные предсказания - плохие, четные - хорошие 
    let predictions = [
        "",
        "Сегодня вам суждено промочить ноги",
        "У вас сегодня будет замечательный день",
        "Сегодня лучше не выходите из дома",
        "Сегодня вас ждет удача и успех во всех начинаниях",
        "Сегодня лучше полежите весь день на диване",
        "Сегодня прекрасный день для прогулки",
        "Сегодня вы рискуете что-нибудь забыть при выходе из дома",
        "Сегодня есть шанс завести много новых и полезных знакомств",
        "Вы будете везде опаздывать сегодня",
    ];

    startBtn.addEventListener('click', play);

    function play() {

        startBtn.classList.remove('active');
        stopBtn.classList.add('active');
        timerDiv.innerHTML = '';
        timerDiv.classList.add('timer');

        let result = null;

        let timerId = setTimeout(function tick() {
            let num = Math.floor(1 + Math.random() * 9);
            timerDiv.innerHTML = `<p>${num}</p>`;
            result = num;
            timerId = setTimeout(tick, 100);
        }, 100);

        stopBtn.addEventListener('click', function () {
            stopTimer(timerId);
            stopBtn.disabled = 'true';
            checkPrediction(result, resultPar)
            resultPar.innerText = predictions[result];
            resultPar.classList.add('active');
        });

        function stopTimer(timerId) {
            clearTimeout(timerId);
        }
    }

    function checkPrediction(predictionNum, resultPar) {
        if (predictionNum % 2 == 0) {
            resultPar.classList.add('textGreen');
        } else {
            resultPar.classList.add('textRed');
        }
    }

})();

"use strict";

(function () {
    let input = document.querySelector('input'),
        btn = document.querySelector('button'),
        resultDiv = document.querySelector('.result');

    const tagsRefBook = {
        a: `Определяет гиперссылку`,
        abbr: `Определяет текст как аббревиатуру или акроним. 
        Поясняющий текст задаётся с помощью атрибута title.`,
        address: `Задает контактные данные автора/владельца документа или статьи. 
        Отображается в браузере курсивом.`,
        area: `Представляет собой гиперссылку с текстом, соответствующей определенной 
        области на карте-изображении или активную область внутри карты-изображения. 
        Всегда вложен внутрь элемента <map>.`,
        article: `Раздел контента, который образует независимую часть документа 
        или сайта, например, статья в журнале, запись в блоге, комментарий.`,
        aside: `Представляет контент страницы, который имеет косвенное 
        отношение к основному контенту страницы/сайта.`,
        audio: `Загружает звуковой контент на веб-страницу.`,
        b: `Определяет полужирный текст`,
        base: `Задает базовый адрес (URL), относительно которого вычисляются все относительные адреса. 
        Это поможет избежать проблем при переносе страницы в другое место, 
        так как все ссылки будут работать, как и прежде.`,
        bdi: `Изолирует отрывок текста, написанный на языке, 
        в котором чтение текста происходит справа налево, от остального текста.`,
        bdo: `Отображает текст в направлении, указанном в атрибуте dir, 
        переопределяя текущее направление написания текста.`,
        blockquote: `Выделяет текст как цитату, применяется для описания больших цитат.`,
        body: `Представляет тело документа (содержимое, не относящееся к метаданным документа).`,
        br: `Перенос текста на новую строку.`,
        button: `Создает интерактивную кнопку. 
        Элемент может содержать текст или изображение.`,
        canvas: `Холст-контейнер для динамического отображения изображений, 
        таких как простые изображения, диаграммы, графики и т.п. 
        Для рисования используется скриптовый язык JavaScript.`,
        caption: `Добавляет подпись к таблице. 
        Вставляется сразу после открывающего тега &lttable&gt.`,
        cite: `Используется для указания источника цитирования. Отображается курсивом.`,
        code: `Представляет фрагмент программного кода, отображается шрифтом 
        семейства monospace.`,
        col: `Выбирает для форматирования один или несколько столбцов таблицы, 
        не содержащих информацию одного типа.`,
        colgroup: `Создает структурную группу столбцов, 
        выделяющую множество логически однородных ячеек.`,
        command: `Создает команду в виде переключателя, флажка или обычной кнопки. 
        Тег &ltcommand&gt должен располагаться внутри &ltmenu&gt, в противном случае он 
        не будет показан.`,
        comment: `Добавляет комментарий в код документа.`,
        datalist: `Создает список вариантов, которые можно выбирать при наборе в 
        текстовом поле. Изначально этот список скрыт и становится доступным при 
        получении полем фокуса или наборе текста.`,
        dd: `Входит в тройку элементов &ltdl&gt, &ltdt&gt, &ltdd&gt, предназначенных 
        для создания списка определений. Каждый такой список начинается с 
        контейнера &ltdl&gt, куда входит тег &ltdt&gt создающий термин и тег &ltdd&gt 
        задающий определение этого термина. `,
        del: `Используется для выделения текста, который был удален в 
        новой версии документа. Подобное форматирование позволяет отследить, 
        какие изменения в тексте документа были сделаны. Браузеры обычно помечают 
        текст в контейнере &ltdel&gt как перечеркнутый.`,
        details: `Используется для хранения информации, которую 
        можно скрыть или показать по требованию пользователя. По умолчанию 
        содержимое тега не отображается, для изменения статуса применяется 
        атрибут open.`,
        dfn: `Как правило, в документе, когда упоминается новый термин, он 
        выделяется курсивом и дается его определение. При использовании этого 
        термина в дальнейшем, он считается уже известным читателю. Тег &ltdfn&gt 
        применяется для выделения таких терминов при их первом появлении в тексте.`,
        dir: `Создает список, содержащий названия директорий 
        (системные папки). Аналогично тегам &ltol&gt и &ltul&gt внутри контейнера &ltdir&gt 
        список формируется с помощью тегов &ltli&gt. Тег &ltdir&gt вышел из употребления, 
        вместо него рекомендуется использовать тег &ltul&gt.`,
        div: `Элемент &ltdiv&gt является блочным элементом и предназначен для 
        выделения фрагмента документа с целью изменения вида содержимого. 
        Как правило, вид блока управляется с помощью стилей. Чтобы не описывать 
        каждый раз стиль внутри тега, можно выделить стиль во внешнюю таблицу 
        стилей, а для тега добавить атрибут class или id с именем селектора.
        Как и при использовании других блочных элементов, содержимое тега &ltdiv&gt 
        всегда начинается с новой строки. После него также добавляется перенос строки.`,
        dl: `Входит в тройку элементов &ltdl&gt, &ltdt&gt, &ltdd&gt, предназначенных 
        для создания списка определений. Каждый такой список начинается с 
        контейнера &ltdl&gt, куда входит тег &ltdt&gt создающий термин и тег &ltdd&gt 
        задающий определение этого термина.`,
        dt: `Входит в тройку элементов &ltdl&gt, &ltdt&gt, &ltdd&gt, предназначенных 
        для создания списка определений. Каждый такой список начинается с 
        контейнера &ltdl&gt, куда входит тег &ltdt&gt создающий термин и тег &ltdd&gt 
        задающий определение этого термина.`,
        em: `Предназначен для акцентирования текста. Браузеры отображают 
        такой текст курсивным начертанием.`,
        embed: `Элемент используется для загрузки и отображения объектов 
        (например, видеофайлов, флэш-роликов, некоторых звуковых файлов и т.д.), 
        которые исходно браузер не понимает. Как правило, такие объекты требуют 
        подключения к браузеру специального модуля, который называется плагин, 
        или запуска вспомогательной программы.`,
        fieldset: `Элемент предназначен для группирования элементов формы. 
        Такая группировка облегчает работу с формами, содержащими большое число 
        данных. Например, один блок может быть предназначен для ввода текстовой 
        информации, а другой — для флажков. Браузеры для повышения наглядности 
        отображают результат использования тега &ltfieldset&gt в виде рамки. 
        Ее вид зависит от операционной системы, а также используемого браузера.`,
        figcaption: `Содержит описание для тега &ltfigure&gt. Тег &ltfigcaption&gt 
        должен быть первым или последним элементом в группе.`,
        figure: `Используется для группирования любых элементов, например, 
        изображений и подписей к ним.`,
        font: `Представляет собой контейнер для изменения характеристик 
        шрифта, таких как размер, цвет и гарнитура. Хотя этот тег до сих пор 
        поддерживается всеми браузерами, он считается устаревшим и от его 
        использования рекомендуется отказаться в пользу стилей.`,
        form: `Устанавливает форму на веб-странице. Форма предназначена 
        для обмена данными между пользователем и сервером. Область применения 
        форм не ограничена отправкой данных на сервер, с помощью клиентских 
        скриптов можно получить доступ к любому элементу формы, изменять его и 
        применять по своему усмотрению. Документ может содержать любое количество 
        форм, но одновременно на сервер может быть отправлена только одна форма. 
        По этой причине данные форм должны быть независимы друг от друга.
        Допускается внутрь контейнера &ltform&gt помещать другие теги, при этом сама 
        форма никак не отображается на веб-странице, видны только ее элементы и 
        результаты вложенных тегов.`,
        footer: `Задаёт «подвал» сайта или раздела, в нём может располагаться 
        имя автора, дата документа, контактная и правовая информация.`,
        frame: `Определяет свойства отдельного фрейма, на которые делится окно 
        браузера. Этот элемент должен располагаться в контейнере &ltframeset&gt, 
        который к тому же задает способ разметки страницы на отдельные области. 
        В каждую из таких областей загружается самостоятельная веб-страница 
        определяемая с помощью атрибута src. Хотя обязательных атрибутов у 
        тега &ltframe&gt и нет, рекомендуется задавать каждому фрейму его имя 
        через атрибут name. Это особенно важно, если требуется по ссылке из 
        одного фрейма загружать документ в другой.`,
        frameset: `Определяет структуру фреймов на веб-странице. Фреймы разделяют 
        окно браузера на отдельные области, расположенные вплотную друг к другу. 
        В каждую из таких областей загружается самостоятельная веб-страница 
        определяемая с помощью тега &ltframe&gt. С помощью фреймов веб-страница 
        делится на два или более документа, которые обычно содержат навигацию по 
        сайту и его контент. Механизм фреймов позволяет открывать документ в 
        одном фрейме, по ссылке, нажатой в совершенно другом фрейме. Тег 
        &ltframeset&gt заменяет собой элемент &ltbody&gt на веб-странице. Допустимо 
        использовать вложенную структуру элементов, это позволяет разбить один 
        фрейм на две и более области.`,
    };
    btn.addEventListener('click', showTagInfo);
    input.addEventListener('keypress', enter);

    function enter(e) {
        if (e.keyCode == 13) {
            showTagInfo();
        }
    }

    function showTagInfo() {
        let tagEntered = input.value,
            flag = false;
        searchTag(tagEntered);
        if (flag) {
            resultDiv.innerHTML = `<p data-result>&lt${tagEntered}&gt</p>
                <p>${tagsRefBook[tagEntered]}</p>`;
        }
        else {
            resultDiv.innerHTML = `<p data-result>&lt${tagEntered}&gt</p>
                <p>Тэг не найден!</p>`;
        }

        function searchTag(tagName) {
            for (let tag of Object.keys(tagsRefBook)) {
                if (tagName == tag) {
                    flag = true;
                    break;
                }
            }
        }
    }


})();
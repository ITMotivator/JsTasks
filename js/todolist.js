"use strict";

(function () {
    let input = document.querySelector('input'),
        table = document.querySelector('tbody');

    input.addEventListener('keypress', enter);

    function enter(e) {
        if (e.key == 'Enter') {
            addTask(this.value);
            this.value = null;
        }
    }

    function addTask(task) {
        let row = document.createElement('tr'),
            tdTask = document.createElement('td'),
            tdEdit = document.createElement('td'),
            tdDelete = document.createElement('td'),
            tdDone = document.createElement('td'),
            inpDone = document.createElement('input');

        tdTask.innerText = task;
        tdEdit.innerHTML = `<img class='icon' src='../icons/edit.svg' alt='edit'>`;
        tdDelete.innerHTML = `<img class='icon' src='../icons/delete.svg' alt='delete'>`;
        inpDone.setAttribute('type', 'checkbox');
        inpDone.setAttribute('title', 'Отметить завершенным');
        tdDone.append(inpDone);
        row.append(tdTask, tdEdit, tdDelete, tdDone);
        table.append(row);

        let imgDel = tdDelete.querySelector('img'),
            imgEdit = tdEdit.querySelector('img');

        imgDel.setAttribute('title', 'Удалить');
        imgEdit.setAttribute('title', 'Редактировать');

        imgDel.addEventListener('click', deleteTask);
        imgEdit.addEventListener('click', editTask);
        inpDone.addEventListener('change', tickDone)
    }

    function editTask(e) {
        let task = e.target.closest('TR').querySelector('td:first-child'),
            taskName = task.innerText;
        task.innerHTML = `<input type='text' value='${taskName}'>`;
        let inp = task.querySelector('input');

        inp.addEventListener('keypress', function (e) {
            if (e.key == 'Enter') {
                task.innerHTML = this.value;
            }
        });
    }

    function deleteTask(e) {
        let task = e.target.closest('TR');
        task.remove();
    }

    function tickDone(e) {
        let task = e.target.closest('TR').querySelector('td:first-child');
        if (e.target.checked == true) {
            task.setAttribute('id', 'done');
        } else {
            task.removeAttribute('id');
        }
    }
})();
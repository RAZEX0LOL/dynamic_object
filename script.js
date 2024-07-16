document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('formContainer');
    const addFieldButton = document.getElementById('addFieldButton');
    const output = document.getElementById('output');
    
    // Объект для хранения данных
    let user = JSON.parse(localStorage.getItem('user')) || { name: '' };

    // Обновляем вывод объекта
    function updateOutput() {
        output.textContent = JSON.stringify(user, null, 2);
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Обработчик изменения значения поля name
    document.getElementById('nameField').value = user.name;
    document.getElementById('nameField').addEventListener('input', function (event) {
        user.name = event.target.value;
        updateOutput();
    });

    // Восстанавливаем дополнительные поля при загрузке
    for (const key in user) {
        if (key !== 'name') {
            addFieldElement(key, user[key]);
        }
    }

    // Функция для добавления нового поля
    function addField() {
        const fieldName = prompt('Введите название нового поля:');
        if (fieldName && !(fieldName in user)) {
            user[fieldName] = '';
            addFieldElement(fieldName, '');
            updateOutput();
        } else {
            alert('Поле с таким названием уже существует или название не введено!');
        }
    }

    // Функция для добавления элемента поля ввода
    function addFieldElement(fieldName, value) {
        const fieldContainer = document.createElement('div');
        fieldContainer.classList.add('field-container');

        const newField = document.createElement('input');
        newField.type = 'text';
        newField.placeholder = `Введите ${fieldName}`;
        newField.id = `field_${fieldName}`;
        newField.classList.add('input-field');
        newField.value = value;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.classList.add('remove-button');

        removeButton.addEventListener('click', function () {
            delete user[fieldName];
            formContainer.removeChild(fieldContainer);
            updateOutput();
        });

        newField.addEventListener('input', function (event) {
            user[fieldName] = event.target.value;
            updateOutput();
        });

        fieldContainer.appendChild(newField);
        fieldContainer.appendChild(removeButton);
        formContainer.insertBefore(fieldContainer, addFieldButton);
    }

    // Добавляем обработчик событий для кнопки
    addFieldButton.addEventListener('click', addField);

    // Инициализируем вывод объекта
    updateOutput();
});
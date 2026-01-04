// test-list-visibility.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Тестовый скрипт видимости списков загружен');

    let observer = null;
    let isListMode = false;

    // Функция для определения активного режима
    function getActiveViewType() {
        const listIcon = document.getElementById('list-icon');
        const descIcon = document.getElementById('desc-icon');

        if (listIcon && descIcon) {
            const listStyle = window.getComputedStyle(listIcon);
            const descStyle = window.getComputedStyle(descIcon);

            return (listStyle.display !== 'none' && descStyle.display === 'none') ? 'list' : 'text';
        }
        return 'text';
    }

    // Функция для проверки видимости последнего элемента списка
    function checkListVisibility(card) {
        const cardList = card.querySelector('.card-list');
        if (!cardList) return false;

        const listItems = cardList.querySelectorAll('li');
        if (listItems.length === 0) return false;

        const lastItem = listItems[listItems.length - 1];
        const listRect = cardList.getBoundingClientRect();
        const lastItemRect = lastItem.getBoundingClientRect();

        return lastItemRect.bottom > listRect.bottom;
    }

    // Функция для обновления индикаторов видимости
    function updateVisibilityIndicators() {
        const cards = document.querySelectorAll('.toc-card');

        cards.forEach(card => {
            const needsIndicator = checkListVisibility(card);

            if (needsIndicator) {
                card.classList.add('list-incomplete');
                console.log('Добавлен индикатор для карточки:', card.querySelector('.card-title').textContent);
            } else {
                card.classList.remove('list-incomplete');
            }
        });
    }

    // Функция для инициализации наблюдателя
    function initObserver() {
        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver(
            function(entries) {
                entries.forEach(entry => {
                    const card = entry.target.closest('.toc-card');
                    if (!card) return;

                    if (entry.isIntersecting) {
                        card.classList.remove('list-incomplete');
                    } else {
                        card.classList.add('list-incomplete');
                    }
                });
            },
            {
                root: null,
                threshold: 0.1
            }
        );

        // Наблюдаем за последними элементами всех списков
        const cards = document.querySelectorAll('.toc-card');
        cards.forEach(card => {
            const cardList = card.querySelector('.card-list');
            if (!cardList) return;

            const listItems = cardList.querySelectorAll('li');
            if (listItems.length === 0) return;

            const lastItem = listItems[listItems.length - 1];
            observer.observe(lastItem);
        });
    }

    // Функция для переключения режима
    function toggleListMode() {
        const activeViewType = getActiveViewType();

        if (activeViewType === 'list' && !isListMode) {
            // Включаем режим списка
            isListMode = true;
            console.log('Режим списка активирован');

            // Используем Intersection Observer для более точного определения видимости
            initObserver();

            // Дополнительная проверка на случай, если Observer не сработал сразу
            setTimeout(updateVisibilityIndicators, 100);

        } else if (activeViewType === 'text' && isListMode) {
            // Выключаем режим списка
            isListMode = false;
            console.log('Режим текста активирован');

            // Отключаем наблюдатель
            if (observer) {
                observer.disconnect();
                observer = null;
            }

            // Убираем все индикаторы
            const cards = document.querySelectorAll('.toc-card');
            cards.forEach(card => card.classList.remove('list-incomplete'));
        }
    }

    // Обработчик клика на кнопку переключения
    const toggleButton = document.getElementById('toggle-cards-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            // Даем время на переключение иконок, затем определяем режим
            setTimeout(toggleListMode, 50);
        });
    }

    // Инициализация при загрузке страницы
    setTimeout(() => {
        // Определяем начальный режим
        const initialViewType = getActiveViewType();
        isListMode = (initialViewType === 'list');

        if (isListMode) {
            console.log('Начальный режим: список');
            initObserver();
            setTimeout(updateVisibilityIndicators, 100);
        } else {
            console.log('Начальный режим: текст');
        }
    }, 100);

    // Обновляем при изменении размера окна (с задержкой для производительности)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isListMode) {
                console.log('Обновление индикаторов из-за изменения размера окна');
                updateVisibilityIndicators();
            }
        }, 250);
    });

    // Для тестирования: добавляем кнопку для ручной проверки
    const testButton = document.createElement('button');
    testButton.textContent = 'Тест видимости списков';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '1000';
    testButton.style.padding = '10px';
    testButton.style.backgroundColor = '#7c599c';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '4px';
    testButton.style.cursor = 'pointer';

    testButton.addEventListener('click', function() {
        console.log('Ручная проверка видимости списков');
        updateVisibilityIndicators();
    });

    document.body.appendChild(testButton);
});



// --- Функционал для показа стрелочки при неполном контенте ---

document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки карточек с текстом
    function checkTextCardOverflow(card) {
        const cardText = card.querySelector('.card-text');
        if (!cardText) return false;

        // Проверяем, превышает ли контент видимую область
        return cardText.scrollHeight > cardText.clientHeight;
    }

    // Функция для проверки карточек со списком
    function checkListCardOverflow(card) {
        const cardList = card.querySelector('.card-list');
        if (!cardList) return false;

        // Получаем все элементы списка
        const listItems = cardList.querySelectorAll('li');
        if (listItems.length === 0) return false;

        // Получаем позицию и размер контейнера списка
        const listRect = cardList.getBoundingClientRect();

        // Проверяем, что последний элемент списка полностью виден
        const lastItem = listItems[listItems.length - 1];
        const lastItemRect = lastItem.getBoundingClientRect();

        // Если нижняя граница последнего элемента выходит за пределы контейнера
        return lastItemRect.bottom > listRect.bottom;
    }

    // Основная функция проверки всех карточек
    function checkAllCards() {
        const cards = document.querySelectorAll('.toc-card');

        cards.forEach(card => {
            // Определяем тип карточки более точно
            const cardText = card.querySelector('.card-text');
            const cardList = card.querySelector('.card-list');

            let needsArrow = false;

            if (cardText && !cardList) {
                // Это карточка с текстом
                needsArrow = checkTextCardOverflow(card);
                console.log('Текстовая карточка:', needsArrow);
            } else if (cardList && !cardText) {
                // Это карточка со списком
                needsArrow = checkListCardOverflow(card);
                console.log('Карточка со списком:', needsArrow);
            } else if (cardText && cardList) {
                // Если есть и текст и список, проверяем оба
                const textOverflow = checkTextCardOverflow(card);
                const listOverflow = checkListCardOverflow(card);
                needsArrow = textOverflow || listOverflow;
                console.log('Комбинированная карточка:', textOverflow, listOverflow);
            }

            // Добавляем или удаляем класс collapsed
            if (needsArrow) {
                card.classList.add('collapsed');
            } else {
                card.classList.remove('collapsed');
            }
        });
    }

    // Проверяем при загрузке страницы
    setTimeout(checkAllCards, 100);

    // Проверяем при изменении размера окна
    window.addEventListener('resize', checkAllCards);

    // Дополнительно: проверяем при изменении контента
    const observer = new MutationObserver(checkAllCards);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Для отладки
    console.log('Скрипт проверки карточек загружен');
});

// test-list-visibility.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Тестовый скрипт видимости списков загружен');

    let observer = null;
    let isListMode = false;

    // Функция для определения активного режима
    function getActiveViewType() {
        const listIcon = document.getElementById('list-icon');
        const descIcon = document.getElementById('desc-icon');

        if (listIcon && descIcon) {
            const listStyle = window.getComputedStyle(listIcon);
            const descStyle = window.getComputedStyle(descIcon);

            return (listStyle.display !== 'none' && descStyle.display === 'none') ? 'list' : 'text';
        }
        return 'text';
    }

    // Функция для проверки видимости последнего элемента списка
    function checkListVisibility(card) {
        const cardList = card.querySelector('.card-list');
        if (!cardList) return false;

        const listItems = cardList.querySelectorAll('li');
        if (listItems.length === 0) return false;

        const lastItem = listItems[listItems.length - 1];
        const listRect = cardList.getBoundingClientRect();
        const lastItemRect = lastItem.getBoundingClientRect();

        return lastItemRect.bottom > listRect.bottom;
    }

    // Функция для обновления индикаторов видимости
    function updateVisibilityIndicators() {
        const cards = document.querySelectorAll('.toc-card');

        cards.forEach(card => {
            const needsIndicator = checkListVisibility(card);

            if (needsIndicator) {
                card.classList.add('list-incomplete');
                console.log('Добавлен индикатор для карточки:', card.querySelector('.card-title').textContent);
            } else {
                card.classList.remove('list-incomplete');
            }
        });
    }

    // Функция для инициализации наблюдателя
    function initObserver() {
        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver(
            function(entries) {
                entries.forEach(entry => {
                    const card = entry.target.closest('.toc-card');
                    if (!card) return;

                    if (entry.isIntersecting) {
                        card.classList.remove('list-incomplete');
                    } else {
                        card.classList.add('list-incomplete');
                    }
                });
            },
            {
                root: null,
                threshold: 0.1
            }
        );

        // Наблюдаем за последними элементами всех списков
        const cards = document.querySelectorAll('.toc-card');
        cards.forEach(card => {
            const cardList = card.querySelector('.card-list');
            if (!cardList) return;

            const listItems = cardList.querySelectorAll('li');
            if (listItems.length === 0) return;

            const lastItem = listItems[listItems.length - 1];
            observer.observe(lastItem);
        });
    }

    // Функция для переключения режима
    function toggleListMode() {
        const activeViewType = getActiveViewType();

        if (activeViewType === 'list' && !isListMode) {
            // Включаем режим списка
            isListMode = true;
            console.log('Режим списка активирован');

            // Используем Intersection Observer для более точного определения видимости
            initObserver();

            // Дополнительная проверка на случай, если Observer не сработал сразу
            setTimeout(updateVisibilityIndicators, 100);

        } else if (activeViewType === 'text' && isListMode) {
            // Выключаем режим списка
            isListMode = false;
            console.log('Режим текста активирован');

            // Отключаем наблюдатель
            if (observer) {
                observer.disconnect();
                observer = null;
            }

            // Убираем все индикаторы
            const cards = document.querySelectorAll('.toc-card');
            cards.forEach(card => card.classList.remove('list-incomplete'));
        }
    }

    // Обработчик клика на кнопку переключения
    const toggleButton = document.getElementById('toggle-cards-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            // Даем время на переключение иконок, затем определяем режим
            setTimeout(toggleListMode, 50);
        });
    }

    // Инициализация при загрузке страницы
    setTimeout(() => {
        // Определяем начальный режим
        const initialViewType = getActiveViewType();
        isListMode = (initialViewType === 'list');

        if (isListMode) {
            console.log('Начальный режим: список');
            initObserver();
            setTimeout(updateVisibilityIndicators, 100);
        } else {
            console.log('Начальный режим: текст');
        }
    }, 100);

    // Обновляем при изменении размера окна (с задержкой для производительности)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isListMode) {
                console.log('Обновление индикаторов из-за изменения размера окна');
                updateVisibilityIndicators();
            }
        }, 250);
    });

    // Для тестирования: добавляем кнопку для ручной проверки
    const testButton = document.createElement('button');
    testButton.textContent = 'Тест видимости списков';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '1000';
    testButton.style.padding = '10px';
    testButton.style.backgroundColor = '#7c599c';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '4px';
    testButton.style.cursor = 'pointer';

    testButton.addEventListener('click', function() {
        console.log('Ручная проверка видимости списков');
        updateVisibilityIndicators();
    });

    document.body.appendChild(testButton);
});

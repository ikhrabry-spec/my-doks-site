// t0ggle-card.js


document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggle-cards-button');
  const sidebarSourcesList = document.querySelector('.docs-toc .sources-list'); // Список в боковой панели
  const mainSourcesList = document.getElementById('sources-list'); // Полный список на отдельной странице

  let isAnimating = false;

  // Проверяем наличие всех необходимых элементов на странице
  if (!toggleButton) {
    console.error('Кнопка переключения не найдена.');
    return;
  }

  const listIcon = document.getElementById('list-icon');
  const descIcon = document.getElementById('desc-icon');

  // Определяем тип страницы
  const tocItems = document.querySelectorAll('.toc-card');
  const isTocPage = tocItems.length > 0;
  const isSidebarSourcesPage = !!sidebarSourcesList;
  const isMainSourcesPage = !!mainSourcesList;
  const isTestPage = document.getElementById('test-list') !== null;

  console.log('Тип страницы:', isTocPage ? 'Оглавление' : isSidebarSourcesPage ? 'Источники в боковой панели' : isMainSourcesPage ? 'Полный список источников' : isTestPage ? 'Test страница' : 'Другая');

  // --- Функции для страницы с источниками в боковой панели ---
  function setSidebarSourcesDisplay(mode) {
    if (!sidebarSourcesList) return;
    if (mode === 'expanded') {
      sidebarSourcesList.classList.remove('compact');
      sidebarSourcesList.classList.add('expanded');
      if (listIcon) listIcon.style.display = 'block';
      if (descIcon) descIcon.style.display = 'none';
    } else { // 'compact'
      sidebarSourcesList.classList.remove('expanded');
      sidebarSourcesList.classList.add('compact');
      if (listIcon) listIcon.style.display = 'none';
      if (descIcon) descIcon.style.display = 'block';
    }
    localStorage.setItem('sidebarSourcesDisplayMode', mode);
  }

  function toggleSidebarSourcesDisplay() {
    const currentMode = localStorage.getItem('sidebarSourcesDisplayMode') || 'compact';
    const newMode = (currentMode === 'compact') ? 'expanded' : 'compact';
    setSidebarSourcesDisplay(newMode);
    console.log('Переключено на вид:', newMode);
  }

  // --- Функции для страницы с полным списком источников ---

// Инициализация флага в начале скрипта (в глобальной области видимости)
if (!window.updateListIndicatorsReady) {
    window.updateListIndicatorsReady = false;
}

// Определяем все необходимые функции в глобальной области видимости
window.getActiveViewType = function() {
    const listIcon = document.getElementById('list-icon');
    const descIcon = document.getElementById('desc-icon');

    if (listIcon && descIcon) {
        const listStyle = window.getComputedStyle(listIcon);
        const descStyle = window.getComputedStyle(descIcon);

        return (listStyle.display !== 'none' && descStyle.display === 'none') ? 'list' : 'text';
    }
    return 'text';
};

window.checkListVisibility = function(card) {
    const cardList = card.querySelector('.card-list');
    if (!cardList) return false;

    const listItems = cardList.querySelectorAll('li');
    if (listItems.length === 0) return false;

    const listRect = cardList.getBoundingClientRect();
    const lastItem = listItems[listItems.length - 1];
    const lastItemRect = lastItem.getBoundingClientRect();

    return lastItemRect.bottom > listRect.bottom;
};

window.updateListIndicators = function() {
    const cards = document.querySelectorAll('.toc-card');
    const activeViewType = window.getActiveViewType();

    cards.forEach(card => {
        if (activeViewType === 'list') {
            const needsIndicator = window.checkListVisibility(card);
            if (needsIndicator) {
                card.classList.add('list-incomplete');
                console.log('Добавлен индикатор для карточки:', card.querySelector('.card-title')?.textContent);
            } else {
                card.classList.remove('list-incomplete');
            }
        } else {
            card.classList.remove('list-incomplete');
        }
    });
};

// Отправляем событие о том, что функция готова
window.updateListIndicatorsReady = true;
window.dispatchEvent(new CustomEvent('updateListIndicatorsReady'));
console.log('Событие updateListIndicatorsReady отправлено');

  // --- Функции для страницы Оглавления ---
  function toggleTocDisplay() {

    let isListView = false;
    if (tocItems.length > 0) {
      const firstItem = tocItems[0];
      const list = firstItem.querySelector('.card-list');
      isListView = list && window.getComputedStyle(list).display !== 'none';
    }


    isListView = !isListView;

    if (listIcon) listIcon.style.display = isListView ? 'none' : 'block';
    if (descIcon) descIcon.style.display = isListView ? 'block' : 'none';

    tocItems.forEach(item => {
      const description = item.querySelector('.card-text');
      const list = item.querySelector('.card-list');
      if (description && list) {
        description.style.display = isListView ? 'none' : 'block';
        list.style.display = isListView ? 'block' : 'none';
      }
    });

    console.log('Переключено на режим:', isListView ? 'список' : 'текст');

        // Непосредственно добавляем или удаляем индикаторы
    if (isListView) {
        // Режим списка - добавляем индикаторы где нужно
        tocItems.forEach(card => {
            const cardList = card.querySelector('.card-list');
            if (!cardList) return;

            const listItems = cardList.querySelectorAll('li');
            if (listItems.length === 0) return;

            const listRect = cardList.getBoundingClientRect();
            const lastItem = listItems[listItems.length - 1];
            const lastItemRect = lastItem.getBoundingClientRect();

            // Если последний элемент не виден полностью, добавляем индикатор
            if (lastItemRect.bottom > listRect.bottom) {
                card.classList.add('list-incomplete');
                console.log('Добавлен индикатор для карточки:', card.querySelector('.card-title')?.textContent);

              } else {
                card.classList.remove('list-incomplete');
            }
        });
        // Удаляем все стрелочки в режиме списка)
        tocItems.forEach(card => {
          card.classList.remove('collapsed');
          console.log('Удалён вызов стрелочки');
        });

      } else {
        // Текстовый режим - удаляем все индикаторы
        tocItems.forEach(card => {
            card.classList.remove('list-incomplete');
        });

// Проверяем необходимость стрелочек в текстовом режиме
    setTimeout(() => {
        tocItems.forEach(card => {
            const cardText = card.querySelector('.card-text');
            if (!cardText) return;

            // Проверяем, превышает ли контент видимую область
            const needsArrow = cardText.scrollHeight > cardText.clientHeight;

            if (needsArrow) {
                card.classList.add('collapsed');
                console.log('Добавлена стрелочка для карточки:', card.querySelector('.card-title')?.textContent);
            } else {
                card.classList.remove('collapsed');
            }
        });
    }, 50);
      }
}

  // --- Инициализация в зависимости от типа страницы ---
    if (isMainSourcesPage) {
        console.log('Страница с полным списком источников - настраиваем обработчики');

        const sourcesList = document.getElementById('sources-list');
        const toggleButton = document.getElementById('toggle-cards-button');

        // Функция для переключения состояния
const setDisplayMode = (mode) => {
        const listIcon = document.getElementById('list-icon');
        const descIcon = document.getElementById('desc-icon');

        if (mode === 'expanded') {
            sourcesList.classList.add('expanded');
            sourcesList.classList.remove('compact');
            // При развёртывании всех, убираем класс у отдельных элементов,
            // чтобы избежать конфликтов
            sourcesList.querySelectorAll('.source-item').forEach(item => {
                item.classList.remove('is-expanded');
            });
            // Переключаем иконки
            if (listIcon) listIcon.style.display = 'block';
            if (descIcon) descIcon.style.display = 'none';
        } else {
            sourcesList.classList.add('compact');
            sourcesList.classList.remove('expanded');
            // При свёртывании всех, убираем класс у отдельных элементов
            sourcesList.querySelectorAll('.source-item').forEach(item => {
                item.classList.remove('is-expanded');
            });
            // Переключаем иконки
            if (listIcon) listIcon.style.display = 'none';
            if (descIcon) descIcon.style.display = 'block';
        }
    };
        // --- Обработчик для глобальной кнопки ---
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                const isExpanded = sourcesList.classList.contains('expanded');
                if (isExpanded) {
                    setDisplayMode('compact');
                } else {
                    setDisplayMode('expanded');
                }
            });
        }

        // --- Обработчик для кликов по отдельным элементам ---
        if (sourcesList) {
            sourcesList.addEventListener('click', (event) => {
                // Игнорируем клики по ссылкам, чтобы они работали
                if (event.target.tagName === 'A' || event.target.closest('a')) {
                    return;
                }

                const clickedItem = event.target.closest('.source-item');
                if (clickedItem) {
                    // Если список в глобальном развёрнутом или свёрнутом состоянии,
                    // сначала возвращаем его в нейтральное, чтобы избежать конфликтов
                    if (sourcesList.classList.contains('expanded') || sourcesList.classList.contains('compact')) {
                        sourcesList.classList.remove('expanded');
                        sourcesList.classList.remove('compact');
                        // Дополнительно, скрываем все детали, если они были глобально показаны
                        sourcesList.querySelectorAll('.source-item').forEach(item => {
                            item.classList.remove('is-expanded');
                        });
                    }

                    // Переключаем класс только для кликнутого элемента
const short = clickedItem.querySelector('.source-item-short');
const full = clickedItem.querySelector('.source-item-full');
if (short && full) {
    if (full.style.display === 'none') {
        full.style.display = 'block';
        short.style.display = 'none';
        clickedItem.classList.add('is-expanded');
    } else {
        full.style.display = 'none';
        short.style.display = 'block';
        clickedItem.classList.remove('is-expanded');
    }
}
                }
            });
        }
    } else if (isSidebarSourcesPage) {
    //...

  } else if (isSidebarSourcesPage) {
    console.log('Страница с источниками в боковой панели - настраиваем обработчик');

    // Восстанавливаем сохраненное состояние или устанавливаем по умолчанию
    const savedMode = localStorage.getItem('sidebarSourcesDisplayMode') || 'compact';
    setSidebarSourcesDisplay(savedMode);

    // Прикрепляем слушатель к кнопке
    toggleButton.addEventListener('click', toggleSidebarSourcesDisplay);

    // Добавляем логику сортировки
    const sortBySelect = document.getElementById('sort-by');
    if (sortBySelect && sidebarSourcesList) {
      const items = Array.from(sidebarSourcesList.querySelectorAll('li.source-item'));
      const sortList = (sortOption) => {
        const [key, order] = sortOption.split('-');
        items.sort((a, b) => {
          let aValue = a.getAttribute(`data-source-${key}`);
          let bValue = b.getAttribute(`data-source-${key}`);
          if (key === 'date') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
          }
          if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });
        sidebarSourcesList.innerHTML = '';
        items.forEach((item) => {
          sidebarSourcesList.appendChild(item);
        });
      };
      sortBySelect.addEventListener('change', (event) => {
        sortList(event.target.value);
      });
      sortList(sortBySelect.value);
    }
  } else if (isTocPage) {
    console.log('Страница оглавления - настраиваем обработчик');

    // Принудительно устанавливаем начальное состояние карточек на "текст"
    tocItems.forEach(item => {
        const description = item.querySelector('.card-text');
        const list = item.querySelector('.card-list');
        if (description && list) {
          description.style.display = 'block'; // Текст виден
          list.style.display = 'none';      // Список скрыт
        }
    });

    // Инициализируем иконку кнопки, чтобы она показывала следующее состояние (список)
    if (listIcon) listIcon.style.display = 'block';
    if (descIcon) descIcon.style.display = 'none';

    // Прикрепляем слушатель к кнопке
    toggleButton.addEventListener('click', toggleTocDisplay);


 } else {
  console.log('Другая страница - отображение стандартного поведения');
  // НЕ отключаем кнопку, оставляем её активной
  // Можно добавить универсальный обработчик
  toggleButton.addEventListener('click', function() {
    console.log('Кнопка нажата на общей странице');
    // Можно добавить общее поведение для всех типов карточек
  });
}

  // --- Функционал для выделения и прокрутки источника по клику на сноску ---

  // Эта функция теперь просто выделяет источник и прокручивает страницу, если нужно.
  function highlightSource(sourceNumber) {
      document.querySelectorAll('.source-item').forEach(item => {
          item.classList.remove('highlighted');
      });
      const sourceElement = document.querySelector(`.source-item[data-source-number="${sourceNumber}"]`);
      if (sourceElement) {
          sourceElement.classList.add('highlighted');
          if (!isElementInViewport(sourceElement)) {
              sourceElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
      }
  }

  // Убираем подсветку со всех сносок и источников
  function unhighlightAll() {
      document.querySelectorAll('.source-reference').forEach(ref => {
          ref.classList.remove('highlighted');
      });
      document.querySelectorAll('.source-item').forEach(item => {
          item.classList.remove('highlighted');
      });
  }

  // Проверяем видимость элемента во viewport
  function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  // Обработчики событий для сносок в тексте
  document.querySelectorAll('.source-reference').forEach(ref => {
      const sourceNumber = ref.getAttribute('data-source-number');

      // Наведение курсора: подсвечиваем и сноску, и источник
      ref.addEventListener('mouseenter', () => {
          unhighlightAll(); // Сначала очищаем все
          ref.classList.add('highlighted'); // Подсвечиваем саму сноску
          document.querySelector(`.source-item[data-source-number="${sourceNumber}"]`)?.classList.add('highlighted');
      });

      // Уход курсора: убираем всю подсветку
      ref.addEventListener('mouseleave', () => {
              setTimeout(() => {
        unhighlightAll();
    }, 5000);
      });

      // Клик: подсвечиваем и прокручиваем
      ref.addEventListener('click', (e) => {
          e.preventDefault();
          highlightSource(sourceNumber);
      });
  });

  // Обработчики событий для источников в правой колонке
  document.querySelectorAll('.source-item').forEach(item => {
      const sourceNumber = item.getAttribute('data-source-number');

      // Наведение курсора: подсвечиваем и источник, и связанную сноску
      item.addEventListener('mouseenter', () => {
          unhighlightAll(); // Сначала очищаем все
          item.classList.add('highlighted');
          document.querySelector(`.source-reference[data-source-number="${sourceNumber}"]`)?.classList.add('highlighted');
      });

      // Уход курсора: убираем всю подсветку
      item.addEventListener('mouseleave', () => {
              setTimeout(() => {
        unhighlightAll();
    }, 5000);
      });
  });


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

// ДВУХУРОВНЕВОЕ МЕНЮ
// ДВУХУРОВНЕВОЕ МЕНЮ
document.addEventListener('DOMContentLoaded', function() {
  const expandAllButton = document.querySelector('.docs-sidebar .expand-all-menu');
  let isExpanded = false;

  // Функция для пометки активных меню
  function markActiveMenus() {
    document.querySelectorAll('.docs-sidebar details').forEach(detail => {
      detail.classList.remove('has-active-child');
    });

    document.querySelectorAll('.docs-sidebar .active').forEach(element => {
      let link = element;
      if (element.tagName === 'LI') {
        link = element.querySelector('a');
      }

      if (link && link.tagName === 'A') {
        let parentElement = link.closest('details');
        while (parentElement) {
          parentElement.classList.add('has-active-child');
          parentElement.setAttribute('open', 'open');
          parentElement = parentElement.parentElement.closest('details');
        }
      }
    });
  }

  // Функция для определения активного меню
  function isActiveMenu(detail) {
    return detail.classList.contains('has-active-child');
  }

  // Обработчик для кнопки раскрытия/сворачивания
  if (expandAllButton) {
    expandAllButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      isExpanded = !isExpanded;
      const allDetails = document.querySelectorAll('.docs-sidebar details');

      if (isExpanded) {
        // РАСКРЫВАЕМ ВСЕ меню
        allDetails.forEach(detail => {
          // Убираем анимацию закрытия при принудительном открытии
          detail.classList.remove('closing');
          // Открываем меню
          detail.setAttribute('open', 'open');
          // Добавляем атрибут, что меню открыто через кнопку
          detail.setAttribute('data-forced-open', 'true');
        });
      } else {
        // СВОРАЧИВАЕМ только неактивные
        allDetails.forEach(detail => {
          detail.removeAttribute('data-forced-open');
          if (!isActiveMenu(detail)) {
            detail.removeAttribute('open');
          }
        });
      }

      // Обновляем визуальное состояние кнопки
      this.classList.toggle('expanded');

      console.log('Кнопка нажата. Состояние:', isExpanded ? 'развернуто' : 'свернуто');
    });
  }

  // Базовые обработчики наведения для меню
  document.querySelectorAll('.docs-sidebar details').forEach(details => {
    // Пропускаем активные меню
    if (isActiveMenu(details)) return;

    let openTimer, closeTimer;

    details.addEventListener('mouseenter', function() {
      // Не открываем при наведении, если меню развернуто через кнопку
      if (!isExpanded) {
        clearTimeout(closeTimer);
        openTimer = setTimeout(() => {
          this.classList.remove('closing');
          this.setAttribute('open', 'open');
        }, 300);
      }
    });

    details.addEventListener('mouseleave', function() {
      // Не закрываем при уходе, если меню развернуто через кнопку
      if (!isExpanded && !isActiveMenu(this)) {
        clearTimeout(openTimer);

        const currentDetails = this;
        currentDetails.classList.add('closing');

        closeTimer = setTimeout(() => {
          if (!isActiveMenu(currentDetails)) {
            currentDetails.removeAttribute('open');
          }
          currentDetails.classList.remove('closing');
        }, 5000); // 5 секунд
      }
    });
  });

  // Вызываем функцию пометки активных меню
  setTimeout(markActiveMenus, 100);

  // MutationObserver для защиты активных меню
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
        const detail = mutation.target;
        if (isActiveMenu(detail) && !detail.hasAttribute('open')) {
          detail.setAttribute('open', 'open');
        }
      }
    });
  });

  document.querySelectorAll('.docs-sidebar details').forEach(detail => {
    observer.observe(detail, { attributes: true });
  });
});

// Код для окрашивания выделенных заголовков в правой колонке
document.addEventListener('DOMContentLoaded', function() {
    // ⭐ ИЗМЕНЕНИЕ: Объединяем селекторы для TableOfContents и sources-toc-link ⭐
    const tocLinks = document.querySelectorAll(
      '#TableOfContents a, .sources-toc-link, .content-blocks-toc .sources-toc-link');

    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 1. Remove the 'active' class from all elements

            // ⭐ ИЗМЕНЕНИЕ: Убираем 'active' со всех ссылок в обоих оглавлениях ⭐
            document.querySelectorAll('#TableOfContents a.active, .sources-toc-link.active, .content-blocks-toc .sources-toc-link.active').forEach(el => el.classList.remove('active'));

            // ⭐ ИЗМЕНЕНИЕ: Убираем 'active' со всех заголовков в центральной колонке.
            // Добавлен sources-anchor-target для Companies. ⭐
            document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6, .sources-anchor-target').forEach(el => el.classList.remove('active'));

            // 2. Add the 'active' class instantly to the clicked link
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            const targetHeader = document.getElementById(targetId);

            if (targetHeader) {
                targetHeader.classList.add('active');
            }

            // 3. Set a timeout to remove the 'active' class after the delay,
            // which will trigger the fade transition back to black.
            // Примечание: 17000 миллисекунд (2s задержка + 15s переход) — это очень долго.
            // Убедитесь, что это правильное значение.
            setTimeout(() => {
                this.classList.remove('active');
                if (targetHeader) {
                    targetHeader.classList.remove('active');
                }
            }, 17000); // 2000 + 15000 = 17000
        });
    });

// РАБОЧИЙ КОД ДЛЯ PUBLICATIONS И COMPANIES
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== ИНИЦИАЛИЗАЦИЯ PUBLICATIONS И COMPANIES ===');

  // 1. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ВСЕХ ТИПОВ
  function setupListToggle(listId, itemClass, fullClass, shortClass) {
    const list = document.getElementById(listId);
    if (!list) {
      console.log('Список не найден:', listId);
      return;
    }

    console.log('Настройка списка:', listId, 'элементов:', list.querySelectorAll('.' + itemClass).length);

    // Удаляем все старые обработчики (чтобы избежать дублирования)
    const newList = list.cloneNode(true);
    list.parentNode.replaceChild(newList, list);

    // Добавляем новый обработчик
    newList.addEventListener('click', function(event) {
      // Проверяем, что кликнули НЕ на ссылке
      if (event.target.tagName === 'A' || event.target.closest('a')) {
        console.log('Клик по ссылке, игнорируем');
        return;
      }

      // Ищем ближайший элемент
      const clickedItem = event.target.closest('.' + itemClass);
      if (!clickedItem) {
        console.log('Не найден элемент класса:', itemClass);
        return;
      }

      console.log('Клик по элементу:', itemClass, clickedItem);

      // Находим элементы контента
      const full = clickedItem.querySelector('.' + fullClass);
      const short = clickedItem.querySelector('.' + shortClass);

      if (!full || !short) {
        console.log('Не найдены full/short элементы:', fullClass, shortClass);
        return;
      }

      console.log('full display до:', full.style.display);
      console.log('short display до:', short.style.display);

      // ПРОСТОЕ ПЕРЕКЛЮЧЕНИЕ
      if (full.style.display === 'none') {
        full.style.display = 'block';
        short.style.display = 'none';
        clickedItem.classList.add('is-expanded');
        console.log('Элемент развернут');
      } else {
        full.style.display = 'none';
        short.style.display = 'block';
        clickedItem.classList.remove('is-expanded');
        console.log('Элемент свернут');
      }
    });

    console.log('Обработчик добавлен для:', listId);
  }

  // 2. НАСТРАИВАЕМ ВСЕ СПИСКИ
  setupListToggle('sources-list', 'source-item', 'source-item-full', 'source-item-short');
  setupListToggle('publications-list', 'publication-item', 'publication-item-full', 'publication-item-short');
  setupListToggle('companies-list', 'company-item', 'company-item-full', 'company-item-short');
  setupListToggle('patents-list', 'patent-item', 'patent-item-full', 'patent-item-short');
  setupListToggle('legal-list', 'legal-item', 'legal-item-full', 'legal-item-short');
  setupListToggle('test-list', 'test-item', 'test-item-full', 'test-item-short');
  setupListToggle('test-list', 'test-item', 'test-item-full', 'test-item-short');

  // 3. ПРОВЕРЯЕМ, РАБОТАЕТ ЛИ КЛИК
  // Давайте также добавим визуальную подсказку
  setTimeout(() => {
    const pubItems = document.querySelectorAll('.publication-item');
    const compItems = document.querySelectorAll('.company-item');

    const patItems = document.querySelectorAll('.patent-item');
    const legItems = document.querySelectorAll('.legal-item');

    pubItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.style.position = 'relative';
      item.title = 'Click to expand/collapse';
    });

    compItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.style.position = 'relative';
      item.title = 'Click to expand/collapse';
    });

    console.log('Курсоры установлены для Publications и Companies');
  }, 500);

  console.log('=== ИНИЦИАЛИЗАЦИЯ ЗАВЕРШЕНА ===');
});

// ДОБАВЬТЕ В САМЫЙ КОНЕЦ toggle-cards.js
(function() {
  // Ждём немного после DOMContentLoaded
  setTimeout(function() {
    console.log('Дополнительная инициализация карточек');

    // Publications
    document.querySelectorAll('.publication-item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        const full = this.querySelector('.publication-item-full');
        const short = this.querySelector('.publication-item-short');
        if (full && short) {
          full.style.display = full.style.display === 'none' ? 'block' : 'none';
          short.style.display = short.style.display === 'none' ? 'block' : 'none';
        }
      });
    });

 // Companies
    document.querySelectorAll('.company-item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        const full = this.querySelector('.company-item-full');
        const short = this.querySelector('.company-item-short');
        if (full && short) {
          full.style.display = full.style.display === 'none' ? 'block' : 'none';
          short.style.display = short.style.display === 'none' ? 'block' : 'none';
        }
      });
    });
// Patents
    document.querySelectorAll('.patent-item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        const full = this.querySelector('.patent-item-full');
        const short = this.querySelector('.patent-item-short');
        if (full && short) {
          full.style.display = full.style.display === 'none' ? 'block' : 'none';
          short.style.display = short.style.display === 'none' ? 'block' : 'none';
        }
      });
    });

// Legal
    document.querySelectorAll('.legal-item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        const full = this.querySelector('.legal-item-full');
        const short = this.querySelector('.legal-item-short');
        if (full && short) {
          full.style.display = full.style.display === 'none' ? 'block' : 'none';
          short.style.display = short.style.display === 'none' ? 'block' : 'none';
        }
      });
    });

    document.querySelectorAll('.test-item').forEach(item => {
  item.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    const full = this.querySelector('.test-item-full');
    const short = this.querySelector('.test-item-short');
    if (full && short) {
      full.style.display = full.style.display === 'none' ? 'block' : 'none';
      short.style.display = short.style.display === 'none' ? 'block' : 'none';
    }
  });
});

    console.log('Publications и Companies инициализированы');
  }, 500); // Задержка 500ms
})();

// ============================================
// ДОПОЛНЕНИЕ: Глобальная кнопка для ВСЕХ типов
// ============================================

(function() {
  // Ждём полной загрузки
  setTimeout(function() {
    const toggleButton = document.getElementById('toggle-cards-button');
    if (!toggleButton) return;

    // 🔴 ДОБАВЬТЕ ЭТИ 3 СТРОКИ 🔴
    const tocItems = document.querySelectorAll('.toc-card');
    if (tocItems.length > 0) return; // Не переконфигурируем для TOC!
    // 🔴 КОНЕЦ ДОБАВЛЕНИЯ 🔴

    console.log('Настройка глобальной кнопки для всех типов карточек');

    // Проверяем, не обрабатывается ли уже кнопка где-то ещё
    const oldClickHandler = toggleButton.onclick;
    toggleButton.onclick = null;

    // Удаляем все старые обработчики события click
    const newToggleButton = toggleButton.cloneNode(true);
    toggleButton.parentNode.replaceChild(newToggleButton, toggleButton);

    // Новая функция для переключения ВСЕХ карточек
    let allExpanded = false;

    newToggleButton.addEventListener('click', function() {
      console.log('Глобальная кнопка: клик');

      // Определяем, что сейчас нужно делать
      allExpanded = !allExpanded;

      // ВСЕ типы карточек, которые нужно обработать
      const cardTypes = [
        { itemClass: 'source-item', fullClass: 'source-item-full', shortClass: 'source-item-short' },
        { itemClass: 'publication-item', fullClass: 'publication-item-full', shortClass: 'publication-item-short' },
        { itemClass: 'company-item', fullClass: 'company-item-full', shortClass: 'company-item-short' },
        { itemClass: 'patent-item', fullClass: 'patent-item-full', shortClass: 'patent-item-short' },
        { itemClass: 'legal-item', fullClass: 'legal-item-full', shortClass: 'legal-item-short' },
        { itemClass: 'test-item', fullClass: 'test-item-full', shortClass: 'test-item-short' }
      ];

      // Обрабатываем ВСЕ типы карточек
      cardTypes.forEach(type => {
        const items = document.querySelectorAll('.' + type.itemClass);
        console.log(`Обработка ${items.length} элементов типа ${type.itemClass}`);

        items.forEach(item => {
          const full = item.querySelector('.' + type.fullClass);
          const short = item.querySelector('.' + type.shortClass);

          if (full && short) {
            if (allExpanded) {
              // Разворачиваем
              full.style.display = 'block';
              short.style.display = 'none';
              item.classList.add('expanded');
            } else {
              // Сворачиваем
              full.style.display = 'none';
              short.style.display = 'block';
              item.classList.remove('expanded');
            }
          }
        });
      });

      // Переключаем иконки на кнопке
      const listIcon = document.getElementById('list-icon');
      const descIcon = document.getElementById('desc-icon');

      if (listIcon && descIcon) {
        if (allExpanded) {
          listIcon.style.display = 'block';
          descIcon.style.display = 'none';
          console.log('Иконки: показать список');
        } else {
          listIcon.style.display = 'none';
          descIcon.style.display = 'block';
          console.log('Иконки: показать описание');
        }
      }

      console.log('Глобальное состояние:', allExpanded ? 'ВСЁ развернуто' : 'ВСЁ свернуто');
    });

    console.log('Глобальная кнопка переконфигурирована');
  }, 300); // Небольшая задержка
})();

// ============================================
// СИНХРОННАЯ ПОДСВЕТКА ДЛЯ ВСЕХ ТИПОВ ССЫЛОК
// ============================================

(function() {
  // Ждём полной загрузки
  setTimeout(function() {
    console.log('Настройка синхронной подсветки для всех типов');

    // Все типы ссылок, которые нужно поддерживать
    const allLinkTypes = [
      {
        textClass: 'source-reference',
        itemClass: 'source-item',
        dataAttr: 'source-number'
      },
      {
        textClass: 'publication-reference',
        itemClass: 'publication-item',
        dataAttr: 'publication-number'
      },
      {
        textClass: 'company-reference',
        itemClass: 'company-item',
        dataAttr: 'company-number'
      },
      {
        textClass: 'patent-reference',
        itemClass: 'patent-item',
        dataAttr: 'patent-number'
      },
      {
        textClass: 'legal-reference',
        itemClass: 'legal-item',
        dataAttr: 'legal-number'
      },
      {
        textClass: 'test-reference',
        itemClass: 'test-item',
        dataAttr: 'test-number'
      }
    ];

    // 1. Функция для подсветки конкретной ссылки
    function highlightLink(typeConfig, number) {
      // Сначала убираем подсветку со ВСЕГО
      allLinkTypes.forEach(type => {
        document.querySelectorAll('.' + type.textClass).forEach(el => {
          el.classList.remove('highlighted');
        });
        document.querySelectorAll('.' + type.itemClass).forEach(el => {
          el.classList.remove('highlighted');
        });
      });

      // Подсвечиваем ссылку в тексте
      const textLink = document.querySelector(
        '.' + typeConfig.textClass + '[data-' + typeConfig.dataAttr + '="' + number + '"]'
      );
      if (textLink) {
        textLink.classList.add('highlighted');
      }

      // Подсвечиваем карточку в правой колонке
      const cardItem = document.querySelector(
        '.' + typeConfig.itemClass + '[data-' + typeConfig.dataAttr + '="' + number + '"]'
      );
      if (cardItem) {
        cardItem.classList.add('highlighted');

        // Прокручиваем к карточке если она не видна
        if (!isElementInViewport(cardItem)) {
          cardItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      }
    }

    // 2. Функция для сброса всей подсветки
    function unhighlightAll() {
      allLinkTypes.forEach(type => {
        document.querySelectorAll('.' + type.textClass).forEach(el => {
          el.classList.remove('highlighted');
        });
        document.querySelectorAll('.' + type.itemClass).forEach(el => {
          el.classList.remove('highlighted');
        });
      });
    }

    // 3. Функция проверки видимости элемента
    function isElementInViewport(el) {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // 4. Добавляем обработчики для ВСЕХ типов ссылок
    allLinkTypes.forEach(typeConfig => {
      // А. Для ссылок в тексте
      document.querySelectorAll('.' + typeConfig.textClass).forEach(link => {
        const number = link.getAttribute('data-' + typeConfig.dataAttr);
        if (!number) return;

        // Наведение мыши
        link.addEventListener('mouseenter', function() {
          highlightLink(typeConfig, number);
        });

        // Уход мыши
        link.addEventListener('mouseleave', function() {
              setTimeout(() => {
        unhighlightAll();
    }, 5000);
        });

        // Клик
        link.addEventListener('click', function(e) {
          e.preventDefault();
          highlightLink(typeConfig, number);
        });
      });

      // Б. Для карточек в правой колонке
      document.querySelectorAll('.' + typeConfig.itemClass).forEach(card => {
        const number = card.getAttribute('data-' + typeConfig.dataAttr);
        if (!number) return;

        // Наведение мыши
        card.addEventListener('mouseenter', function() {
          highlightLink(typeConfig, number);
        });

        // Уход мыши
        card.addEventListener('mouseleave', function() {
          unhighlightAll();
        });
      });
    });



    console.log('Синхронная подсветка настроена для типов:',
      allLinkTypes.map(t => t.textClass).join(', '));
  }, 400); // Задержка чуть больше
})();

// ============================================
// ПОДСВЕТКА И ФОКУС НА КАРТОЧКЕ ПРИ ЯКОРЕ
// ============================================

// Прокрутка к карточке после возврата


  });

// ============================================
// ФИКС ДЛЯ РАЗНЫХ РЕГИСТРОВ
// ============================================

(function() {
    // Проверяем оба варианта регистра
    const isLegalPage =
        window.location.pathname.includes('/legal_field/') ||
        window.location.pathname.includes('/Legal_field/');

    if (isLegalPage) {
        console.log('LEGAL FIX: Это legal страница (любой регистр)');

        function fixLegalCards() {
            const hash = window.location.hash;
            if (!hash || !hash.startsWith('#card-')) return;

            const cardId = hash.substring(6);
            const card = document.getElementById('card-' + cardId);

            if (card) {
                console.log('LEGAL FIX: Раскрываем карточку', cardId);

                const full = card.querySelector('.source-item-full');
                const short = card.querySelector('.source-item-short');

                if (full && short) {
                    full.style.display = 'block';
                    short.style.display = 'none';

                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        }

        // Запускаем несколько раз
        document.addEventListener('DOMContentLoaded', fixLegalCards);
        setTimeout(fixLegalCards, 300);
        setTimeout(fixLegalCards, 1000);
    }
})();

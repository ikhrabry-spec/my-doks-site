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

  console.log('Тип страницы:', isTocPage ? 'Оглавление' : isSidebarSourcesPage ? 'Источники в боковой панели' : isMainSourcesPage ? 'Полный список источников' : 'Другая');

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
  function setMainSourcesDisplay(mode) {
    if (!mainSourcesList) return;

    if (mode === 'expanded') {
      mainSourcesList.classList.remove('compact');
      mainSourcesList.classList.add('expanded');
      if (listIcon) listIcon.style.display = 'block';
      if (descIcon) descIcon.style.display = 'none';
    } else {
      mainSourcesList.classList.remove('expanded');
      mainSourcesList.classList.add('compact');
      if (listIcon) listIcon.style.display = 'none';
      if (descIcon) descIcon.style.display = 'block';
    }
    localStorage.setItem('mainSourcesDisplayMode', mode);
  }

  function toggleMainSourcesDisplay() {
    const currentMode = localStorage.getItem('mainSourcesDisplayMode') || 'compact';
    const newMode = currentMode === 'compact' ? 'expanded' : 'compact';
    setMainSourcesDisplay(newMode);
  }

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

    // Вызов updateListIndicators с обработкой готовности
    setTimeout(function() {
        if (window.updateListIndicatorsReady) {
            // Если функция уже готова, вызываем её
            if (window.updateListIndicators && typeof window.updateListIndicators === 'function') {
                window.updateListIndicators();
                console.log('Вызвана функция updateListIndicators');
            }
        } else {
            // Если функция еще не готова, ждем события о её готовности
            console.log('Функция еще не готова, ждем события updateListIndicatorsReady');

            window.addEventListener('updateListIndicatorsReady', function handler() {
                // Удаляем обработчик после первого срабатывания
                window.removeEventListener('updateListIndicatorsReady', handler);

                if (window.updateListIndicators && typeof window.updateListIndicators === 'function') {
                    window.updateListIndicators();
                    console.log('Вызвана функция updateListIndicators после события готовности');
                } else {
                    console.error('Функция updateListIndicators все еще не найдена после события');
                }
            });
        }
    }, 10);
}

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
    console.log('Страница с полным списком источников - настраиваем обработчик');

    // Устанавливаем компактный режим по умолчанию
    setMainSourcesDisplay('compact');
    console.log('Изначальное состояние установлено на: компактное');

    // Прикрепляем слушатель к кнопке
    toggleButton.addEventListener('click', toggleMainSourcesDisplay);

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
    console.log('Другая страница - кнопка не активна');
    toggleButton.disabled = true;
    toggleButton.title = 'Эта функция недоступна на данной странице';
  }

  // --- Функционал для выделения и прокрутки источника по клику на сноску ---
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
          unhighlightAll();
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
          unhighlightAll();
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

document.addEventListener('DOMContentLoaded', function() {
  const expandAllButton = document.querySelector('.docs-sidebar .expand-all-menu');
  let isExpanded = false;
  let timeoutIds = [];

  // Улучшенная функция для пометки подменю, содержащего активную страницу
  function markActiveMenus() {
    console.log('Помечаем активные меню...');

    // Сначала удаляем все старые пометки
    document.querySelectorAll('.docs-sidebar details').forEach(detail => {
      detail.classList.remove('has-active-child');
    });

    // Ищем активные элементы - не только ссылки, но и li с классом active
    const activeElements = document.querySelectorAll('.docs-sidebar .active');
    console.log('Найдено активных элементов:', activeElements.length);

    activeElements.forEach(element => {
      console.log('Обрабатываем активный элемент:', element);

      // Находим ссылку, связанную с активным элементом
      let link = element;
      if (element.tagName === 'LI') {
        link = element.querySelector('a');
      }

      if (link && link.tagName === 'A') {
        console.log('Обрабатываем активную ссылку:', link.href);

        // Находим все родительские details и помечаем их как содержащие активную страницу
        let parentElement = link.closest('details');
        while (parentElement) {
          console.log('Помечаем родительский элемент:', parentElement);
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

  // Очистка всех таймаутов
  function clearAllTimeouts() {
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];
  }

  // Обработка клика по заголовкам первого уровня
  document.querySelectorAll('.docs-sidebar details summary').forEach(summary => {
    const link = summary.querySelector('.section-title-link');

    if (link) {
      link.addEventListener('click', function(e) {
        const details = summary.parentElement;
        if (!details.hasAttribute('open')) {
          details.setAttribute('open', 'open');
        }
        // Закрываем другие меню, но не активные
        document.querySelectorAll('.docs-sidebar details').forEach(detail => {
          if (detail !== details && !detail.contains(details) && !isActiveMenu(detail)) {
            detail.removeAttribute('open');
          }
        });
      });
    }
  });

  // Вызываем функцию пометки активных меню с задержкой
  setTimeout(markActiveMenus, 100);

  // Обработчики наведения только для неактивных меню
  document.querySelectorAll('.docs-sidebar details').forEach(details => {
    // Пропускаем активные меню - они не должны реагировать на наведение
    if (isActiveMenu(details)) return;

    let timeoutId;

    details.addEventListener('mouseenter', function() {
      if (!isExpanded) {
        clearTimeout(timeoutId);
        openTimeout = setTimeout(() => {
          this.classList.remove('closing');
          this.setAttribute('open', 'open');
        }, 300); // Задержка перед открытием
      }
    });

    details.addEventListener('mouseleave', function() {
      if (!isExpanded && !isActiveMenu(this)) { // Добавляем проверку isActiveMenu
        clearTimeout(openTimeout); // Очищаем таймер открытия
        const currentDetails = this;
        closeTimeout = setTimeout(() => {
          isAnimating = true; // Флаг установлен, анимация началась
            // Медленное закрытие
          currentDetails.classList.add('closing');

        // После завершения анимации закрытия
        setTimeout(() => {
          if (!isActiveMenu(currentDetails)) {
            currentDetails.removeAttribute('open');
            currentDetails.classList.remove('closing');
            isAnimating = false; // Анимация завершена, флаг сброшен
          }
        }, 5000); // 5 секунд - время анимации
        }, 200);
        timeoutIds.push(timeoutId);
      }
    });
  });

  // Функциональность стрелочки раскрытия всех меню
  if (expandAllButton) {
    expandAllButton.addEventListener('click', function() {
      isExpanded = !isExpanded;
      const allDetails = document.querySelectorAll('.docs-sidebar details');


      if (isExpanded) {
        if (isAnimating) { // Проверяем, идёт ли анимация
        // Раскрываем все меню
        // Добавляем задержку перед открытием.
        // Это даст время любым текущим анимациям закрытия завершиться.
          setTimeout(() => {
            allDetails.forEach(detail => {
              detail.setAttribute('open', 'open');
            });
        }, 5000); // 500 мс - достаточное время для завершения анимации
        } else {
          allDetails.forEach(detail => {
            detail.setAttribute('open', 'open');
          });
        }

      } else {
        // Сворачиваем только неактивные меню
        allDetails.forEach(detail => {
          if (!isActiveMenu(detail)) {
            detail.removeAttribute('open');
          }
        });
      }

      this.classList.toggle('expanded');
    });
  }

  // Защита активных меню: если активное меню было закрыто, немедленно открываем его
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
        const detail = mutation.target;
        if (isActiveMenu(detail) && !detail.hasAttribute('open')) {
          // Немедленно открываем активное меню обратно
          detail.setAttribute('open', 'open');
        }
      }
    });
  });

  // Начинаем наблюдение за изменениями атрибута open
  document.querySelectorAll('.docs-sidebar details').forEach(detail => {
    observer.observe(detail, { attributes: true });
  });
});

// Код для окрашивания выделенных заголовков в правой колонке
document.addEventListener('DOMContentLoaded', function() {
  const tocLinks = document.querySelectorAll('#TableOfContents a');

  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // 1. Remove the 'active' class from all elements
      document.querySelectorAll('#TableOfContents a.active').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6').forEach(el => el.classList.remove('active'));

      // 2. Add the 'active' class instantly to the clicked link
      this.classList.add('active');
      const targetId = this.getAttribute('href').substring(1);
      const targetHeader = document.getElementById(targetId);

      if (targetHeader) {
        targetHeader.classList.add('active');
      }

      // 3. Set a timeout to remove the 'active' class after the delay,
      // which will trigger the fade transition back to black.
      setTimeout(() => {
        this.classList.remove('active');
        if (targetHeader) {
          targetHeader.classList.remove('active');
        }
      }, 2000 + 15000); // 2-second delay + 15-second transition
    });
  });

    const allSourceItems = document.querySelectorAll('.source-item');
allSourceItems.forEach(item => {
    item.addEventListener('click', (event) => {
        // Предотвращаем переход по ссылке, если клик был на заголовке
        if (event.target.tagName === 'A' || event.target.closest('a')) {
            return;
        }
        item.classList.toggle('is-expanded');
    });
});
});

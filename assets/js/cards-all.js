// ГАРАНТИРОВАННО РАБОЧИЙ КОД ДЛЯ ВСЕХ ТИПОВ КАРТОЧЕК
(function() {
  // Ждём полной загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCards);
  } else {
    // DOM уже загружен
    setTimeout(initCards, 100);
  }

  function initCards() {
    console.log('=== ИНИЦИАЛИЗАЦИЯ КАРТОЧЕК ===');

    // 1. Функция для настройки одного типа карточек
    function setupCardType(itemClass, fullClass, shortClass) {
      const items = document.querySelectorAll('.' + itemClass);
      console.log(`Найдено ${items.length} элементов класса ${itemClass}`);

      items.forEach(item => {
        // Удаляем старый обработчик если есть
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);

        // Добавляем новый обработчик
        newItem.addEventListener('click', function(e) {
          // Не блокируем клики по ссылкам
          if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
          }

          console.log(`Клик по ${itemClass}`);
          const full = this.querySelector('.' + fullClass);
          const short = this.querySelector('.' + shortClass);

          if (full && short) {
            if (full.style.display === 'none') {
              full.style.display = 'block';
              short.style.display = 'none';
              this.classList.add('expanded');
            } else {
              full.style.display = 'none';
              short.style.display = 'block';
              this.classList.remove('expanded');
            }
          }
        });

        // Визуальные подсказки
        newItem.style.cursor = 'pointer';
        newItem.style.position = 'relative';
      });
    }

    // 2. Настраиваем ВСЕ типы карточек
    setupCardType('source-item', 'source-item-full', 'source-item-short');
    setupCardType('publication-item', 'publication-item-full', 'publication-item-short');
    setupCardType('company-item', 'company-item-full', 'company-item-short');
    setupCardType('patent-item', 'patent-item-full', 'patent-item-short');
    setupCardType('legal-item', 'legal-item-full', 'legal-item-short');
    setupCardType('test', 'test-full', 'test-short');

    // 3. Глобальная кнопка toggle
    const toggleButton = document.getElementById('toggle-cards-button');
    if (toggleButton && !toggleButton.hasAttribute('data-cards-initialized')) {
      toggleButton.addEventListener('click', function() {
        console.log('Глобальная кнопка toggle');

        // Определяем текущее состояние
        const firstItem = document.querySelector('.source-item, .publication-item, .company-item, .patent-item, .legal-item, .test-item');
        let expandAll = true;

        if (firstItem) {
          const fullSelectors = ['.source-item-full', '.publication-item-full', '.company-item-full, .patent-item-full, .legal-item-full, .test-item-full'];
          for (const selector of fullSelectors) {
            const full = firstItem.querySelector(selector);
            if (full && full.style.display !== 'none') {
              expandAll = false;
              break;
            }
          }
        }

        // Переключаем все карточки
        const allItems = document.querySelectorAll('.source-item, .publication-item, .company-item, .patent-item, .legal-item, .test-item');
        allItems.forEach(item => {
          const fullSelectors = ['.source-item-full', '.publication-item-full', '.company-item-full', '.patent-item-full', '.legal-item-full', '.test-item-full'];
          const shortSelectors = ['.source-item-short', '.publication-item-short', '.company-item-short', '.patent-item-short', '.legal-item-short', '.test-item-short'];

          for (let i = 0; i < fullSelectors.length; i++) {
            const full = item.querySelector(fullSelectors[i]);
            const short = item.querySelector(shortSelectors[i]);

            if (full && short) {
              if (expandAll) {
                full.style.display = 'block';
                short.style.display = 'none';
                item.classList.add('expanded');
              } else {
                full.style.display = 'none';
                short.style.display = 'block';
                item.classList.remove('expanded');
              }
              break;
            }
          }
        });

        // Переключаем иконки
        const listIcon = document.getElementById('list-icon');
        const descIcon = document.getElementById('desc-icon');

        if (listIcon && descIcon) {
          listIcon.style.display = expandAll ? 'block' : 'none';
          descIcon.style.display = expandAll ? 'none' : 'block';
        }
      });

      toggleButton.setAttribute('data-cards-initialized', 'true');
    }

    console.log('=== КАРТОЧКИ ИНИЦИАЛИЗИРОВАНЫ ===');
  }
})();

/* attribute-filter.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Critical Elements
    const filterContent = document.getElementById('attribute-filter-content');
    const headerToggleButton = document.getElementById('filter-attribute-ui');
    const toggleHideButton = document.getElementById('toggle-hide-btn');

    // --------------------------------------------------------------------------------
    // ✅ ЛОГИКА ДЛЯ КНОПКИ В ШАПКЕ (Показ/Скрытие главного контейнера)
    // --------------------------------------------------------------------------------
    if (filterContent && headerToggleButton) {
        headerToggleButton.addEventListener('click', () => {
            filterContent.classList.toggle('d-none');
        });
    }

    // --------------------------------------------------------------------------------
    // ✅ ЛОГИКА ДЛЯ КНОПКИ "СКРЫТЬ" ВНУТРИ ФИЛЬТРА
    // --------------------------------------------------------------------------------
    if (toggleHideButton && filterContent) {
        toggleHideButton.addEventListener('click', () => {
            filterContent.classList.add('d-none');
        });
    }

    const controlsWrapper = document.getElementById('attribute-controls-wrapper');
    const filterableItems = document.querySelectorAll('#sources-list .filterable-item');

    if (!controlsWrapper || filterableItems.length === 0) {
        return;
    }

    const checkboxes = controlsWrapper.querySelectorAll('.attribute-filter-checkbox');
    const resetButton = document.getElementById('reset-filter-btn');

    // 2. Main Filtering Logic (AND between groups, OR within a group)
    function applyAttributeFilter() {
        const activeFilters = {};
        const activeLabels = [];

        // D. Элемент для отображения сводки
        const activeFiltersListElement = document.getElementById('active-filters-list');

    // ⭐ ДОБАВЬТЕ ОТЛАДКУ
    console.log('activeFiltersListElement:', activeFiltersListElement);


        // A. Collect active filters, grouped by attribute key
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const key = checkbox.getAttribute('data-attribute-key');
                if (!activeFilters[key]) {
                    activeFilters[key] = [];
                }
                activeFilters[key].push(checkbox.value.toLowerCase());

                // ⭐ ИСПРАВЛЕННАЯ ЛОГИКА: Сбор чистой метки (label)
                const labelElement = checkbox.closest('label');
                if (labelElement) {
                    let labelText = '';
                    let node = checkbox.nextSibling;
                    while (node) {
                        if (node.nodeType === 3 && node.textContent.trim().length > 0) {
                            labelText = node.textContent.trim();
                            break;
                        }
                        node = node.nextSibling;
                    }
                //⭐ ОТЛАДКА: что собирается в labelText
                console.log('Checkbox checked, labelText found:', labelText);

                    if (labelText) {
                        activeLabels.push(labelText);
                    }
                }
            }
        });

     // ⭐ ОТЛАДКА: что в итоге собралось
    console.log('Active labels collected:', activeLabels);
    console.log('Active filters:', activeFilters);

        // Get only the groups that have at least one checked box
        const activeGroupsKeys = Object.keys(activeFilters);
        let visibleCount = 0;

        // B. Iterate over filterable items
        filterableItems.forEach(item => {

                // ⭐ ИСПРАВЛЕННЫЙ ПАРСИНГ:
    let itemDataAttributes = {};
    try {
        const attributesData = item.getAttribute('data-attributes');
        if (attributesData && attributesData !== 'null') {
            itemDataAttributes = JSON.parse(attributesData);
        }
    } catch (e) {
        console.warn('Error parsing data-attributes for item:', item, e);
        itemDataAttributes = {};
    }

            const itemContentTags = item.getAttribute('data-content')
                                       .split(' ')
                                       .filter(tag => tag.length > 0)
                                       .map(tag => tag.toLowerCase());

            let matchesAllGroups = true;

            if (activeGroupsKeys.length === 0) {
                matchesAllGroups = true;
            } else {
                // 2. Logic: Item must match at least one filter in EACH active group
                for (const key of activeGroupsKeys) {
                    const groupFilters = activeFilters[key];
                    let matchesGroup = false;

                    // ⭐ УЛУЧШЕННАЯ ЛОГИКА: Проверяем оба источника данных
                    for (const filterValue of groupFilters) {
                        const pureFilterValue = filterValue.split('_').pop();

                        // Проверка 1: В data-attributes (массивы и строки)
                        const itemAttributeValue = itemDataAttributes[key];
                        if (itemAttributeValue) {
                            if (Array.isArray(itemAttributeValue)) {
                                // Для массивов
                                if (itemAttributeValue.includes(pureFilterValue)) {
                                    matchesGroup = true;
                                    break;
                                }
                            } else if (typeof itemAttributeValue === 'string') {
                                // Для строк
                                if (itemAttributeValue === pureFilterValue) {
                                    matchesGroup = true;
                                    break;
                                }
                            }
                        }

                        // Проверка 2: В data-content (обратная совместимость)
                        if (itemContentTags.includes(filterValue)) {
                            matchesGroup = true;
                            break;
                        }
                    }

                    if (!matchesGroup) {
                        matchesAllGroups = false;
                        break;
                    }
                }
            }

            // C. Apply visibility
            if (matchesAllGroups) {
                item.style.display = 'list-item';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // ⭐ D. Обновление сводки активных фильтров
        if (activeFiltersListElement) {
            if (activeLabels.length > 0) {
                activeFiltersListElement.innerHTML = activeLabels.join('; ');
            } else {
                activeFiltersListElement.textContent = 'None';
            }
        }

        // ⭐ Сохранение логики свернутого состояния
        updateCollapsedStateSummary(activeLabels);
    }

    // ⭐ ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ СВЕРНУТОГО СОСТОЯНИЯ
    function updateCollapsedStateSummary(activeLabels) {
        const activeFiltersSummary = document.getElementById('active-filters-summary');
        const filterTitleElement = document.querySelector('.filter-title');

        if (activeFiltersSummary && filterTitleElement) {
            if (activeLabels.length > 0) {
                activeFiltersSummary.textContent = activeLabels.join('; ');
                activeFiltersSummary.style.display = 'block';
            } else {
                activeFiltersSummary.style.display = 'none';
            }
        }
    }

    // 3. Setup Listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyAttributeFilter);
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            applyAttributeFilter();
        });
    }

    // ⭐ ИНИЦИАЛИЗАЦИЯ КНОПКИ СВЕРТЫВАНИЯ
    const collapseBtn = document.getElementById('toggle-collapse-btn');
    if (collapseBtn) {
        collapseBtn.addEventListener('click', toggleCollapse);
    }

    // Initial run to ensure correct state on page load
    applyAttributeFilter();
});

// --- ФУНКЦИЯ СВЕРТЫВАНИЯ/РАЗВЕРТЫВАНИЯ ---
const toggleCollapse = () => {
    const wrapper = document.getElementById('attribute-controls-wrapper');
    const toggleButton = document.getElementById('toggle-collapse-btn');
    const menuBody = document.getElementById('attribute-menu-body');
    const activeFiltersSummary = document.getElementById('active-filters-summary');
    const filterTitleElement = wrapper ? wrapper.querySelector('.filter-title') : null;

    if (!wrapper || !toggleButton || !menuBody) {
        console.error("Элементы для свертывания/развертывания не найдены.");
        return;
    }

    // Переключаем класс на главном контейнере
    wrapper.classList.toggle('collapsed');

    // Проверяем новое состояние
    const isCollapsed = wrapper.classList.contains('collapsed');

    // Переключаем класс на самой кнопке
    toggleButton.classList.toggle('collapsed');

    // Напрямую скрываем/показываем список чекбоксов
    menuBody.classList.toggle('is-collapsed');

    // ⭐ ЛОГИКА СМЕНЫ ЗАГОЛОВКА
    if (filterTitleElement) {
        if (isCollapsed) {
            filterTitleElement.textContent = 'Active Filters:';
        } else {
            filterTitleElement.textContent = 'Filter by Attribute:';
        }
    }
};

console.log("Bilingual Search Controls initialized");

// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ ДОСТУПА ИЗ ФУНКЦИЙ
let clearBtn = null;
let searchBlock = null;
let searchInput = null;
let searchResultsContainer = null;
let searchPagination = null;
let filterRemoveBtn = null;

// ⭐ НОВЫЕ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ Attribute Filter
window.activeAttributeFilter = null;
// --- НОВЫЕ ПЕРЕМЕННЫЕ ДЛЯ Attribute Filter ---
let attributeFilterSelect = null;
let filterAttributeRemoveBtn = null;
const mainContentSelector = '.docs-content.col-lg-6.col-xl-6.title-center';
// -----------------------------------------------------

// --- НОВЫЙ БЛОК: ФУНКЦИИ АТРИБУТНОГО ФИЛЬТРА ---

/**
 * Применяет атрибутный фильтр: показывает/скрывает элементы на странице.
 * Элементы, которые нужно фильтровать, должны иметь атрибут data-attribute-filter.
 * @param {string} filterValue - Значение атрибута для фильтрации (или пустая строка для сброса).
 */
const applyAttributeFilter = (filterValue) => {
    const container = document.querySelector(mainContentSelector);
    if (!container) return;

    window.activeAttributeFilter = filterValue || null;
    const filterActive = !!filterValue;

    // Обновляем видимость кнопки сброса (FilterAttributeRemoveBtn)
    if (filterAttributeRemoveBtn) {
        filterAttributeRemoveBtn.classList.toggle('d-none', !filterActive);
    }

    const elementsToFilter = container.querySelectorAll('[data-attribute-filter]');
    let hasVisibleResults = false;

    if (!filterActive) {
        // Режим сброса: показываем все элементы
        window.showAllContent();
        elementsToFilter.forEach(element => {
            element.style.display = '';
        });
        window.hideNoResultsMessage();
        return;
    }

    // Режим фильтрации: показываем только совпадения
    elementsToFilter.forEach(element => {
        const elementFilterValue = element.getAttribute('data-attribute-filter');
        const isMatch = elementFilterValue && elementFilterValue.includes(filterValue);

        if (isMatch) {
            element.style.display = '';
            // Показываем всех родительских элементов, чтобы совпадение было видно
            if (window.showParentElements) window.showParentElements(element, container);
            hasVisibleResults = true;
        } else {
            element.style.display = 'none';
        }
    });

    // Управляем сообщением о результатах
    if (window.showNoResultsMessage) {
        window.showNoResultsMessage(hasVisibleResults, `Attribute: ${filterValue}`, container);
    }
};

/**
 * Обработчик изменения значения в <select> для атрибутного фильтра.
 */
const handleAttributeSelectChange = () => {
    const filterValue = attributeFilterSelect.value;
    applyAttributeFilter(filterValue);
    // После применения фильтра нужно убедиться, что основной UI поиска обновлен
    window.updateFilterControlsVisibility(window.state.mode, window.state.query, window.activeAttributeFilter);
};

/**
 * Обработчик клика по кнопке сброса атрибутного фильтра.
 */
const handleAttributeFilterRemove = () => {
    if (attributeFilterSelect) {
        attributeFilterSelect.value = ''; // Сброс <select>
        handleAttributeSelectChange(); // Применяем сброс
    }
};

// --- КОНЕЦ БЛОКА: ФУНКЦИИ АТРИБУТНОГО ФИЛЬТРА ---


// ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ СОХРАНЕНИЯ/ВОССТАНОВЛЕНИЯ СОСТОЯНИЯ
const saveSearchState = () => {
    if (searchInput) {
        const stateToSave = {
            query: searchInput.value,
            mode: window.state ? window.state.mode : 'page-highlight',
            fromSearchClick: true,
            timestamp: Date.now(),
            // ⭐ ИЗМЕНЕНИЕ 1: Добавляем состояние атрибутного фильтра
            attributeFilter: window.activeAttributeFilter || null
        };
        sessionStorage.setItem('searchState', JSON.stringify(stateToSave));
        console.log("Состояние поиска сохранено:", stateToSave);
    }
};

const restoreSearchState = () => {
    const savedState = sessionStorage.getItem('searchState');

    if (savedState) {
        const stateObj = JSON.parse(savedState);

        if (Date.now() - stateObj.timestamp > 30 * 1000) {
            sessionStorage.removeItem('searchState');
            return false;
        }

        if (stateObj.fromSearchClick && searchInput) {
            console.log("Восстанавливаем состояние поиска после клика:", stateObj);

            searchInput.value = stateObj.query;
            if (window.state) {
                window.state.mode = stateObj.mode;
                window.state.query = stateObj.query;
            }
            // ⭐ ИЗМЕНЕНИЕ 2: Восстанавливаем состояние атрибутного фильтра
            window.activeAttributeFilter = stateObj.attributeFilter || null;

            updateActiveModeInMenu(stateObj.mode);

            // ⭐ ИЗМЕНЕНИЕ 3: Используем новую общую функцию для обновления UI
            window.updateFilterControlsVisibility(window.state.mode, window.state.query, window.activeAttributeFilter);

            // ⭐ НОВЫЙ БЛОК: При восстановлении состояния применяем атрибутный фильтр
            if (stateObj.mode === 'filter-attribute' && stateObj.attributeFilter) {
                setTimeout(() => {
                    applyAttributeFilter(stateObj.attributeFilter);
                    if (attributeFilterSelect) {
                        attributeFilterSelect.value = stateObj.attributeFilter;
                    }
                }, 150); // Небольшая задержка, чтобы DOM успел прогрузиться
            }

            /* ⭐ УДАЛЕННЫЙ КОД (ЗАКОММЕНТИРОВАН)
            if (clearBtn) {
                clearBtn.style.display = (stateObj.mode !== 'filter-text' && stateObj.query.length > 0) ? 'block' : 'none';
            }
            if (filterRemoveBtn) {
                filterRemoveBtn.style.display = (stateObj.mode === 'filter-text' && stateObj.query.length > 0) ? 'block' : 'none';
            }

            if (stateObj.mode === 'site' && searchResultsContainer) {
                searchResultsContainer.style.display = 'block';
                if (searchBlock) searchBlock.classList.add('site-search-active');
            }
            */
            // ------------------------------------

            if (stateObj.query.trim().length > 0) {
                setTimeout(() => {
                    if (window.runSearch) {
                        window.runSearch();
                    }
                }, 100);
            }

            sessionStorage.removeItem('searchState');
            return true;
        }
    }
    return false;
};

// ГЛОБАЛЬНАЯ ФУНКЦИЯ: Обновляет активный режим в выпадающем меню
const updateActiveModeInMenu = (mode) => {
    const searchModeList = document.getElementById('search-mode-list');
    if (searchModeList) {
        searchModeList.querySelectorAll('li').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.mode === mode) {
                item.classList.add('active');
            }
        });
    }
};
window.updateActiveModeInMenu = updateActiveModeInMenu;

// ГЛОБАЛЬНАЯ ФУНКЦИЯ: Управляет видимостью всех контролов в хедере
const updateFilterControlsVisibility = (mode, query, activeAttributeFilter) => {
    const filterAttributeUi = document.getElementById('filter-attribute-ui');
    // const filterAttributeRemoveBtn = document.getElementById('filter-attribute-remove-btn'); // ИСПОЛЬЗУЕМ ЛОКАЛЬНЫЙ (в начале файла)

    // 1. Управление текстовыми кнопками (Clear / Filter-Remove)
    if (clearBtn) {
        // 'Крестик' (Clear) виден в режимах page-highlight/site (при наличии запроса) и если не активен атрибутный фильтр
        clearBtn.style.display = (mode === 'page-highlight' || mode === 'site') && query.length > 0 && !activeAttributeFilter ? 'block' : 'none';
    }

    if (filterRemoveBtn) {
        // Универсальная кнопка сброса (для filter-text) видна только в режиме filter-text
        filterRemoveBtn.style.display = mode === 'filter-text' && query.length > 0 ? 'block' : 'none';
    }

    // 2. Управление UI атрибутного фильтра
    if (filterAttributeUi) {
        // Показываем UI фильтра, только если мы в режиме 'filter-attribute'
        filterAttributeUi.classList.toggle('d-none', mode !== 'filter-attribute');
    }

    if (filterAttributeRemoveBtn) {
        // Показываем кнопку сброса атрибутного фильтра, только если активен сам фильтр
        // Кнопка filter-remove-btn в attribute-filter.js будет управлять видимостью
        filterAttributeRemoveBtn.classList.toggle('d-none', mode !== 'filter-attribute' || !activeAttributeFilter);
    }

    // 3. Управление пагинацией (для page-highlight)
    if (searchPagination) {
        searchPagination.style.display = mode === 'page-highlight' && window.state.foundElements.length > 0 ? 'flex' : 'none';
    }

    // 4. Управление контейнером результатов (для site)
    if (searchResultsContainer) {
        searchResultsContainer.style.display = mode === 'site' && query.length > 0 ? 'block' : 'none';
    }

    // 5. Управление общим блоком (для site)
    if (searchBlock) {
        searchBlock.classList.toggle('site-search-active', mode === 'site' && query.length > 0);
    }
};
window.updateFilterControlsVisibility = updateFilterControlsVisibility; // Делаем глобальной


document.addEventListener('click', (event) => {
    const link = event.target.closest('.search-result-link');
    if (link && link.getAttribute('href') && link.closest('.search-result-item') && !link.closest('.no-results')) {
        console.log("Клик по результату поиска, сохраняем состояние...");
        saveSearchState();
    }
});

// =========================================================
// ⭐ НОВЫЙ БЛОК: ФУНКЦИЯ ПРОВЕРКИ РАЗДЕЛА
// =========================================================
const isReferencePage = () => {
    const path = window.location.pathname.toLowerCase();
    return path.includes('/reference-books/') ||
           path.endsWith('/reference-books') ||
           path.includes('/referencebooks/') ||
           path.endsWith('/referencebooks');
};
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    searchBlock = document.querySelector('.search-block');
    searchInput = document.getElementById('search-input');
    const searchModeToggle = document.getElementById('search-mode-toggle');
    const searchModeDropdown = document.getElementById('search-mode-dropdown');
    const searchModeList = document.getElementById('search-mode-list');
    searchPagination = document.getElementById('search-pagination');
    const searchIndicator = document.getElementById('search-indicator');
    clearBtn = document.getElementById('clear-search-btn');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsList = document.querySelector('.search-results-list');
    filterRemoveBtn = document.getElementById('filter-remove-btn');

    // ⭐ НОВЫЙ КОД: ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ АТРИБУТНОГО ФИЛЬТРА
    attributeFilterSelect = document.getElementById('attribute-filter-select');
    filterAttributeRemoveBtn = document.getElementById('filter-attribute-remove-btn');
    // КОНЕЦ НОВОГО КОДА

    // ⭐ НОВЫЙ КОД: ИНИЦИАЛИЗАЦИЯ ДЛЯ УСЛОВНОГО ОТОБРАЖЕНИЯ ФИЛЬТРА
    const filterAttributeMenuItem = document.getElementById('filter-mode-menu-item');

    if (filterAttributeMenuItem) {
        if (!isReferencePage()) {
            filterAttributeMenuItem.style.display = 'none';
        } else {
            filterAttributeMenuItem.style.display = '';
        }
    }
    // КОНЕЦ НОВОГО КОДА

    let pagesIndex = [];
    let isIndexLoaded = false;

    window.state = {
        mode: 'page-highlight',
        query: '',
        foundElements: [],
        currentIndex: -1
    };

    const escapeRegex = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const escapeHtml = (unsafe) => {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const highlightMatches = (text, query) => {
        if (!text || !query) return text;

        try {
            const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
            return text.replace(regex, '<mark class="search-highlight">$1</mark>');
        } catch (e) {
            return text;
        }
    };

    const formatUriToBreadcrumbs = (uri) => {
        if (!uri) return '';
        let path = uri.replace(/^\/|\/$/g, '');
        const parts = path.split('/').filter(part => part.length > 0);
        const formattedParts = parts.map(part => {
            let formatted = part.replace(/-/g, ' ');
            formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
            return formatted;
        });
        return formattedParts.join(' / ');
    };

    const loadSearchIndex = async () => {
        try {
            const response = await fetch('/search.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            pagesIndex = data.docs || [];
            isIndexLoaded = true;
            console.log("Загружено документов для простого поиска:", pagesIndex.length);
        } catch (error) {
            console.error('Ошибка загрузки поискового индекса:', error);
        }
    };

    window.runSearch = () => {
    console.log('RS: Вход в runSearch. Текущий режим:', window.state.mode);
        const query = searchInput.value.trim();
        window.state.query = query;

        // ⭐ ИЗМЕНЕНИЕ 4: Используем общую функцию для обновления UI
        window.updateFilterControlsVisibility(window.state.mode, query, window.activeAttributeFilter);

        /* ⭐ УДАЛЕННЫЙ КОД (ЗАКОММЕНТИРОВАН)
        if (clearBtn) {
            clearBtn.style.display = (window.state.mode !== 'filter-text' && query.length > 0) ? 'block' : 'none';
        }
        if (filterRemoveBtn) {
            filterRemoveBtn.style.display = (window.state.mode === 'filter-text' && query.length > 0) ? 'block' : 'none';
        }
        */
        // ------------------------------------

        if (window.state.mode === 'filter-text') {
            // ⭐ ПЕРЕНЕСЕННАЯ ФУНКЦИЯ: filterPageContent
            if (window.filterPageContent) {
                 window.filterPageContent(query);
            }
            // filterPageContent(query); // <-- ИСХОДНЫЙ ВЫЗОВ
            return;
        }


        if (query.length === 0) {
            removeHighlights();
            window.state.foundElements = [];
            window.state.currentIndex = -1;
            if (searchPagination) searchPagination.style.display = 'none';
            updateIndicator();
            if (searchResultsContainer) searchResultsContainer.style.display = 'none';
            return;
        }

        handlePageHighlight(query);

        if (window.state.mode === 'site') {
            runSiteSearch(query);
        }
    };

    const handlePageHighlight = (query) => {
        removeHighlights();
        const mainContent = document.querySelector('body');
        const textNodes = getTextNodes(mainContent);
        window.state.foundElements = [];

        textNodes.forEach(node => {
            if (node.parentNode && (node.parentNode.closest('.header') || node.parentNode.closest('.sidebar') || node.parentNode.closest('.footer') || node.parentNode.closest('nav'))) {
                return;
            }

            const nodeText = node.nodeValue;
            const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const matches = [...nodeText.matchAll(regex)];

            if (matches.length > 0) {
                let lastIndex = 0;
                const parent = node.parentNode;
                const fragment = document.createDocumentFragment();

                matches.forEach(match => {
                    if (match.index > lastIndex) {
                        fragment.appendChild(document.createTextNode(nodeText.substring(lastIndex, match.index)));
                    }
                    const span = document.createElement('span');
                    span.className = 'search-highlight';
                    span.textContent = match[0];
                    window.state.foundElements.push(span);
                    fragment.appendChild(span);
                    lastIndex = match.index + match[0].length;
                });

                if (lastIndex < nodeText.length) {
                    fragment.appendChild(document.createTextNode(nodeText.substring(lastIndex)));
                }
                parent.replaceChild(fragment, node);
            }
        });

        if (window.state.foundElements.length > 0) {
            window.state.currentIndex = 0;
            if (searchPagination) {
                searchPagination.style.display = 'flex';
            }
            updateIndicator();
            scrollToCurrentElement();
        } else {
            if (searchPagination) {
                searchPagination.style.display = 'none';
            }
            updateIndicator();
        }
    };

    const runSiteSearch = (query) => {
        if (!isIndexLoaded || pagesIndex.length === 0) {
            console.log('Поисковый индекс не загружен');
            displayNoResults(query);
            return;
        }

        const queryLower = query.toLowerCase();
        const results = pagesIndex.filter(doc => {
            const searchText = `${doc.title || ''} ${doc.content || ''}`.toLowerCase();
            return searchText.includes(queryLower);
        });

        if (results.length > 0) {
            displaySearchResults(results, query);
            if (searchResultsContainer) {
                searchResultsContainer.style.display = 'block';
            }
        } else {
            displayNoResults(query);
            if (searchResultsContainer) {
                searchResultsContainer.style.display = 'none';
            }
        }
    };

const displaySearchResults = (results, query) => {
    if (!searchResultsList) return;

    searchResultsList.innerHTML = ''; // Очистка списка перед новым поиском

    // ⭐ 1. Set для отслеживания УЖЕ ОТОБРАЖЕННЫХ комбинаций "Title + Breadcrumbs"
    const finalDisplayedKeys = new Set();

    // ⭐ 2. Массив для хранения всех преобразованных и не-дублированных результатов (для сортировки)
    const candidatesForDisplay = [];

    results.forEach((doc) => {
        let currentUri = doc.uri;
        let currentTitle = doc.title;
        let isYml = doc.isYml || false;

        // --- ЭТАП ПРЕОБРАЗОВАНИЯ URI и TITLE, и ИГНОРИРОВАНИЯ НЕЖЕЛАТЕЛЬНЫХ YML ---

        if (isYml) {
            const dataKeyFromUri = currentUri.split('/').filter(Boolean).pop();

            switch (dataKeyFromUri) {
                case 'companies':
                    currentTitle = 'Сompanies';
                    currentUri = '/docs/reference-books/companies/';
                    break;
                case 'sources':
                    currentTitle = 'Источники';
                    currentUri = '/docs/reference-books/sources/';
                    break;
                // Игнорируем ненужные YML-файлы
                case 'companies+':
                case 'companies_grouping':
                    return; // Полностью пропускаем этот результат
                default:
                    // Если у нас уже есть MD-страница с таким URI/Title, YML-запись будет отфильтрована дальше.
                    break;
            }
        }

        // --- ЭТАП ФИЛЬТРАЦИИ ДУБЛИКАТОВ ПО ОТОБРАЖАЕМОМУ КЛЮЧУ ---

        // Генерируем хлебные крошки для текущего (потенциально преобразованного) URI
        const currentBreadcrumbs = formatUriToBreadcrumbs(currentUri);

        // Создаем уникальный ключ, который ТОЧНО отражает то, как результат будет показан пользователю
        const displayKey = `${currentTitle} | ${currentBreadcrumbs}`;

        // Проверяем, был ли уже добавлен результат с таким DisplayKey
        if (finalDisplayedKeys.has(displayKey)) {
            // Если да, то это дубликат. Теперь решаем, что оставить.
            // Приоритет отдаем MD-страницам.
            const existingIndex = candidatesForDisplay.findIndex(item => item.displayKey === displayKey);
            if (existingIndex !== -1) {
                const existingItem = candidatesForDisplay[existingIndex];
                if (!isYml && existingItem.isYml) {
                    // Текущий - MD-страница, а уже существующий - YML.
                    // MD-страница имеет приоритет, заменяем YML-запись.
                    candidatesForDisplay[existingIndex] = {
                        uri: currentUri,
                        title: currentTitle,
                        breadcrumbs: currentBreadcrumbs,
                        isYml: isYml,
                        displayKey: displayKey,
                        originalDoc: doc // Сохраняем оригинальный doc, если нужно
                    };
                }
            }
            return; // Пропускаем текущий дубликат (если не заменили)
        }

        // Если DisplayKey еще не встречался, добавляем его в Set и в массив для последующей обработки
        finalDisplayedKeys.add(displayKey);
        candidatesForDisplay.push({
            uri: currentUri,
            title: currentTitle,
            breadcrumbs: currentBreadcrumbs, // Сохраняем для дальнейшего использования
            isYml: isYml,
            displayKey: displayKey,
            originalDoc: doc
        });
    });

    // --- ТРЕТИЙ ЭТАП: СОРТИРОВКА И ГЕНЕРАЦИЯ HTML ---

    // Сортируем окончательные результаты по title для стабильного порядка
    const sortedResults = candidatesForDisplay.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });

    if (sortedResults.length === 0) {
        displayNoResults(query);
        if (searchResultsContainer) {
            searchResultsContainer.style.display = 'none';
        }
        return;
    }

    sortedResults.forEach((finalResult) => {
        const uri = finalResult.uri;
        const title = finalResult.title;
        const breadcrumbs = finalResult.breadcrumbs; // Используем уже сгенерированные хлебные крошки

        const li = document.createElement('li');
        const highlightedTitle = highlightMatches(title, query);

        li.className = 'search-result-item';

        const breadcrumbsSuffix = breadcrumbs.length > 0 ? ` (${breadcrumbs})` : '';

        li.innerHTML = `<a href="${uri}" class="search-result-link"><span class="result-title">${highlightedTitle}</span><span class="result-breadcrumbs">${breadcrumbsSuffix}</span></a>`;

        searchResultsList.appendChild(li);
    });

    if (searchResultsContainer) {
        searchResultsContainer.style.display = 'block';
    }
};

    const displayNoResults = (query) => {
        if (!searchResultsList) return;

        searchResultsList.innerHTML = `
            <li class="no-results">
                <div class="no-results-message">
                    No results found for "<strong>${escapeHtml(query)}</strong>"
                </div>
                <div class="search-suggestions">
                    <p>Suggestions:</p>
                    <ul>
                        <li>Check the spelling</li>
                        <li>Try more general keywords</li>
                        <li>Try different keywords</li>
                    </ul>
                </div>
            </li>
        `;
    };

    const removeHighlights = () => {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(span => {
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize();
        });
    };

    const getTextNodes = (element) => {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: node =>
                    node.parentNode.tagName !== 'SCRIPT' &&
                    node.parentNode.tagName !== 'STYLE' &&
                    node.nodeValue.trim().length > 0
            }
        );
        const textNodes = [];
        let currentNode;
        while ((currentNode = walker.nextNode())) {
            textNodes.push(currentNode);
        }
        return textNodes;
    };

    const updateIndicator = () => {
        if (searchIndicator) {
            if (window.state.foundElements.length > 0) {
                searchIndicator.textContent = `${window.state.currentIndex + 1} of ${window.state.foundElements.length}`;
            } else {
                searchIndicator.textContent = '0 of 0';
            }
        }
    };

    const scrollToCurrentElement = () => {
        if (window.state.foundElements.length > 0 && window.state.currentIndex >= 0) {
            window.state.foundElements.forEach((el) => el.classList.remove('active'));
            window.state.foundElements[window.state.currentIndex].classList.add('active');
            window.state.foundElements[window.state.currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const showDropdown = () => {
        if (searchModeDropdown) {
            searchModeDropdown.style.display = 'block';
        }
    };

    const hideDropdown = () => {
        if (searchModeDropdown) {
            searchModeDropdown.style.display = 'none';
        }
    };

    const setupEventListeners = () => {
        loadSearchIndex();

        // ⭐ НОВЫЙ КОД: ОБРАБОТЧИКИ АТРИБУТНОГО ФИЛЬТРА
        if (attributeFilterSelect) {
            attributeFilterSelect.addEventListener('change', handleAttributeSelectChange);
        }
        if (filterAttributeRemoveBtn) {
            filterAttributeRemoveBtn.addEventListener('click', handleAttributeFilterRemove);
        }
        // КОНЕЦ НОВОГО КОДА

        if (searchInput) {
            searchInput.addEventListener('mouseenter', () => {
                if (searchInput.value === '') {
                    showDropdown();
                }
            });
        }

        if (searchModeToggle) {
            searchModeToggle.addEventListener('mouseenter', () => {
                showDropdown();
            });

            searchModeToggle.addEventListener('click', (event) => {
                event.stopPropagation();
                if (searchModeDropdown) {
                    searchModeDropdown.style.display =
                        searchModeDropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        }

        if (searchModeDropdown) {
            searchModeDropdown.addEventListener('mouseleave', () => {
                hideDropdown();
            });
        }

        if (searchModeList) {
            searchModeList.addEventListener('click', (event) => {
                const li = event.target.closest('li');
                if (li) {
                    const newMode = li.dataset.mode;
                    const currentQuery = searchInput ? searchInput.value : '';

                    searchModeList.querySelectorAll('li').forEach(item => {
                        item.classList.remove('active');
                    });
                    li.classList.add('active');

                    window.state.mode = newMode;

                    // ⭐ ИЗМЕНЕНИЕ 5: Сброс активного атрибутного фильтра при смене режима
                    if (newMode !== 'filter-attribute') {
                        window.activeAttributeFilter = null;
                        // Сбрасываем значение select, чтобы он не держал старое значение
                        if (attributeFilterSelect) {
                            attributeFilterSelect.value = '';
                        }
                    }

                    // --- Логика режимов (ОСНОВНЫЕ ИЗМЕНЕНИЯ ЗДЕСЬ) ---
                    // 1. Блок 'page-highlight'
                    if (newMode === 'page-highlight') {
                        // ✨ ДОБАВЛЕНО: Закрытие атрибутного фильтра
                        const filterContent = document.getElementById('attribute-filter-content');
                        if (filterContent) {
                            filterContent.classList.add('d-none');
                        }
                        if (window.showAllContent) window.showAllContent();
                        removeHighlights();
                        if (currentQuery.trim().length > 0) {
                            window.runSearch();
                        }
                    // 2. Блок 'site'
                    } else if (newMode === 'site') {
                        // ✨ ДОБАВЛЕНО: Закрытие атрибутного фильтра
                        const filterContent = document.getElementById('attribute-filter-content');
                        if (filterContent) {
                            filterContent.classList.add('d-none');
                        }
                        if (window.showAllContent) window.showAllContent();
                        removeHighlights();
                        if (currentQuery.trim().length > 0) {
                            window.runSearch();
                        }
                    // 3. Блок 'filter-text'
                    } else if (newMode === 'filter-text') {
                        // ✨ ДОБАВЛЕНО: Закрытие атрибутного фильтра
                        const filterContent = document.getElementById('attribute-filter-content');
                        if (filterContent) {
                            filterContent.classList.add('d-none');
                        }
                        removeHighlights();
                        if (currentQuery.trim().length > 0) {
                            window.runSearch();
                        } else {
                            if (window.showAllContent) window.showAllContent();
                        }
                    // 4. Блок 'filter-attribute' (открытие фильтра)
                    } else if (newMode === 'filter-attribute') {
                        // 1. Сброс всего контента и подсветки
                        removeHighlights();
                        if (window.showAllContent) window.showAllContent();

                        // 2. Сбрасываем поле ввода, так как для атрибутного поиска оно не используется
                        if (searchInput) {
                            searchInput.value = '';
                            window.state.query = '';
                        }

                        // 3. ГЛАВНОЕ: Открыть контейнер атрибутного фильтра, удаляя класс 'd-none'
                        const filterContent = document.getElementById('attribute-filter-content');
                        if (filterContent) {
                            filterContent.classList.remove('d-none');
                            console.log("Attribute Filter Content Opened.");
                        }

                        // 4. ПРИМЕНИТЬ ТЕКУЩИЙ ФИЛЬТР (если он есть)
                        if (attributeFilterSelect && attributeFilterSelect.value) {
                             applyAttributeFilter(attributeFilterSelect.value);
                        } else {
                            applyAttributeFilter(''); // Сбросить, если нет выбора
                        }
                    }
                    // --- Конец логики режимов ---

                    // Обновляем контролы после смены режима
                    window.updateFilterControlsVisibility(window.state.mode, currentQuery, window.activeAttributeFilter);

                    if (searchInput) {
                        setTimeout(() => searchInput.focus(), 10);
                    }
                    hideDropdown();
                }
            });
        }

        let searchTimeout;
        const handleSearchInput = () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                hideDropdown();
                window.runSearch();
            }, 300);
        };

        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('paste', handleSearchInput);
            searchInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    clearTimeout(searchTimeout);
                    window.runSearch();
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    window.activeAttributeFilter = null; // Сброс при очистке
                    window.runSearch();
                    searchInput.focus();
                }
            });
        }

        if (filterRemoveBtn) {
            // ⭐ ИЗМЕНЕНИЕ 6: Оставляем обработчик только для сброса фильтра по тексту
            filterRemoveBtn.addEventListener('click', () => {
                if (window.state.mode === 'filter-text') {
                    // showAllContent(); // ⭐ ПЕРЕНЕСЕНО В ГЛОБАЛЬНЫЙ ВЫЗОВ
                    if (window.showAllContent) window.showAllContent();
                    if (searchInput) {
                        searchInput.value = '';
                        window.state.query = '';
                    }
                    // if (filterRemoveBtn) { filterRemoveBtn.style.display = 'none'; } // ⭐ ПЕРЕНЕСЕНО В updateFilterControlsVisibility
                    // if (clearBtn) { clearBtn.style.display = 'none'; } // ⭐ ПЕРЕНЕСЕНО В updateFilterControlsVisibility
                    window.updateFilterControlsVisibility(window.state.mode, '', window.activeAttributeFilter);
                }
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (window.state.foundElements.length > 0) {
                    window.state.currentIndex = (window.state.currentIndex - 1 + window.state.foundElements.length) % window.state.foundElements.length;
                    updateIndicator();
                    scrollToCurrentElement();
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (window.state.foundElements.length > 0) {
                    window.state.currentIndex = (window.state.currentIndex + 1) % window.state.foundElements.length;
                    updateIndicator();
                    scrollToCurrentElement();
                }
            });
        }

        document.addEventListener('click', (event) => {
            if (searchBlock && !searchBlock.contains(event.target)) {
                hideDropdown();
            }
        });

        updateIndicator();
    };

    // ----------------------------------------------------------------------
    // ⭐ ФУНКЦИИ, ПЕРЕНЕСЕННЫЕ В ГЛОБАЛЬНЫЙ ДОСТУП ИЛИ В attribute-filter.js
    // ----------------------------------------------------------------------

    const filterPageContent = (query) => { // ⭐ ЭТА ФУНКЦИЯ ДОЛЖНА БЫТЬ ГЛОБАЛЬНО ДОСТУПНА (window.filterPageContent)
        const mainContent = document.querySelector(mainContentSelector); // ИСПОЛЬЗУЕМ КОНСТАНТУ
        if (!mainContent) {
            console.warn("Element with class 'docs-content col-lg-6 col-xl-6 title-center' not found.");
            return;
        }

        // Выбираем все элементы, которые нужно фильтровать
        const elementsToFilter = mainContent.querySelectorAll('p, div, li, a');
        const searchTerm = query.toLowerCase();
        let hasVisibleResults = false;

        elementsToFilter.forEach(element => {
            const elementText = element.textContent.toLowerCase();
            const isMatch = elementText.includes(searchTerm);

            if (isMatch) {
                element.style.display = '';
                hasVisibleResults = true;
                // showParentElements(element, mainContent); // ⭐ ПЕРЕНЕСЕНО В ГЛОБАЛЬНЫЙ ВЫЗОВ
                if (window.showParentElements) window.showParentElements(element, mainContent);
            } else {
                element.style.display = 'none';
            }
        });

        // showNoResultsMessage(hasVisibleResults, query, mainContent); // ⭐ ПЕРЕНЕСЕНО В ГЛОБАЛЬНЫЙ ВЫЗОВ
        if (window.showNoResultsMessage) window.showNoResultsMessage(hasVisibleResults, query, mainContent);
    };
    window.filterPageContent = filterPageContent;

    const showParentElements = (element, container) => { // ⭐ ДЕЛАЕМ ГЛОБАЛЬНОЙ
        let parent = element.parentElement;
        while (parent && parent !== container) {
            parent.style.display = '';
            parent = parent.parentElement;
        }
    };
    window.showParentElements = showParentElements;

    const showAllContent = () => { // ⭐ ДЕЛАЕМ ГЛОБАЛЬНОЙ
        const mainContent = document.querySelector(mainContentSelector); // ИСПОЛЬЗУЕМ КОНСТАНТУ
        if (mainContent) {
            const allElements = mainContent.querySelectorAll('*');
            allElements.forEach(element => {
                element.style.display = '';
            });
        }
        // hideNoResultsMessage(); // ⭐ ПЕРЕНЕСЕНО В ГЛОБАЛЬНЫЙ ВЫЗОВ
        if (window.hideNoResultsMessage) window.hideNoResultsMessage();
    };
    window.showAllContent = showAllContent;

    const showNoResultsMessage = (hasResults, query, container) => { // ⭐ ДЕЛАЕМ ГЛОБАЛЬНОЙ
        // hideNoResultsMessage(); // ⭐ ПЕРЕНЕСЕНО В ГЛОБАЛЬНЫЙ ВЫЗОВ
        if (window.hideNoResultsMessage) window.hideNoResultsMessage();
        if (!hasResults) {
            const noResultsElement = document.createElement('div');
            noResultsElement.className = 'search-no-results-message';
            noResultsElement.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #666;">
                    <p>Не найдено элементов, содержащих "<strong>${escapeHtml(query)}</strong>"</p>
                    <p style="font-size: 0.9em; margin-top: 10px;">Попробуйте изменить запрос</p>
                </div>
            `;
            noResultsElement.id = 'search-no-results-message';
            if (container) {
                container.appendChild(noResultsElement);
            } else {
                document.body.appendChild(noResultsElement);
            }
        }
    };
    window.showNoResultsMessage = showNoResultsMessage;

    const hideNoResultsMessage = () => { // ⭐ ДЕЛАЕМ ГЛОБАЛЬНОЙ
        const existingMessage = document.getElementById('search-no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    };
    window.hideNoResultsMessage = hideNoResultsMessage;


    setupEventListeners();

    setTimeout(() => {
        const wasRestored = restoreSearchState();
        console.log("Состояние поиска восстановлено:", wasRestored);
    }, 100);
});


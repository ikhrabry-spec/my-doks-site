document.addEventListener('DOMContentLoaded', function() {
    // Ваша существующая логика для переключения карточек
    const toggleButton = document.getElementById('toggle-cards-button');
    const mainSourcesList = document.getElementById('sources-list');
    const listIcon = document.getElementById('list-icon');
    const descIcon = document.getElementById('desc-icon');

    if (toggleButton && mainSourcesList) {
        function setGlobalDisplayMode(mode) {
            mainSourcesList.classList.remove('compact', 'expanded');
            mainSourcesList.classList.add(mode);
            if (listIcon) listIcon.style.display = (mode === 'expanded') ? 'block' : 'none';
            if (descIcon) descIcon.style.display = (mode === 'expanded') ? 'none' : 'block';
            localStorage.setItem('mainSourcesDisplayMode', mode);
        }

        const savedMode = localStorage.getItem('mainSourcesDisplayMode') || 'compact';
        setGlobalDisplayMode(savedMode);

        toggleButton.addEventListener('click', () => {
            const currentMode = mainSourcesList.classList.contains('compact') ? 'compact' : 'expanded';
            const newMode = (currentMode === 'compact') ? 'expanded' : 'compact';
            setGlobalDisplayMode(newMode);
        });
    }
// Логика подсветки разделов по клику


});


document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    function applyTheme(theme) {
        body.classList.remove('light', 'dark');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }

    // Function to toggle the theme
    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    }

    // Set the initial theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
    applyTheme(savedTheme);

    // Event listener for the button
    themeToggleButton.addEventListener('click', toggleTheme);
});

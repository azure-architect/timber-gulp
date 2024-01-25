console.log('I am here!')
document.addEventListener('DOMContentLoaded', function() {
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.documentElement.classList.add(currentTheme);
    }

    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        let theme = 'light';
        if (document.documentElement.classList.contains('dark')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });
});

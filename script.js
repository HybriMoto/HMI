// This file can be used for any future interactive elements, 
// such as smooth scrolling, form validation, or button logic.

document.addEventListener('DOMContentLoaded', () => {
    // Example: Smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

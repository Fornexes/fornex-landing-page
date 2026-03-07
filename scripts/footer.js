// Updates the year in the footer copyright
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-copyright');
    
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear}, Fornex. Todos os direitos reservados.`;
    }
});

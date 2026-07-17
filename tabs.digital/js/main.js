// Main JavaScript untuk tabs
document.addEventListener('DOMContentLoaded', function() {
    console.log('tabs system initialized');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize components
    initComponents();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Navigating to:', this.href);
        });
    });
}

function initComponents() {
    // Initialize UI components
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', handleButtonClick);
    });
}

function handleButtonClick(e) {
    console.log('Button clicked:', e.target.textContent);
}

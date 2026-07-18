// JavaScript Dashboard Media Digital
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Media Digital Dimuat');
    const menuItems = document.querySelectorAll('nav ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            console.log('Menu diklik:', this.textContent);
        });
    });
});

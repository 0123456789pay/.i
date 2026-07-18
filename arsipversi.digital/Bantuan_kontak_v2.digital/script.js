// Script untuk Navigasi Digital - Media Digital
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId !== '#') {
                const target = document.querySelector(targetId);
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Toggle dropdown untuk mobile
    const navItems = document.querySelectorAll('.has-dropdown');
    navItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            if(window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
    
    // Close dropdown ketika klik di luar
    document.addEventListener('click', function(e) {
        if(!e.target.closest('.nav-item')) {
            navItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    console.log('Navigasi Media.Digital berhasil dimuat!');
});
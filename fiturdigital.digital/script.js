// JavaScript for Web3 Blockchain Landing Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('open');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Scroll Reveal Animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.feature-card, .main-feature-card, .side-panel, .reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible', 'active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
    
    // Feature Cards Stagger Animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Side Panels Stagger Animation
    const sidePanels = document.querySelectorAll('.side-panel');
    sidePanels.forEach((panel, index) => {
        panel.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                if (element.dataset.suffix === '+') {
                    element.textContent = Math.floor(start) + '+';
                } else if (element.dataset.prefix === '$') {
                    element.textContent = '$' + Math.floor(start) + 'M+';
                } else {
                    element.textContent = Math.floor(start) + '%';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (element.dataset.suffix === '+') {
                    element.textContent = target + '+';
                } else if (element.dataset.prefix === '$') {
                    element.textContent = '$' + target + 'M+';
                } else {
                    element.textContent = target + '%';
                }
            }
        }
        
        updateCounter();
    }
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function checkStatsVisibility() {
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    
                    if (text.includes('$')) {
                        stat.dataset.prefix = '$';
                        stat.dataset.suffix = '+';
                        animateCounter(stat, number);
                    } else if (text.includes('%')) {
                        stat.dataset.suffix = '%';
                        animateCounter(stat, number);
                    } else {
                        stat.dataset.suffix = '+';
                        animateCounter(stat, number);
                    }
                });
                window.removeEventListener('scroll', checkStatsVisibility);
            }
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    
    // Button Click Effects
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Hover Effect Enhancement for Cards
    const cards = document.querySelectorAll('.feature-card, .side-panel, .main-feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            cards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // Parallax Effect for Background Elements
    const bgElements = document.querySelectorAll('.fixed[style*="blur"]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        bgElements.forEach((element, index) => {
            const speed = 0.1 * (index + 1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-primary');
                    link.classList.add('text-text-primary');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-text-primary');
                        link.classList.add('text-primary');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Intersection Observer for Performance Optimization
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .side-panel').forEach(el => {
        observer.observe(el);
    });
    
    // Tooltip Functionality
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip-popup';
            tooltipElement.textContent = tooltipText;
            tooltipElement.style.cssText = `
                position: absolute;
                background: #1E293B;
                color: #FFFFFF;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 8}px`;
            tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
            
            this.tooltipElement = tooltipElement;
        });
        
        tooltip.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
    
    // Loading Animation Complete
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Initial animations
        setTimeout(() => {
            const heroIcon = document.querySelector('.hero-section .w-32');
            if (heroIcon) {
                heroIcon.classList.add('animate-pulse-slow');
            }
        }, 500);
    });
    
    // Console Welcome Message
    console.log('%c🚀 Welcome to ZKChain!', 'color: #3B82F6; font-size: 24px; font-weight: bold;');
    console.log('%cBuilding the future of privacy-preserving blockchain technology.', 'color: #64748B; font-size: 14px;');
    console.log('%cLearn more: https://zkchain.io', 'color: #3B82F6; font-size: 12px;');
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}

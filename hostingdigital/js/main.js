// Main JavaScript for Hosting Digital

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Domain search functionality
    const domainSearchForm = document.getElementById('domainSearchForm');
    if (domainSearchForm) {
        domainSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const domainInput = document.getElementById('domainName');
            const domain = domainInput.value.trim();
            
            if (domain) {
                checkDomainAvailability(domain);
            }
        });
    }
    
    // Pricing toggle (monthly/yearly)
    const pricingToggle = document.getElementById('pricingToggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            togglePricing(this.checked);
        });
    }
    
    // Live chat button
    const liveChatBtn = document.getElementById('liveChatBtn');
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', function() {
            toggleLiveChat();
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
    
    // Initialize animations
    initAnimations();
});

// Check domain availability
function checkDomainAvailability(domain) {
    const resultDiv = document.getElementById('domainSearchResult');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<p>Checking availability...</p>';
    
    // Simulate API call
    setTimeout(() => {
        const isAvailable = Math.random() > 0.5;
        if (isAvailable) {
            resultDiv.innerHTML = `
                <div class="domain-available">
                    <p>✓ ${domain} is available!</p>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="domain-unavailable">
                    <p>✗ ${domain} is not available</p>
                    <p>Try these alternatives:</p>
                    <ul>
                        <li>${domain.replace('.com', '.net')}</li>
                        <li>${domain.replace('.com', '.org')}</li>
                        <li>${domain.replace('.com', '.io')}</li>
                    </ul>
                </div>
            `;
        }
    }, 1000);
}

// Toggle pricing display
function togglePricing(isYearly) {
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    
    monthlyPrices.forEach(price => {
        price.style.display = isYearly ? 'none' : 'block';
    });
    
    yearlyPrices.forEach(price => {
        price.style.display = isYearly ? 'block' : 'none';
    });
}

// Toggle live chat
function toggleLiveChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.classList.toggle('hidden');
    }
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--danger-color)';
            
            // Remove error on input
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        } else {
            input.style.borderColor = '';
        }
    });
    
    // Email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value && !emailRegex.test(input.value)) {
            isValid = false;
            input.style.borderColor = 'var(--danger-color)';
        }
    });
    
    return isValid;
}

// Initialize animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Cookie consent
function acceptCookies() {
    document.cookie = "cookieConsent=true; max-age=31536000; path=/";
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }
}

// Check cookie consent on load
window.addEventListener('load', function() {
    const cookieConsent = document.cookie.split(';').find(c => c.trim().startsWith('cookieConsent='));
    if (!cookieConsent) {
        const cookieBanner = document.getElementById('cookieBanner');
        if (cookieBanner) {
            cookieBanner.style.display = 'block';
        }
    }
});

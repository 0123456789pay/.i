// Aireber Digital - Multi-level Menu & Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize multi-level menu
    initMultiLevelMenu();
    
    // Initialize dashboard widgets
    initDashboardWidgets();
    
    // Initialize auth forms
    initAuthForms();
});

// Multi-level Menu System
function initMultiLevelMenu() {
    const menuLinks = document.querySelectorAll('.menu-link[data-has-submenu]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const submenu = this.nextElementSibling;
            const arrow = this.querySelector('.menu-arrow');
            
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('open');
                arrow.classList.toggle('open');
            }
        });
    });
}

// Dashboard Widgets
function initDashboardWidgets() {
    // Animate card values on load
    const cardValues = document.querySelectorAll('.card-value[data-animate]');
    
    cardValues.forEach(card => {
        const targetValue = parseInt(card.getAttribute('data-animate'));
        animateValue(card, 0, targetValue, 1000);
    });
}

// Animation helper
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Auth Forms
function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login (replace with actual API call)
    console.log('Login attempt:', email);
    alert('Login functionality - Connect to your backend API');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate registration (replace with actual API call)
    console.log('Registration attempt:', name, email);
    alert('Registration functionality - Connect to your backend API');
}

// Sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Product filter and search
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const name = product.querySelector('.product-name').textContent.toLowerCase();
        const category = product.querySelector('.product-category').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || category.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// AI Automation Functions
async function runAutomation(workflowId) {
    console.log('Running automation workflow:', workflowId);
    // Replace with actual API call to automation endpoint
    return { success: true, message: 'Automation triggered' };
}

async function processWithAI(data, modelType = 'default') {
    console.log('Processing with AI:', modelType, data);
    // Replace with actual AI/LLM API call
    return { result: 'AI processed result', confidence: 0.95 };
}

// Social Media Integration
async function postToSocialMedia(platform, content) {
    console.log(`Posting to ${platform}:`, content);
    // Replace with actual social media API
    return { success: true, postId: '123456' };
}

// Dashboard Data Refresh
function refreshDashboardData() {
    const widgets = document.querySelectorAll('.card-value');
    widgets.forEach(widget => {
        // Simulate data refresh (replace with actual API calls)
        const randomValue = Math.floor(Math.random() * 1000);
        widget.textContent = randomValue.toLocaleString();
    });
}

// Auto-refresh every 30 seconds
setInterval(refreshDashboardData, 30000);

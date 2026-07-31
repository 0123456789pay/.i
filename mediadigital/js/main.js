/**
 * Main Application Script - Media Digital Platform
 * Fixed & Enhanced Version with Security Features
 */

// --- Authentication & Session Management ---

// Global error handler for better debugging
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message, 'at', e.filename + ':' + e.lineno);
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize session management
    if (typeof SessionManager !== 'undefined') {
        SessionManager.setupAutoCheck();
    }
    
    checkAuthStatus(); // Update header berdasarkan status login
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu after clicking
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Navbar Scroll Effect (throttled for performance)
    const updateNavbarShadow = throttle(function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50 
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    }, 100);
    
    window.addEventListener('scroll', updateNavbarShadow);

    // Contact Form Submission with validation and sanitization
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput || !emailInput || !messageInput) {
                console.error('Form elements not found');
                return;
            }

            const name = Sanitizer ? Sanitizer.sanitize(nameInput.value) : nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = Sanitizer ? Sanitizer.sanitize(messageInput.value) : messageInput.value.trim();

            // Enhanced validation
            const validationErrors = [];
            
            if (!name) {
                validationErrors.push('Nama diperlukan');
            }
            
            if (!Validator || Validator.isValidEmail(email)) {
                if (!email) {
                    validationErrors.push('Email diperlukan');
                } else if (Validator && !Validator.isValidEmail(email)) {
                    validationErrors.push('Format email tidak valid');
                }
            } else if (!email) {
                validationErrors.push('Email diperlukan');
            }
            
            if (!message) {
                validationErrors.push('Pesan diperlukan');
            }

            if (validationErrors.length > 0) {
                alert(validationErrors.join('\n'));
                return;
            }

            // Success
            alert(`Terima kasih, ${name}! Pesan Anda telah kami terima.`);
            contactForm.reset();
        });
    }

    // Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'all 0.6s ease';
        observer.observe(stat);
    });
});

// Fungsi untuk update Header berdasarkan status login
function checkAuthStatus() {
    let user;
    try {
        const userData = localStorage.getItem('currentUser');
        user = userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error('Error parsing user data:', e);
        user = null;
    }
    
    const loginBtn = document.getElementById('nav-login-btn');
    const registerBtn = document.getElementById('nav-register-btn');
    const userDisplay = document.getElementById('nav-user-display');
    const logoutBtn = document.getElementById('nav-logout-btn');

    console.log('checkAuthStatus - User:', user);
    console.log('checkAuthStatus - Elements:', { loginBtn, registerBtn, userDisplay, logoutBtn });

    if (user) {
        // User sudah login - sembunyikan tombol login/register
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        
        // Tampilkan identitas user dengan sanitization
        if (userDisplay) {
            userDisplay.style.display = 'inline-flex';
            const displayName = Sanitizer ? Sanitizer.sanitize(user.name || user.email) : (user.name || user.email);
            userDisplay.innerHTML = `
                <span class="user-greeting">Halo, <strong>${displayName}</strong></span>
                ${user.role === 'admin' ? '<span class="badge-admin">Admin</span>' : ''}
            `;
        }
        // Tampilkan tombol logout
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.onclick = (e) => {
                e.preventDefault();
                handleLogout();
            };
        }
        console.log('User is logged in, UI updated');
    } else {
        // User belum login - tampilkan tombol login/register
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userDisplay) {
            userDisplay.style.display = 'none';
            userDisplay.innerHTML = '';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
        console.log('User is not logged in, showing login/register buttons');
    }
}

// Login Form Handler (if on login page)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (!emailInput || !passwordInput) {
            console.error('Login form elements not found');
            return;
        }

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        // Validate input
        if (!email || !password) {
            alert('Mohon lengkapi semua field.');
            return;
        }

        // Validate email format
        if (Validator && !Validator.isValidEmail(email)) {
            alert('Format email tidak valid.');
            return;
        }

        // Check for admin credentials (in production, use server-side authentication)
        if (email === 'admin@adminroot.innn' && password === 'adminroot') {
            const adminUser = {
                name: 'Super Admin',
                email: email,
                role: 'admin'
            };
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('adminUser', 'admin');
            
            // Start session
            if (SessionManager) {
                SessionManager.startSession();
            }
            
            console.log('Admin login successful:', adminUser);
            alert('Login berhasil! Selamat datang, Admin.');
            window.location.href = 'dashboard/index.html';
            return;
        }
        
        // Regular user login
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('users')) || [];
        } catch (e) {
            console.error('Error parsing users:', e);
            users = [];
        }
        
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
            // Remove password from stored user object
            const { password: _, ...safeUser } = foundUser;
            
            localStorage.setItem('currentUser', JSON.stringify(safeUser));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Start session
            if (SessionManager) {
                SessionManager.startSession();
            }
            
            alert('Login berhasil! Selamat datang.');
            window.location.href = 'index.html';
        } else {
            alert('Email atau password salah!');
        }
    });
}

// Register Form Handler (if on register page)
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            console.error('Register form elements not found');
            return;
        }

        const name = Sanitizer ? Sanitizer.sanitize(nameInput.value.trim()) : nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validation - Check required fields
        const requiredValidation = Validator ? Validator.validateRequired({ name, email, password, confirmPassword }) : { valid: true, missingFields: [] };
        if (!requiredValidation.valid) {
            alert(`Mohon lengkapi field: ${requiredValidation.missingFields.join(', ')}`);
            return;
        }

        // Validate email format
        if (Validator && !Validator.isValidEmail(email)) {
            alert('Format email tidak valid.');
            return;
        }

        // Validate password strength
        if (Validator) {
            const passwordValidation = Validator.isValidPassword(password);
            if (!passwordValidation.valid) {
                alert(passwordValidation.errors.join('\n'));
                return;
            }
        } else if (password.length < 8) {
            alert('Password minimal 8 karakter.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Password tidak cocok.');
            return;
        }

        // Check for duplicate email
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('users')) || [];
        } catch (e) {
            console.error('Error parsing users:', e);
            users = [];
        }
        
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert('Email sudah terdaftar. Silakan gunakan email lain atau login.');
            return;
        }

        // Create new user (without storing plain password in production)
        const newUser = {
            name: name,
            email: email,
            password: simpleHash ? simpleHash(password) : password, // Hash if available
            role: 'user',
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registrasi berhasil! Silakan login.');
        window.location.href = 'login.html';
    });
}

// Logout function
function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    
    // End session
    if (SessionManager) {
        SessionManager.endSession();
    }
    
    alert('Anda telah logout.');
    // Reload halaman untuk refresh status
    window.location.reload();
}

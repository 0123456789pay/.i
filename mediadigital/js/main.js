// --- Authentication & Session Management ---

// Cek status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
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

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && message) {
                alert(`Terima kasih, ${name}! Pesan Anda telah kami terima.`);
                contactForm.reset();
            } else {
                alert('Mohon lengkapi semua field.');
            }
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
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.getElementById('nav-login-btn');
    const registerBtn = document.getElementById('nav-register-btn');
    const userDisplay = document.getElementById('nav-user-display');
    const logoutBtn = document.getElementById('nav-logout-btn');

    if (user) {
        // User sudah login - sembunyikan tombol login/register
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        
        // Tampilkan identitas user
        if (userDisplay) {
            userDisplay.style.display = 'flex';
            userDisplay.innerHTML = `
                <span class="user-greeting">Halo, <strong>${user.name || user.email}</strong></span>
                ${user.role === 'admin' ? '<span class="badge-admin">Admin</span>' : ''}
            `;
        }
        // Tampilkan tombol logout
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.onclick = () => handleLogout();
        }
    } else {
        // User belum login - tampilkan tombol login/register
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userDisplay) userDisplay.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// Login Form Handler (if on login page)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check for admin credentials
        if (email === 'admin@adminroot.innn' && password === 'adminroot') {
            const adminUser = {
                name: 'Super Admin',
                email: email,
                role: 'admin'
            };
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('adminUser', 'admin');
            alert('Login berhasil! Selamat datang, Admin.');
            window.location.href = 'dashboard/index.html';
        }
        // Regular user login
        else if (email && password) {
            // Cek dari registered users
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(u => u.email === email && u.password === password);
            
            if (foundUser) {
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login berhasil! Selamat datang.');
                window.location.href = 'index.html';
            } else {
                alert('Email atau password salah!');
            }
        } else {
            alert('Mohon lengkapi semua field.');
        }
    });
}

// Register Form Handler (if on register page)
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Mohon lengkapi semua field.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Password tidak cocok.');
            return;
        }

        if (password.length < 6) {
            alert('Password minimal 6 karakter.');
            return;
        }

        // Simpan user ke localStorage
        const newUser = {
            name: name,
            email: email,
            password: password,
            role: 'user'
        };
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
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
    alert('Anda telah logout.');
    window.location.href = 'index.html';
}

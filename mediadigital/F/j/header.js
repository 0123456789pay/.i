/**
 * ALLUNIVERS ICONER - Header Module
 * Handles header components and navigation
 */

class IconerHeader {
    constructor() {
        this.logo = 'ALLUNIVERS ICONER';
        this.navigation = [];
        this.user = null;
    }

    setNavigation(items) {
        this.navigation = items;
        this.render();
    }

    setUser(userData) {
        this.user = userData;
        this.updateUserDisplay();
    }

    render() {
        const header = document.getElementById('iconer-header');
        if (!header) return;

        header.innerHTML = `
            <div class="header-content">
                <div class="logo">${this.logo}</div>
                <nav class="navigation">
                    ${this.navigation.map(item => `
                        <a href="${item.href}" class="nav-item">${item.label}</a>
                    `).join('')}
                </nav>
                <div class="user-info" id="user-display"></div>
            </div>
        `;
    }

    updateUserDisplay() {
        const userDisplay = document.getElementById('user-display');
        if (userDisplay && this.user) {
            userDisplay.innerHTML = `
                <span class="username">${this.user.username}</span>
                <span class="user-role">${this.user.role}</span>
            `;
        }
    }
}

// Auto-initialize
if (typeof window !== 'undefined') {
    window.IconerHeader = new IconerHeader();
}

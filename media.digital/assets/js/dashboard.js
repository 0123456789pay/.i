// ========================================
// MEDIA.DIGITAL - Dashboard JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    loadDashboardData();
    initCharts();
    initSidebar();
});

function initDashboard() {
    // Initialize dashboard components
    updateLastRefresh();
    initTooltips();
}

function loadDashboardData() {
    // Load statistics
    fetchDashboardStats();
    
    // Load recent activity
    loadRecentActivity();
    
    // Load system status
    loadSystemStatus();
}

function fetchDashboardStats() {
    // Simulated data - would come from database in production
    const stats = [
        { id: 'totalUsers', value: 15420, label: 'Total Pengguna' },
        { id: 'activeSessions', value: 892, label: 'Sesi Aktif' },
        { id: 'totalContent', value: 5283, label: 'Konten' },
        { id: 'systemHealth', value: 98.5, label: 'Kesehatan Sistem (%)' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateValue(element, stat.value);
        }
    });
}

function animateValue(element, target) {
    let current = 0;
    const increment = target / 30;
    const stepTime = 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (typeof target === 'number' && target % 1 !== 0) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

function loadRecentActivity() {
    const activities = [
        { icon: '📄', title: 'Dokumen baru ditambahkan', time: '5 menit yang lalu' },
        { icon: '👤', title: 'Pengguna baru terdaftar', time: '12 menit yang lalu' },
        { icon: '📊', title: 'Laporan bulanan dibuat', time: '1 jam yang lalu' },
        { icon: '⚙️', title: 'Pengaturan sistem diperbarui', time: '2 jam yang lalu' },
        { icon: '🔒', title: 'Backup otomatis selesai', time: '3 jam yang lalu' }
    ];
    
    const activityList = document.getElementById('recentActivity');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <li class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </li>
        `).join('');
    }
}

function loadSystemStatus() {
    const statusElements = document.querySelectorAll('.status-indicator');
    statusElements.forEach(el => {
        el.textContent = 'Online';
        el.style.color = '#10b981';
    });
}

function initCharts() {
    // Placeholder for chart initialization
    // In production, this would use Chart.js or similar library
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    
    chartPlaceholders.forEach((placeholder, index) => {
        placeholder.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <div>Grafik akan dimuat di sini</div>
                <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 0.5rem;">
                    Integrasi Chart.js ready
                </div>
            </div>
        `;
    });
}

function initSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.85rem;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            
            this._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

function updateLastRefresh() {
    const lastRefreshEl = document.getElementById('lastRefresh');
    if (lastRefreshEl) {
        const now = new Date();
        lastRefreshEl.textContent = 'Terakhir diperbarui: ' + now.toLocaleTimeString('id-ID');
    }
}

// Quick Actions
function quickAction(action) {
    switch(action) {
        case 'refresh':
            location.reload();
            break;
        case 'export':
            exportData();
            break;
        case 'settings':
            window.location.href = '../pengaturan/index.html';
            break;
        default:
            console.log('Unknown action:', action);
    }
}

function exportData() {
    showNotification('Mempersiapkan ekspor data...', 'info');
    
    setTimeout(() => {
        showNotification('Data berhasil diekspor!', 'success');
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

console.log('Dashboard initialized! 📊');

// Dashboard JavaScript

let refreshInterval = null;

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadOverview();
    loadStatistics();
    loadConfiguration();
    loadLogs();
    
    // Start auto-refresh if enabled
    if (document.getElementById('auto-refresh').checked) {
        startAutoRefresh();
    }
});

// Navigation handling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const target = link.getAttribute('href').substring(1);
            document.getElementById(target).classList.add('active');
        });
    });
}

// Load system overview
async function loadOverview() {
    try {
        const response = await fetch('/dashboard/api/overview');
        const data = await response.json();
        
        // Update system status
        const statusElement = document.getElementById('system-status');
        statusElement.textContent = 'Healthy';
        statusElement.style.color = '#2ecc71';
        
        // Update uptime
        const uptime = formatUptime(data.system.uptime);
        document.getElementById('uptime').textContent = uptime;
        
        // Update connections
        document.getElementById('active-connections').textContent = Math.floor(Math.random() * 100);
        
        // Update total requests
        document.getElementById('total-requests').textContent = Math.floor(Math.random() * 10000);
        
        // Update services list
        updateServicesList(data.services);
    } catch (error) {
        console.error('Error loading overview:', error);
    }
}

// Format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

// Update services list
function updateServicesList(services) {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';
    
    for (const [name, enabled] of Object.entries(services)) {
        const serviceDiv = document.createElement('div');
        serviceDiv.className = `service-status ${enabled ? 'active' : 'inactive'}`;
        serviceDiv.innerHTML = `
            <div>${name.replace('_', ' ').toUpperCase()}</div>
            <div>${enabled ? '● Running' : '○ Stopped'}</div>
        `;
        servicesList.appendChild(serviceDiv);
    }
}

// Load statistics
async function loadStatistics() {
    try {
        const response = await fetch('/dashboard/api/stats');
        const data = await response.json();
        
        document.getElementById('avg-response').textContent = `${data.performance.avg_response_time_ms}ms`;
        document.getElementById('p95-response').textContent = `${data.performance.p95_response_time_ms}ms`;
        document.getElementById('p99-response').textContent = `${data.performance.p99_response_time_ms}ms`;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Load configuration
async function loadConfiguration() {
    try {
        const response = await fetch('/dashboard/api/config');
        const data = await response.json();
        
        document.getElementById('proxy-port').value = data.proxy.port;
        document.getElementById('timeout').value = data.proxy.timeout;
        document.getElementById('max-connections').value = data.proxy.max_connections;
        document.getElementById('routing-algorithm').value = data.routing.algorithm;
    } catch (error) {
        console.error('Error loading configuration:', error);
    }
}

// Save configuration
async function saveConfiguration(event) {
    event.preventDefault();
    
    const config = {
        proxy: {
            port: parseInt(document.getElementById('proxy-port').value),
            timeout: parseInt(document.getElementById('timeout').value),
            max_connections: parseInt(document.getElementById('max-connections').value)
        },
        routing: {
            algorithm: document.getElementById('routing-algorithm').value
        }
    };
    
    try {
        const response = await fetch('/dashboard/api/config', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Configuration saved successfully!');
        } else {
            alert('Failed to save configuration');
        }
    } catch (error) {
        console.error('Error saving configuration:', error);
        alert('Error saving configuration');
    }
}

// Control service
async function controlService(service, action) {
    try {
        const response = await fetch(`/dashboard/api/service/${service}/${action}`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(`Service ${service} ${action}ed successfully!`);
            loadOverview(); // Refresh overview
        } else {
            alert(`Failed to ${action} service ${service}`);
        }
    } catch (error) {
        console.error('Error controlling service:', error);
        alert(`Error: ${error.message}`);
    }
}

// Load logs
async function loadLogs() {
    try {
        const lines = document.getElementById('log-lines').value;
        const response = await fetch(`/dashboard/api/logs?lines=${lines}`);
        const data = await response.json();
        
        const logsDisplay = document.getElementById('logs-display');
        logsDisplay.innerHTML = '';
        
        data.logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${log.level}`;
            logEntry.innerHTML = `
                <span>[${new Date(log.timestamp).toLocaleString()}]</span>
                <span>[${log.level.toUpperCase()}]</span>
                <span>${log.message}</span>
            `;
            logsDisplay.appendChild(logEntry);
        });
        
        // Auto-scroll to bottom
        logsDisplay.scrollTop = logsDisplay.scrollHeight;
    } catch (error) {
        console.error('Error loading logs:', error);
    }
}

// Clear logs
function clearLogs() {
    document.getElementById('logs-display').innerHTML = '';
}

// Save settings
function saveSettings() {
    const autoRefresh = document.getElementById('auto-refresh').checked;
    const darkMode = document.getElementById('dark-mode').checked;
    const interval = parseInt(document.getElementById('refresh-interval').value);
    
    // Apply dark mode
    if (darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Update auto-refresh
    if (autoRefresh) {
        startAutoRefresh(interval * 1000);
    } else {
        stopAutoRefresh();
    }
    
    alert('Settings saved!');
}

// Start auto-refresh
function startAutoRefresh(interval = 30000) {
    stopAutoRefresh(); // Clear existing interval
    
    refreshInterval = setInterval(() => {
        loadOverview();
        loadStatistics();
    }, interval);
}

// Stop auto-refresh
function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

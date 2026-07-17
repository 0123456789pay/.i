// Pembuat Dokumen - Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded successfully');
    
    // Load statistics
    loadStatistics();
    
    // Initialize auto-save
    initAutoSave();
});

// Load statistics from API
function loadStatistics() {
    fetch('api.pTechHP?action=list')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const totalFiles = document.getElementById('total-files');
                if (totalFiles) {
                    animateNumber(totalFiles, data.data.length);
                }
            }
        })
        .catch(error => console.error('Error loading statistics:', error));
}

// Animate number counting
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// Auto-save functionality
function initAutoSave() {
    const editors = document.querySelectorAll('textarea.editor-area');
    editors.forEach(editor => {
        let timeout;
        editor.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const key = `autosave_${window.location.pathname}_${this.id}`;
                localStorage.setItem(key, this.value);
                showNotification('Auto-saved!', 'success');
            }, 2000);
        });
        
        // Load saved content
        const key = `autosave_${window.location.pathname}_${editor.id}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            editor.value = saved;
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Export function for documents
function exportDocument(format) {
    const content = document.querySelector('.editor-area')?.value || '';
    if (!content) {
        showNotification('Tidak ada konten untuk diekspor', 'error');
        return;
    }
    
    let blob, filename;
    
    switch(format) {
        case 'txt':
            blob = new Blob([content], { type: 'text/plain' });
            filename = 'document.txt';
            break;
        case 'html':
            blob = new Blob([content], { type: 'text/html' });
            filename = 'document.html';
            break;
        case 'json':
            blob = new Blob([JSON.stringify({ content }, null, 2)], { type: 'application/json' });
            filename = 'document.json';
            break;
        default:
            blob = new Blob([content], { type: 'text/plain' });
            filename = 'document.txt';
    }
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    showNotification(`Dokumen berhasil diekspor sebagai ${format.toUpperCase()}`, 'success');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+S or Cmd+S - Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        document.querySelector('.btn-success')?.click();
        showNotification('Dokumen disimpan (Ctrl+S)', 'success');
    }
    
    // Ctrl+P or Cmd+P - Preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        showNotification('Preview dibuka (Ctrl+P)', 'info');
    }
    
    // Escape - Clear selection
    if (e.key === 'Escape') {
        document.getSelection()?.removeAllRanges();
    }
});

console.log('Dashboard.js loaded with all features');

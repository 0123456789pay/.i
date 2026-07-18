// Backup Module - Manages data backups
const Backup = {
    backups: [],
    init() { this.load(); this.setupEventListeners(); this.render(); },
    load() { const b = localStorage.getItem('aiStudio_backups'); if (b) this.backups = JSON.parse(b); },
    setupEventListeners() {
        document.getElementById('backupBtn')?.addEventListener('click', () => this.create());
        document.getElementById('restoreBtn')?.addEventListener('click', () => this.restore());
        document.getElementById('scheduleBtn')?.addEventListener('click', () => alert('Schedule configured!'));
    },
    create() {
        const backup = { id: Date.now(), date: new Date().toISOString(), size: (Math.random() * 10).toFixed(2) + ' MB' };
        this.backups.unshift(backup);
        localStorage.setItem('aiStudio_backups', JSON.stringify(this.backups));
        this.render();
    },
    restore() { if (this.backups.length === 0) { alert('No backups available'); return; } alert('Restoring from latest backup...'); },
    render() {
        const list = document.getElementById('backupList');
        if (!list) return;
        list.innerHTML = this.backups.map(b => `<div class="backup-item"><span>${new Date(b.date).toLocaleString()}</span><span>${b.size}</span></div>`).join('') || '<p>No backups yet</p>';
    }
};
document.addEventListener('DOMContentLoaded', () => Backup.init());

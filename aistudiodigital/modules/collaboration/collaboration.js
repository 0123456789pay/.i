// Collaboration Module - Manages team collaboration
const Collaboration = {
    team: [{ name: 'You', role: 'Owner', email: 'you@example.com' }, { name: 'Alice', role: 'Editor', email: 'alice@example.com' }],
    init() { this.setupEventListeners(); this.render(); },
    setupEventListeners() {
        document.getElementById('inviteBtn')?.addEventListener('click', () => this.invite());
        document.getElementById('shareBtn')?.addEventListener('click', () => this.share());
    },
    invite() { const email = prompt('Enter email:'); if (email) { this.team.push({ name: email.split('@')[0], role: 'Viewer', email }); this.render(); } },
    share() { alert('Project link copied to clipboard!'); },
    render() {
        const list = document.getElementById('teamList');
        if (!list) return;
        list.innerHTML = this.team.map(m => `<div class="team-member"><div class="avatar">${m.name[0]}</div><div><strong>${m.name}</strong><br><small>${m.role} - ${m.email}</small></div></div>`).join('');
    }
};
document.addEventListener('DOMContentLoaded', () => Collaboration.init());

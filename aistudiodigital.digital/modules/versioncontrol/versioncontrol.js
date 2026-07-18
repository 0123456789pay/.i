// Version Control Module - Manages project versions with localStorage
const VersionControl = {
    commits: [], branches: ['main'], currentBranch: 'main',
    init() { this.load(); this.setupEventListeners(); this.render(); },
    load() {
        const c = localStorage.getItem('aiStudio_commits');
        const b = localStorage.getItem('aiStudio_branches');
        if (c) this.commits = JSON.parse(c);
        if (b) this.branches = JSON.parse(b);
        if (this.commits.length === 0) {
            this.commits.push({ hash: 'abc123', message: 'Initial commit', date: new Date().toISOString(), branch: 'main' });
            this.save();
        }
    },
    save() {
        localStorage.setItem('aiStudio_commits', JSON.stringify(this.commits));
        localStorage.setItem('aiStudio_branches', JSON.stringify(this.branches));
    },
    setupEventListeners() {
        document.getElementById('commitBtn')?.addEventListener('click', () => this.commit());
        document.getElementById('pushBtn')?.addEventListener('click', () => alert('Pushed to remote!'));
        document.getElementById('pullBtn')?.addEventListener('click', () => alert('Pulled from remote!'));
        document.getElementById('branchBtn')?.addEventListener('click', () => this.newBranch());
    },
    render() {
        const history = document.getElementById('commitHistory');
        const branchList = document.getElementById('branchList');
        if (history) {
            history.innerHTML = '<h3>Commit History</h3>' + this.commits.map(c => 
                `<div class="commit-item"><div class="commit-hash">${c.hash}</div><div class="commit-message">${c.message}</div><div class="commit-date">${new Date(c.date).toLocaleString()} (${c.branch})</div></div>`
            ).join('');
        }
        if (branchList) {
            branchList.innerHTML = '<h3>Branches</h3>' + this.branches.map(b => 
                `<div class="branch-item${b === this.currentBranch ? ' active' : ''}" onclick="VersionControl.switchBranch('${b}')">${b}</div>`
            ).join('');
        }
    },
    commit() {
        const msg = prompt('Commit message:');
        if (!msg) return;
        this.commits.unshift({ hash: Math.random().toString(36).substr(2, 7), message: msg, date: new Date().toISOString(), branch: this.currentBranch });
        this.save(); this.render();
    },
    newBranch() {
        const name = prompt('Branch name:');
        if (!name || this.branches.includes(name)) return;
        this.branches.push(name); this.currentBranch = name; this.save(); this.render();
    },
    switchBranch(name) { this.currentBranch = name; this.render(); }
};
document.addEventListener('DOMContentLoaded', () => VersionControl.init());

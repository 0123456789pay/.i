// DataCenter Digital Application
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems();
    updateStats();
});

function loadMenuItems() {
    fetch('php/get_menus.php')
        .then(response => response.json())
        .then(data => {
            const menuList = document.getElementById('menu-list');
            if (menuList && data.menus) {
                menuList.innerHTML = data.menus.map(item => 
                    `<li><a href="#" onclick="loadPage('${item.file}'); return false;">${item.name}</a></li>`
                ).join('');
            }
        })
        .catch(err => console.error('Error loading menus:', err));
}

function loadPage(file) {
    const contentFrame = document.getElementById('content-frame');
    if (contentFrame) {
        contentFrame.src = file;
    }
}

function updateStats() {
    fetch('php/get_stats.php')
        .then(response => response.json())
        .then(data => {
            if (data.total_files) {
                document.getElementById('total-files').textContent = data.total_files;
            }
            if (data.active_servers) {
                document.getElementById('active-servers').textContent = data.active_servers;
            }
        })
        .catch(err => console.error('Error loading stats:', err));
}

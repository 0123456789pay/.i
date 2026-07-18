// JavaScript untuk Dashboard Monitoring V4
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Monitoring V4 module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Dashboard Monitoring V4 diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
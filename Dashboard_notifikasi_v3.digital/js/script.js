// JavaScript untuk Dashboard Notifikasi V3
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Notifikasi V3 module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Dashboard Notifikasi V3 diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
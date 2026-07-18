// JavaScript untuk Dashboard Notifikasi V2
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Notifikasi V2 module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Dashboard Notifikasi V2 diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
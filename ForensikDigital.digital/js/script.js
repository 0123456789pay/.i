// JavaScript untuk Forensikdigital
document.addEventListener('DOMContentLoaded', function() {
    console.log('Forensikdigital module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Forensikdigital diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
// JavaScript untuk Skycompute
document.addEventListener('DOMContentLoaded', function() {
    console.log('Skycompute module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Skycompute diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
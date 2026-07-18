// JavaScript untuk Deteksianomali
document.addEventListener('DOMContentLoaded', function() {
    console.log('Deteksianomali module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Deteksianomali diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
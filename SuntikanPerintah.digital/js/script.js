// JavaScript untuk Suntikanperintah
document.addEventListener('DOMContentLoaded', function() {
    console.log('Suntikanperintah module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Suntikanperintah diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
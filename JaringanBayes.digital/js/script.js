// JavaScript untuk Jaringanbayes
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jaringanbayes module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Jaringanbayes diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
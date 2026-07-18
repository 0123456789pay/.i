// JavaScript untuk Pelabelandata
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pelabelandata module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pelabelandata diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
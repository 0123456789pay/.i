// JavaScript untuk Perubahaniklim
document.addEventListener('DOMContentLoaded', function() {
    console.log('Perubahaniklim module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Perubahaniklim diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
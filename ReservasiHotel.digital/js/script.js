// JavaScript untuk Reservasihotel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reservasihotel module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Reservasihotel diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
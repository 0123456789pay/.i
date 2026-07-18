// JavaScript untuk Penanggulanganbencana
document.addEventListener('DOMContentLoaded', function() {
    console.log('Penanggulanganbencana module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Penanggulanganbencana diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
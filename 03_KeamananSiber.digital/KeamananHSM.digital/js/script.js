// JavaScript untuk Keamananhsm
document.addEventListener('DOMContentLoaded', function() {
    console.log('Keamananhsm module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Keamananhsm diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
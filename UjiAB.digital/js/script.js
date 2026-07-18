// JavaScript untuk Ujiab
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ujiab module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Ujiab diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
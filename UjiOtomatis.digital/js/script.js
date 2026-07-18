// JavaScript untuk Ujiotomatis
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ujiotomatis module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Ujiotomatis diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
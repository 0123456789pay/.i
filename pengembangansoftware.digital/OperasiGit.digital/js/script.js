// JavaScript untuk Operasigit
document.addEventListener('DOMContentLoaded', function() {
    console.log('Operasigit module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Operasigit diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
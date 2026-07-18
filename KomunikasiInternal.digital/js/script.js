// JavaScript untuk Komunikasiinternal
document.addEventListener('DOMContentLoaded', function() {
    console.log('Komunikasiinternal module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Komunikasiinternal diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
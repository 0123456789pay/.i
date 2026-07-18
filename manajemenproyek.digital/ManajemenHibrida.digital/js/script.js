// JavaScript untuk Manajemenhibrida
document.addEventListener('DOMContentLoaded', function() {
    console.log('Manajemenhibrida module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Manajemenhibrida diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
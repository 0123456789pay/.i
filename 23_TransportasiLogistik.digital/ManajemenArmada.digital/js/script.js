// JavaScript untuk Manajemenarmada
document.addEventListener('DOMContentLoaded', function() {
    console.log('Manajemenarmada module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Manajemenarmada diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
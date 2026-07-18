// JavaScript untuk Dex Nft
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dex Nft module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Dex Nft diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
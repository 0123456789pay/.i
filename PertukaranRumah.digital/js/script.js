// JavaScript untuk Pertukaranrumah
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pertukaranrumah module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pertukaranrumah diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
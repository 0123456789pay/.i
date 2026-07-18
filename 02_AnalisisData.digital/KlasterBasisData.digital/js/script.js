// JavaScript untuk Klasterbasisdata
document.addEventListener('DOMContentLoaded', function() {
    console.log('Klasterbasisdata module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Klasterbasisdata diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
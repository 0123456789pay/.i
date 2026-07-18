// JavaScript untuk Hakcipta
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hakcipta module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Hakcipta diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
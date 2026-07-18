// JavaScript untuk Inkubatorbisnis
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inkubatorbisnis module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Inkubatorbisnis diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
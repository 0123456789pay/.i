// JavaScript untuk Pinsertifikat
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pinsertifikat module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pinsertifikat diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
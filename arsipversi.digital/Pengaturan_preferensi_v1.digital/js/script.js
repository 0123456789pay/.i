// JavaScript untuk Pengaturan Preferensi V1
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pengaturan Preferensi V1 module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pengaturan Preferensi V1 diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
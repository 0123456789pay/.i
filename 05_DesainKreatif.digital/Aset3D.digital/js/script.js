// JavaScript untuk Aset3D
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aset3D module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Aset3D diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
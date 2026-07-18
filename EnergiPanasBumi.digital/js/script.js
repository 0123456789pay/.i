// JavaScript untuk Energipanasbumi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Energipanasbumi module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Energipanasbumi diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
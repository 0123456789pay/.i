// JavaScript untuk Prosesbatch
document.addEventListener('DOMContentLoaded', function() {
    console.log('Prosesbatch module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Prosesbatch diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
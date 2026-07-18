// JavaScript untuk Neobanker
document.addEventListener('DOMContentLoaded', function() {
    console.log('Neobanker module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Neobanker diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
// JavaScript untuk Pelatihkehidupan
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pelatihkehidupan module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pelatihkehidupan diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
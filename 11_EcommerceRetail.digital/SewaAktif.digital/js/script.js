// JavaScript untuk Sewaaktif
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sewaaktif module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Sewaaktif diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
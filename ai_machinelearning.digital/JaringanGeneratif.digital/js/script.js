// JavaScript untuk Jaringangeneratif
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jaringangeneratif module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Jaringangeneratif diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
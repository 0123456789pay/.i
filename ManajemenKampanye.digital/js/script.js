// JavaScript untuk Manajemenkampanye
document.addEventListener('DOMContentLoaded', function() {
    console.log('Manajemenkampanye module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Manajemenkampanye diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}
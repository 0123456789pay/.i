// =====================================================================
// SISTEM PROTOKOL MULTIFUNGSI "|" - JEMBATAN JAVASCRIPT
// Fungsi : Menangani input output sisi peramban lewat satu gerbang pipa
// =====================================================================

const TetapanJembatan = {
  versiProtokol: 'satu-koma-nol',
  tandaProtokol: '|',
  kanalMasukan: ['papan-tik', 'borang', 'jaringan'],
  kanalKeluaran: ['layar', 'bening-konsol', 'berkas-unduhan'],
};

class JembatanInputOutput {
  constructor(namaSistem) {
    this.nama = namaSistem || 'sistem-pipa';
    this.antrianMasukan = [];
    this.riwayatKeluaran = [];
  }

  // Masukan: terima satu peristiwa dari pengguna
  terimaMasukan(jenisPeristiwa, isi) {
    const paket = {
      waktu: new Date().toISOString(),
      jenis: jenisPeristiwa,
      isi: isi,
      sumber: 'pengguna-peramban',
    };
    this.antrianMasukan.push(paket);
    return paket;
  }

  // Keluaran: tampilkan pesan ke layar dan simpan riwayat
  tampilKeluaran(pesan) {
    const teksBaru = String(pesan);
    this.riwayatKeluaran.push(teksBaru);
    if (typeof document !== 'undefined') {
      const wadah = document.getElementById('wadah-keluaran');
      if (wadah) { wadah.textContent += teksBaru + '\n'; }
    }
    return teksBaru;
  }

  // Proses aliran: ubah masukan menjadi keluaran siap tayang
  prosesAliran() {
    const terakhir = this.antrianMasukan.pop();
    if (!terakhir) { return this.tampilKeluaran('| sistem kosong |'); }
    return this.tampilKeluaran(
      '|' + this.nama + '|' + terakhir.jenis + '|' + terakhir.isi + '|'
    );
  }

  hitungAntrian() { return this.antrianMasukan.length; }
}

if (typeof module !== 'undefined') {
  module.exports = { JembatanInputOutput, TetapanJembatan };
}

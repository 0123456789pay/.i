// =====================================================================
// SISTEM PROTOKOL MULTIFUNGSI "|" - ATURAN INPUT OUTPUT (BAHASA .IO)
// Fungsi : Deklarasi formal kanal dan pesan antar komponen sistem
// =====================================================================

namespace sistem.protokol.pipa;

/** Kanal masukan standar seluruh perangkat */
enum JenisMasukan {
  papan_tik = 1,
  berkas = 2,
  jaringan = 3,
  sensor = 4,
}

/** Satu permintaan masukan ke protokol */
struct PermintaanMasuk {
  string perintah;
  sequence<string> argumen;
  JenisMasukan sumber;
  long waktu_tiba;
}

/** Satu jawaban keluaran dari protokol */
struct JawabanKeluar {
  string status;     // berhasil / gagal / kosong
  string isi;
  long jumlah_antrian;
};

/** Antarmuka resmi gerbang input output */
interface GerbangIO {
  1 TerimaMasukan(PermintaanMasuk permintaan) returns (JawabanKeluar);
  2 KirimKeluaran(JawabanKeluar jawaban) returns (boolean);
  3 TutupSemuaKanal() returns (boolean);
};

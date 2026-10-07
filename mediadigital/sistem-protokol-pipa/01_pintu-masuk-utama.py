# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PINTU MASUK UTAMA
# Fungsi : Menangani seluruh sistem input output (IO) secara terpusat
# Bahasa : Kode ditulis dalam Bahasa Indonesia
# =====================================================================

from sistem_inti import SistemInti


def jalankan(argv=None):
    """Titik masuk utama protokol '|' untuk semua operasi masukan/keluaran."""
    sistem = SistemInti()
    sistem.baca_konfigurasi()
    sistem.masukan.terima("mulai", "protokol pipa aktif")

    perintah = argv or ["bantuan"]
    nama_perintah = str(perintah[0]).lower()

    hasil = sistem.sambungkan(nama_perintah, *perintah[1:])
    sistem.putuskan()
    return hasil


if __name__ == "__main__":
    import sys
    jalankan(sys.argv[1:])

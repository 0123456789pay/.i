# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PENJADWAL TUGAS
# Fungsi : Menjadwalkan pekerjaan input output secara berkala
# =====================================================================

import time


class PenjadwalTugas:
    """Perencana eksekusi tugas IO menurut waktu dan prioritas."""

    def __init__(self):
        self.daftar_tugas = []

    def tambah(self, nama, fungsi, jeda_detik=60, prioritas=5):
        """Daftarkan satu tugas berkala ke dalam jadwal."""
        self.daftar_tugas.append({
            "nama": nama,
            "fungsi": fungsi,
            "jeda": jeda_detik,
            "prioritas": prioritas,
            "terakhir": 0.0,
        })
        self.daftar_tugas.sort(key=lambda t: t["prioritas"])
        return len(self.daftar_tugas)

    def jalankan_yang_tepat_waktu(self):
        """Jalankan tugas yang sudah jatuh tempo; kembalikan jumlah jalan."""
        sekarang = time.time()
        dijalankan = 0
        for tugas in self.daftar_tugas:
            if sekarang - tugas["terakhir"] >= tugas["jeda"]:
                try:
                    tugas["fungsi"]()
                except Exception:
                    pass
                tugas["terakhir"] = sekarang
                dijalankan += 1
        return dijalankan

    def kosongkan(self):
        """Hapus seluruh jadwal tugas."""
        self.daftar_tugas.clear()

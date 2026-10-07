# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PENGATUR KONFIGURASI
# Fungsi : Membaca, memvalidasi, dan menyimpan pengaturan sistem IO
# =====================================================================

import json
import os

BERKAS_BAKU = "12_pengaturan-konfigurasi.json"


class PengaturKonfigurasi:
    """Penjaga nilai pengaturan seluruh kanal input output."""

    def __init__(self, jalur_berkas=BERKAS_BAKU):
        self.jalur = jalur_berkas
        self.nilai = {}

    def muat(self):
        """Muat konfigurasi dari berkas JSON ke dalam memori."""
        if os.path.exists(self.jalur):
            with open(self.jalur, "r", encoding="utf-8") as f:
                self.nilai = json.load(f)
        return self.nilai

    def simpan(self):
        """Simpan konfigurasi saat ini kembali ke berkas JSON."""
        with open(self.jalur, "w", encoding="utf-8") as f:
            json.dump(self.nilai, f, ensure_ascii=False, indent=2)
        return True

    def ubah(self, kunci, nilai):
        """Ubah satu nilai pengaturan dengan kunci berbahasa Indonesia."""
        self.nilai[kunci] = nilai
        return self.nilai

    def ambil(self, kunci, cadangan=None):
        """Ambil satu nilai pengaturan, kembalikan cadangan bila kosong."""
        return self.nilai.get(kunci, cadangan)

    def validasi(self):
        """Periksa kelengkapan kunci wajib konfigurasi."""
        kunci_wajib = ["sistem", "versi", "bahasa_utama", "aktif"]
        hilang = [k for k in kunci_wajib if k not in self.nilai]
        return {"layak": len(hilang) == 0, "kunci_hilang": hilang}

# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - MANAJER BERKAS INPUT OUTPUT
# Fungsi : Operasi baca/tulis/salin/pindah berkas lewat satu gerbang
# =====================================================================

import os
import shutil


class ManajerBerkas:
    """Pengelola berkas terpusat di bawah protokol '|'."""

    def __init__(self, akar="/workspace/mediadigital"):
        self.akar = akar

    def baca(self, jalur):
        """Masukan: baca isi berkas menjadi teks."""
        with open(os.path.join(self.akar, jalur), "r", encoding="utf-8") as f:
            return f.read()

    def tulis(self, jalur, isi):
        """Keluaran: tulis teks ke berkas (dirimu otomatis dibuat)."""
        tujuan = os.path.join(self.akar, jalur)
        os.makedirs(os.path.dirname(tujuan), exist_ok=True)
        with open(tujuan, "w", encoding="utf-8") as f:
            f.write(str(isi))
        return tujuan

    def salin(self, asal, tujuan):
        """Salin satu berkas dalam wilayah sistem."""
        return shutil.copy2(os.path.join(self.akar, asal),
                            os.path.join(self.akar, tujuan))

    def pindah(self, asal, tujuan):
        """Pindahkan berkas antar folder."""
        return shutil.move(os.path.join(self.akar, asal),
                           os.path.join(self.akar, tujuan))

    def hapus(self, jalur):
        """Hapus satu berkas bila ada."""
        target = os.path.join(self.akar, jalur)
        if os.path.isfile(target):
            os.remove(target)
            return True
        return False

    def daftar(self, folder=""):
        """Senarai nama berkas pada sebuah folder."""
        return sorted(os.listdir(os.path.join(self.akar, folder)))

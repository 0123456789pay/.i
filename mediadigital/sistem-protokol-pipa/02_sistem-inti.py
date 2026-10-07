# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - SISTEM INTI
# Fungsi : Jantung protokol yang merutekan seluruh input dan output
# =====================================================================

import json
import os

from antarmuka_input import AntarmukaInput
from antarmuka_output import AntarmukaOutput
from kanal_aliran_data import KanalAliranData
from kamus_istilah import TERJEMAHAN_KODE as KAMUS


class SistemInti:
    """Pusat kendali protokol multifungsi '|' penangan input output."""

    def __init__(self, berkas_konfigurasi="konfigurasi-sistem.json"):
        self.masukan = AntarmukaInput()
        self.keluaran = AntarmukaOutput()
        self.aliran = KanalAliranData()
        self.berkas_konfigurasi = berkas_konfigurasi
        self.konfigurasi = {}
        self.terpasang = False

    def baca_konfigurasi(self):
        """Muat konfigurasi sistem dari berkas JSON bila tersedia."""
        if os.path.exists(self.berkas_konfigurasi):
            with open(self.berkas_konfigurasi, "r", encoding="utf-8") as f:
                self.konfigurasi = json.load(f)
        else:
            self.konfigurasi = {"versi": "1.0.0", "aktif": True}
        return self.konfigurasi

    def sambungkan(self, nama_perintah="bantuan", *argumen):
        """Sambungkan satu perintah ke rute input-output protokol."""
        self.terpasang = True
        data_masuk = self.masukan.terima(nama_perintah, *argumen)
        data_olah = self.aliran.proses(data_masuk)
        data_keluar = self.keluaran.kirim(data_olah)
        return data_keluar

    def putuskan(self):
        """Tutup semua kanal input output dengan aman."""
        self.masukan.tutup()
        self.keluaran.tutup()
        self.aliran.kosongkan()
        self.terpasang = False

    def daftar_perintah(self):
        """Kembalikan daftar perintah yang dikenali protokol."""
        return sorted(KAMUS.keys())

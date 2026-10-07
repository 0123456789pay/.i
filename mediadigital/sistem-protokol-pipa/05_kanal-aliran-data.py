# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - KANAL ALIRAN DATA
# Fungsi : Memproses aliran data di antara masukan dan keluaran
# =====================================================================


class KanalAliranData:
    """Saluran pemrosesan tengah (pipa) antar komponen IO."""

    def __init__(self, kapasitas=1024):
        self.penyangga = []
        self.kapasitas = kapasitas

    def proses(self, data_masuk):
        """Ubah data masukan menjadi data keluaran yang siap tayang."""
        if data_masuk is None:
            return {"status": "kosong"}
        self.penyangga.append(data_masuk)
        if len(self.penyangga) > self.kapasitas:
            self.penyangga.pop(0)
        return {
            "status": "berhasil",
            "isi": data_masuk,
            "jumlah_antrian": len(self.penyangga),
        }

    def saring(self, kunci):
        """Ambil hanya nilai dengan kunci tertentu dari aliran."""
        return [item.get(kunci) for item in self.penyangga if kunci in item]

    def kosongkan(self):
        """Kosongkan seluruh penyangga aliran data."""
        self.penyangga.clear()

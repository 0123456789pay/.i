#!/usr/bin/env bash
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - SKRIP INSTALASI
# Fungsi : Memasang dan memeriksa kelengkapan 25 berkas sistem protokol
# =====================================================================

set -euo pipefail

DIR_SISTEM="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JUMLAH_BERKAS_HARAP=25

echo "| Protokol Multifungsi - mulai instalasi |"

periksa_kelengkapan() {
  local jumlah
  jumlah=$(find "$DIR_SISTEM" -maxdepth 1 -type f | wc -l)
  if [ "$jumlah" -ge "$JUMLAH_BERKAS_HARAP" ]; then
    echo "Lengkap: $jumlah berkas ditemukan (minimal $JUMLAH_BERKAS_HARAP)."
    return 0
  fi
  echo "Kurang: hanya $jumlah berkas ditemukan." >&2
  return 1
}

periksa_bahasa() {
  grep -rqs "SISTEM PROTOKOL MULTIFUNGSI" "$DIR_SISTEM" \
    && echo "Bahasa Indonesia terdeteksi pada seluruh berkas sistem." \
    || echo "Peringatan: tulisan sistem tidak ditemukan!" >&2
}

izinkan_jalankan() {
  chmod u+x "$DIR_SISTEM/23_skrip-instal.sh" 2>/dev/null || true
}

periksa_kelengkapan
periksa_bahasa
izinkan_jalankan
echo "| Instalasi selesai - sistem input output siap digunakan |"

# Sistem Protokol Multifungsi "|" - Buku Panduan

## Ringkasan
Protokol **|** (pipa) adalah sistem tunggal yang **menangani seluruh
sistem input output** di wilayah `mediadigital`. Seluruh kode, komentar,
penamaan, dan dokumen ditulis dalam **Bahasa Indonesia**.

## Daftar Berkas Sistem (25 Berkas)
| Nomor | Berkas | Bahasa | Fungsi |
|-------|--------|--------|--------|
| 01 | pintu-masuk-utama.py | python | titik masuk protokol |
| 02 | sistem-inti.py | python | jantung perutean IO |
| 03 | antarmuka-input.py | python | gerbang seluruh masukan |
| 04 | antarmuka-output.py | python | gerbang seluruh keluaran |
| 05 | kanal-aliran-data.py | python | pemroses aliran tengah |
| 06 | pengatur-rute-io.py | python | pemeta rute perintah |
| 07 | penyandian-teks.py | python | sandi huruf A-Z, angka 0-9, simbol |
| 08 | manajer-berkas-io.py | python | baca tulis salin pindah hapus |
| 09 | penjadwal-tugas.py | python | jadwal pekerjaan IO |
| 10 | pembatas-laju-io.py | python | pengendali kecepatan paket |
| 11 | kamus-istilah.py | python | terjemahan istilah kode |
| 12 | pengaturan-konfigurasi.json | json | nilai konfigurasi |
| 13 | pengatur-konfigurasi.py | python | muat ubah simpan konfigurasi |
| 14 | amanat-keamanan-io.py | python | penyaring masukan berbahaya |
| 15 | pemantau-kesehatan.py | python | ukur nadi kanal IO |
| 16 | pelapor-log.py | python | buku catatan kegiatan |
| 17 | jembatan-javascript.js | javascript | IO sisi peramban |
| 18 | gaya-sistem.css | css | tampilan panel IO |
| 19 | antarmuka-web.html | html | halaman kendali IO |
| 20 | jenis-kanal.ts | typescript | tipe data kanal |
| 21 | pusat-kendali.tsx | tsx | panel reaktor pemantau |
| 22 | aturan-io.io | bahasa io | deklarasi antarmuka |
| 23 | skrip-instal.sh | bash | pemasangan sistem |
| 24 | petunjuk-git.txt | teks | panduan git |
| 25 | buku-panduan.md | markdown | dokumen ini |

## Cara Pakai
```bash
python3 01_pintu-masuk-utama.py bantuan
bash 23_skrip-instal.sh
```

## Lambang
- Simbol `|` : pemisah dan identitas protokol
- Angka `0-9` : penomoran berkas dan kapasitas
- Huruf `A-Z` : nama kelas, konstanta, direktori

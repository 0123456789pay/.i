#!/bin/bash

# Script untuk rename file komponen
# Mengubah huruf ke-1 dan ke-5 menjadi HURUF BESAR

cd /workspace

for file in *.js *.css; do
    if [ -f "$file" ]; then
        # Dapatkan nama file tanpa ekstensi
        name="${file%.*}"
        ext="${file##*.}"
        
        # Jika nama file memiliki minimal 5 karakter
        if [ ${#name} -ge 5 ]; then
            # Ambil karakter ke-1 (index 0) dan ke-5 (index 4)
            char1="${name:0:1}"
            char5="${name:4:1}"
            
            # Ubah ke uppercase
            char1_upper=$(echo "$char1" | tr '[:lower:]' '[:upper:]')
            char5_upper=$(echo "$char5" | tr '[:lower:]' '[:upper:]')
            
            # Bangun nama baru
            newname="${char1_upper}${name:1:3}${char5_upper}${name:5}"
            
            # Rename file
            if [ "$name" != "$newname" ]; then
                mv "$file" "${newname}.${ext}"
                echo "Renamed: $file -> ${newname}.${ext}"
            fi
        fi
    fi
done

echo "Rename selesai!"

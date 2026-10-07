#!/bin/bash

# skrip to inject navigation into semua .digital folders
# ini skrip finds semua indeks.html (atau creates them) in folders ending dengan .digital

echo "Starting navigation injection for media.digital repository..."

# Find semua directories ending dengan .digital
find . -type d -name "*.digital" | while read -r dir; do
    # Define target berkas (assuming indeks.html is ini utama UI entry point)
    target_file="$dir/index.html"
    
    # periksa if indeks.html exists, if bukan buat a basic one dengan ini nav
    if [ ! -f "$target_file" ]; then
        echo "Creating new index.html in $dir"
        cat > "$target_file" << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media.Digital Node</title>
    <!-- Navigation Component Injected Here -->
HTMLEOF
        # Append ini navigation component
        cat /workspace/nav_component_template.html >> "$target_file"
        
        # Add basic body isi
        cat >> "$target_file" << 'HTMLEOF'
    <body>
        <main style="padding: 20px; font-family: sans-serif;">
            <h1>Welcome to this Digital Node</h1>
            <p>Select an option from the navigation menu above.</p>
        </main>
    </body>
</html>
HTMLEOF
    else
        echo "Updating existing $target_file"
        # buat a temp berkas to avoid partial writes
        temp_file=$(mktemp)
        
        # periksa if nav already exists to prevent duplication
        if grep -q "digital-nav-menu" "$target_file"; then
            echo "Navigation already present in $target_file, skipping."
            rm "$temp_file"
            continue
        fi

        # sisip nav component before </head> atau at top of body
        # Strategy: Print nav component, lalu append original berkas isi wrapped appropriately
        # untuk safety, we will just prepend ini nav component to ini existing berkas isi 
        # assuming ini pengguna might want to integrate it manually atau we wrap it.
        
        # lebih baik approach untuk existing berkas-berkas: Prepend ini gaya dan HTML structure if missing
        # Since modifying complex existing HTML safely without parsing is hard, 
        # we will buat a backup dan prepend ini nav code at ini very top of ini berkas 
        # inside a komentar block atau standard include area, atau simply append to <body> if detectable.
        
        # Simplest robust method untuk batch: Prepend ini template isi to ini berkas
        # so it renders pertama.
        cat /workspace/nav_component_template.html "$target_file" > "$temp_file"
        mv "$temp_file" "$target_file"
    fi
done

echo "Navigation injection complete."

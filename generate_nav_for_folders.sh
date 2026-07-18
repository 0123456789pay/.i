#!/bin/bash

# Script to inject navigation into all .digital folders
# This script finds all index.html (or creates them) in folders ending with .digital

echo "Starting navigation injection for media.digital repository..."

# Find all directories ending with .digital
find . -type d -name "*.digital" | while read -r dir; do
    # Define target file (assuming index.html is the main UI entry point)
    target_file="$dir/index.html"
    
    # Check if index.html exists, if not create a basic one with the nav
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
        # Append the navigation component
        cat /workspace/nav_component_template.html >> "$target_file"
        
        # Add basic body content
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
        # Create a temp file to avoid partial writes
        temp_file=$(mktemp)
        
        # Check if nav already exists to prevent duplication
        if grep -q "digital-nav-menu" "$target_file"; then
            echo "Navigation already present in $target_file, skipping."
            rm "$temp_file"
            continue
        fi

        # Insert nav component before </head> or at top of body
        # Strategy: Print nav component, then append original file content wrapped appropriately
        # For safety, we will just prepend the nav component to the existing file content 
        # assuming the user might want to integrate it manually or we wrap it.
        
        # Better approach for existing files: Prepend the style and HTML structure if missing
        # Since modifying complex existing HTML safely without parsing is hard, 
        # we will create a backup and prepend the nav code at the very top of the file 
        # inside a comment block or standard include area, OR simply append to <body> if detectable.
        
        # Simplest robust method for batch: Prepend the template content to the file
        # so it renders first.
        cat /workspace/nav_component_template.html "$target_file" > "$temp_file"
        mv "$temp_file" "$target_file"
    fi
done

echo "Navigation injection complete."

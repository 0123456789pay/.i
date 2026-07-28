import json
import os
from pathlib import Path

# Generate function mapping
functions_dir = Path('/workspace/icon-maker-project/functions')
menus_dir = Path('/workspace/icon-maker-project/menus')

# Scan all functions
function_map = []
func_files = sorted([f for f in functions_dir.glob('*.js')])

for i, func_file in enumerate(func_files[:5000], 1):
    content = func_file.read_text()
    # Extract info from file
    func_id = f"FUNC-{i:05d}"
    name = func_file.stem
    parts = name.split('_')
    
    function_map.append({
        "id": func_id,
        "name": name,
        "filename": func_file.name,
        "category": parts[1] if len(parts) > 1 else "general",
        "style": parts[2] if len(parts) > 2 else "default",
        "shape": parts[3] if len(parts) > 3 else "basic",
        "index": i,
        "path": f"functions/{func_file.name}"
    })

# Save function mapping
with open(menus_dir / 'function_mapping.json', 'w') as f:
    json.dump({
        "total": len(function_map),
        "functions": function_map
    }, f, indent=2)

print(f"Mapped {len(function_map)} functions")

# Load existing menus and create enhanced mapping
with open(menus_dir / 'all_menus.json', 'r') as f:
    menus = json.load(f)

# Create category hierarchy
category_tree = {}
for menu in menus:
    cat = menu.get('category', 'Uncategorized')
    subcat = menu.get('subcategory', 'General')
    layout = menu.get('layout', 'Default')
    
    if cat not in category_tree:
        category_tree[cat] = {}
    if subcat not in category_tree[cat]:
        category_tree[cat][subcat] = []
    
    menu['functionLinks'] = []
    # Link related functions based on category
    for func in function_map:
        if func['category'].lower() in cat.lower() or cat.lower() in func['category'].lower():
            menu['functionLinks'].append(func['id'])
            if len(menu['functionLinks']) >= 5:
                break
    
    category_tree[cat][subcat].append(menu)

# Save enhanced menu mapping
with open(menus_dir / 'menu_mapping.json', 'w') as f:
    json.dump({
        "total": len(menus),
        "categories": category_tree,
        "menus": menus
    }, f, indent=2)

print(f"Mapped {len(menus)} menus with categories")
print("Mapping complete!")

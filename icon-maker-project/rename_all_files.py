#!/usr/bin/env python3
import os
import json
import re

menus_dir = '/workspace/icon-maker-project/menus'
functions_dir = '/workspace/icon-maker-project/functions'

# Mapping layout names to remove spaces
layout_mapping = {
    'Timeline Layout': 'Timeline',
    'Tree Layout': 'Tree',
    'Graph Layout': 'Graph',
    'Chart Layout': 'Chart',
    'Table Layout': 'Table',
    'Form Layout': 'Form',
    'Modal Layout': 'Modal',
    'Sidebar Layout': 'Sidebar',
    'Header Layout': 'Header',
    'Footer Layout': 'Footer',
    'Dashboard Layout': 'Dashboard',
    'Profile Layout': 'Profile',
    'Feed Layout': 'Feed',
    'Search Layout': 'Search',
    'Filter Layout': 'Filter',
    'Grid Layout': 'Grid',
    'Flex Layout': 'Flex',
    'Stack Layout': 'Stack',
    'Flow Layout': 'Flow',
    'Masonry Layout': 'Masonry',
    'Carousel Layout': 'Carousel',
    'List Layout': 'List',
    'Card Layout': 'Card',
    'Tile Layout': 'Tile',
    'Gallery Layout': 'Gallery'
}

def clean_name(name):
    """Remove spaces and convert to consistent format"""
    return name.replace(' ', '')

def get_menu_filename(layout, category, subcategory):
    """Generate new menu filename"""
    layout_clean = layout_mapping.get(layout, layout).replace(' ', '')
    category_clean = category.replace(' ', '')
    subcategory_clean = subcategory.replace(' ', '')
    
    # Replace 'Shapes' with 'Wujud'
    category_clean = re.sub(r'Shapes', 'Wujud', category_clean, flags=re.IGNORECASE)
    subcategory_clean = re.sub(r'Shapes', 'Wujud', subcategory_clean, flags=re.IGNORECASE)
    
    return f"{layout_clean}{category_clean}{subcategory_clean}.json"

def get_function_filename(layout, category, subcategory, icon_type):
    """Generate new function filename"""
    layout_clean = layout_mapping.get(layout, layout).replace(' ', '')
    category_clean = category.replace(' ', '')
    subcategory_clean = subcategory.replace(' ', '')
    
    # Replace 'Shapes' with 'Wujud'
    category_clean = re.sub(r'Shapes', 'Wujud', category_clean, flags=re.IGNORECASE)
    subcategory_clean = re.sub(r'Shapes', 'Wujud', subcategory_clean, flags=re.IGNORECASE)
    
    # Determine icon type suffix
    icon_suffix = ''
    if icon_type:
        icon_clean = icon_type.replace(' Icon', '').replace(' ', '')
        icon_suffix = f'_{icon_clean}'
    
    return f"{layout_clean}{category_clean}{subcategory_clean}{icon_suffix}.js"

# Process menu files
menu_renames = []
for filename in os.listdir(menus_dir):
    if filename.startswith('menu_') and filename.endswith('.json') and filename != 'menu_mapping.json':
        filepath = os.path.join(menus_dir, filename)
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
            
            layout = data.get('layout', '')
            category = data.get('category', '')
            subcategory = data.get('subcategory', '')
            
            if layout and category and subcategory:
                new_filename = get_menu_filename(layout, category, subcategory)
                if new_filename != filename:
                    menu_renames.append((filename, new_filename))
        except Exception as e:
            print(f"Error processing {filename}: {e}")

# Rename menu files
renamed_menus = {}
for old_name, new_name in menu_renames:
    old_path = os.path.join(menus_dir, old_name)
    new_path = os.path.join(menus_dir, new_name)
    
    # Handle duplicate names by adding counter
    counter = 1
    base_new_name = new_name
    while os.path.exists(new_path):
        name_parts = base_new_name.rsplit('.', 1)
        new_name = f"{name_parts[0]}_{counter}.{name_parts[1]}"
        new_path = os.path.join(menus_dir, new_name)
        counter += 1
    
    os.rename(old_path, new_path)
    renamed_menus[old_name] = new_name
    print(f"Renamed menu: {old_name} -> {new_name}")

# Process function files
function_renames = []
for filename in os.listdir(functions_dir):
    if filename.endswith('.js'):
        # Parse the function filename to extract info
        # Format: {type}_{style}_{category}_{shape}_{number}.js
        match = re.match(r'(\w+)_(\w+)_(.+?)_(\w+)_(\d+)\.js$', filename)
        if match:
            func_type, style, category_part, shape, number = match.groups()
            
            # Try to find corresponding menu to get layout info
            menu_file = f'menu_{number.zfill(5)}.json'
            menu_path = os.path.join(menus_dir, menu_file)
            
            if os.path.exists(menu_path):
                try:
                    with open(menu_path, 'r') as f:
                        menu_data = json.load(f)
                    
                    layout = menu_data.get('layout', '')
                    category = menu_data.get('category', '')
                    subcategory = menu_data.get('subcategory', '')
                    icon_type = menu_data.get('iconType', '')
                    
                    if layout and category and subcategory:
                        new_filename = get_function_filename(layout, category, subcategory, icon_type)
                        function_renames.append((filename, new_filename))
                except Exception as e:
                    print(f"Error reading menu for {filename}: {e}")

# Rename function files
renamed_functions = {}
for old_name, new_name in function_renames:
    old_path = os.path.join(functions_dir, old_name)
    new_path = os.path.join(functions_dir, new_name)
    
    # Handle duplicate names by adding counter
    counter = 1
    base_new_name = new_name
    while os.path.exists(new_path):
        name_parts = base_new_name.rsplit('.', 1)
        new_name = f"{name_parts[0]}_{counter}.{name_parts[1]}"
        new_path = os.path.join(functions_dir, new_name)
        counter += 1
    
    os.rename(old_path, new_path)
    renamed_functions[old_name] = new_name
    print(f"Renamed function: {old_name} -> {new_name}")

print(f"\nTotal menus renamed: {len(renamed_menus)}")
print(f"Total functions renamed: {len(renamed_functions)}")

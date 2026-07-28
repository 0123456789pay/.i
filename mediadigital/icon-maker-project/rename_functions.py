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

# Build mapping from menu numbers to their data
menu_data_map = {}
for filename in os.listdir(menus_dir):
    if filename.endswith('.json') and filename != 'menu_mapping.json':
        filepath = os.path.join(menus_dir, filename)
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
            
            # Extract number from original filename pattern or use order
            order = data.get('order', 0)
            menu_data_map[order] = {
                'layout': data.get('layout', ''),
                'category': data.get('category', ''),
                'subcategory': data.get('subcategory', ''),
                'iconType': data.get('iconType', '')
            }
        except Exception as e:
            pass

# Process function files
function_renames = []
for filename in os.listdir(functions_dir):
    if filename.endswith('.js'):
        # Parse the function filename to extract number
        match = re.search(r'_(\d+)\.js$', filename)
        if match:
            number = int(match.group(1))
            
            # Try to find corresponding menu data
            if number in menu_data_map:
                menu_info = menu_data_map[number]
                layout = menu_info['layout']
                category = menu_info['category']
                subcategory = menu_info['subcategory']
                icon_type = menu_info['iconType']
                
                if layout and category and subcategory:
                    new_filename = get_function_filename(layout, category, subcategory, icon_type)
                    if new_filename != filename:
                        function_renames.append((filename, new_filename))

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

print(f"\nTotal functions renamed: {len(renamed_functions)}")

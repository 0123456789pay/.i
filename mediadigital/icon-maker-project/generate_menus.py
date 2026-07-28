import os
import json

menus_dir = "/workspace/icon-maker-project/menus"
os.makedirs(menus_dir, exist_ok=True)

menu_categories = [
    "Basic Shapes", "Advanced Shapes", "Icons", "Symbols", "Arrows",
    "Flags", "Weather", "Technology", "Business", "Education",
    "Medical", "Food", "Animals", "Plants", "Sports",
    "Music", "Transport", "Communication", "Security", "Files",
    "Folders", "Users", "Settings", "Tools", "Media",
    "Navigation", "Social Media", "Payment", "Gaming", "Science",
    "Art", "Fashion", "Home", "Office", "Travel",
    "Holidays", "Zodiac", "Religion", "Maps", "Time",
    "Numbers", "Letters", "Currency", "Units", "Math"
]

menu_subcategories = [
    "Simple", "Complex", "Outlined", "Filled", "Colored",
    "Gradient", "Animated", "Static", "Minimal", "Detailed",
    "Classic", "Modern", "Retro", "Future", "Abstract",
    "Realistic", "Cartoon", "Professional", "Casual", "Elegant",
    "Bold", "Light", "Dark", "Colorful", "Monochrome",
    "Duotone", "Tritone", "Multicolor", "Pastel", "Vibrant"
]

design_layouts = [
    "Grid Layout", "Flex Layout", "Stack Layout", "Flow Layout", "Masonry Layout",
    "Carousel Layout", "List Layout", "Card Layout", "Tile Layout", "Gallery Layout",
    "Timeline Layout", "Tree Layout", "Graph Layout", "Chart Layout", "Table Layout",
    "Form Layout", "Modal Layout", "Sidebar Layout", "Header Layout", "Footer Layout",
    "Dashboard Layout", "Profile Layout", "Feed Layout", "Search Layout", "Filter Layout"
]

icon_types = [
    "SVG Icon", "PNG Icon", "ICO Icon", "Font Icon", "Base64 Icon",
    "Vector Icon", "Raster Icon", "Animated Icon", "Static Icon", "Interactive Icon"
]

print("Generating 3500 menu items...")
menus_data = []

for i in range(1, 3501):
    category = menu_categories[(i-1) % len(menu_categories)]
    subcategory = menu_subcategories[(i-1) % len(menu_subcategories)]
    layout = design_layouts[(i-1) % len(design_layouts)]
    icon_type = icon_types[(i-1) % len(icon_types)]
    
    has_icon = i % 3 != 0
    
    menu_item = {
        'id': f'MENU-{str(i).zfill(5)}',
        'name': f'{subcategory} {category} {i}',
        'category': category,
        'subcategory': subcategory,
        'layout': layout,
        'iconType': icon_type if has_icon else None,
        'hasIcon': has_icon,
        'path': f'Icon Maker/{category}/{subcategory}/Item {i}',
        'parentId': f'MENU-{str((i-1)//10*10 + 1).zfill(5)}' if i > 10 else None,
        'level': min((i-1)//100 + 1, 5),
        'order': i
    }
    
    menus_data.append(menu_item)
    
    filename = f"menu_{str(i).zfill(5)}.json"
    filepath = os.path.join(menus_dir, filename)
    
    icon_class = icon_type.replace(' ', '-').lower() + "-icon" if icon_type else "text-only-menu"
    
    content = '''{
    "id": "''' + menu_item['id'] + '''",
    "name": "''' + menu_item['name'] + '''",
    "category": "''' + menu_item['category'] + '''",
    "subcategory": "''' + menu_item['subcategory'] + '''",
    "layout": "''' + menu_item['layout'] + '''",
    "iconType": ''' + ('"' + menu_item['iconType'] + '"' if menu_item['iconType'] else 'null') + ''',
    "hasIcon": ''' + ('true' if menu_item['hasIcon'] else 'false') + ''',
    "path": "''' + menu_item['path'] + '''",
    "parentId": ''' + ('"' + menu_item['parentId'] + '"' if menu_item['parentId'] else 'null') + ''',
    "level": ''' + str(menu_item['level']) + ''',
    "order": ''' + str(menu_item['order']) + ''',
    "metadata": {
        "createdAt": "2024-01-01T00:00:''' + str(i%60).zfill(2) + '''Z",
        "updatedAt": "2024-01-01T00:00:''' + str(i%60).zfill(2) + '''Z",
        "version": "1.0.''' + str(i) + '''",
        "status": "active",
        "visibility": "public",
        "permissions": ["read", "write", "execute"],
        "tags": ["''' + category.lower() + '''", "''' + subcategory.lower() + '''", "''' + layout.lower() + '''", "icon-maker"],
        "description": "Menu item ''' + str(i) + ''' for ''' + subcategory + ''' ''' + category + ''' with ''' + layout + '''"
    },
    "children": [],
    "actions": {
        "onClick": "handleMenuClick(''' + str(i) + ''')",
        "onHover": "handleMenuHover(''' + str(i) + ''')",
        "onContextMenu": "handleMenuContext(''' + str(i) + ''')"
    },
    "styling": {
        "className": "menu-item-''' + str(i) + '''",
        "iconClass": "''' + icon_class + '''",
        "theme": "default",
        "size": "medium",
        "color": "#333333",
        "hoverColor": "#007bff",
        "activeColor": "#0056b3"
    }
}
'''
    
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Created 3500 menu files in {menus_dir}")

with open(os.path.join(menus_dir, 'all_menus.json'), 'w') as f:
    json.dump(menus_data, f, indent=2)

print("Created all_menus.json with complete menu structure")
print("\nGeneration complete!")
print(f"- 3500 menu files in: {menus_dir}")

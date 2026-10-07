import os
import random

# buat functions direktori structure
functions_dir = "/workspace/icon-maker-project/functions"
menus_dir = "/workspace/icon-maker-project/menus"
assets_dir = "/workspace/icon-maker-project/assets"

os.makedirs(functions_dir, exist_ok=True)
os.makedirs(menus_dir, exist_ok=True)
os.makedirs(assets_dir, exist_ok=True)

# fungsi jenis-jenis untuk 5000 fungsi berkas-berkas
function_types = [
    "createIcon", "deleteIcon", "editIcon", "saveIcon", "loadIcon",
    "exportIcon", "importIcon", "resizeIcon", "rotateIcon", "flipIcon",
    "colorizeIcon", "gradientIcon", "shadowIcon", "glowIcon", "blurIcon",
    "sharpenIcon", "contrastIcon", "brightnessIcon", "saturateIcon", "hueIcon",
    "layerIcon", "mergeIcon", "splitIcon", "groupIcon", "ungroupIcon",
    "alignIcon", "distributeIcon", "spacingIcon", "gridIcon", "snapIcon",
    "zoomIcon", "panIcon", "selectIcon", "moveIcon", "copyIcon",
    "pasteIcon", "duplicateIcon", "undoIcon", "redoIcon", "clearIcon",
    "filterIcon", "effectIcon", "transformIcon", "animateIcon", "renderIcon",
    "previewIcon", "optimizeIcon", "compressIcon", "validateIcon", "debugIcon"
]

function_categories = [
    "basic", "advanced", "utility", "effect", "transform",
    "color", "layer", "file", "export", "import",
    "tool", "shape", "text", "image", "vector",
    "raster", "animation", "filter", "gradient", "pattern"
]

icon_styles = [
    "flat", "material", "ios", "windows", "android",
    "glyph", "outline", "filled", "duotone", "multicolor",
    "gradient", "neumorphic", "glassmorphic", "3d", "isometric",
    "minimalist", "detailed", "abstract", "geometric", "organic"
]

shapes = [
    "circle", "square", "triangle", "rectangle", "polygon",
    "star", "heart", "arrow", "check", "cross",
    "plus", "minus", "dot", "line", "curve",
    "wave", "spiral", "hexagon", "octagon", "pentagon"
]

# hasilkan 5000 fungsi berkas-berkas
print("Generating 5000 function files...")
for i in range(1, 5001):
    func_type = function_types[(i-1) % len(function_types)]
    category = function_categories[(i-1) % len(function_categories)]
    style = icon_styles[(i-1) % len(icon_styles)]
    shape = shapes[(i-1) % len(shapes)]
    
    filename = f"{func_type}_{category}_{style}_{shape}_{i}.js"
    filepath = os.path.join(functions_dir, filename)
    
    content = f'''/**
 * Function Module: {func_type.title()} {i}
 * Category: {category}
 * Style: {style}
 * Shape: {shape}
 * ID: FUNC-{str(i).zfill(5)}
 */

const {func_type}{i} = {{
    id: 'FUNC-{str(i).zfill(5)}',
    name: '{func_type.title()} {i}',
    category: '{category}',
    style: '{style}',
    shape: '{shape}',
    version: '1.0.{i}',
    
    init() {{
        console.log('Initializing {func_type} function #{i}');
        this.setup();
        return this;
    }},
    
    setup() {{
        // Setup configuration for {func_type}
        this.config = {{
            enabled: true,
            priority: {i},
            dependencies: [],
            parameters: {{}}
        }};
    }},
    
    execute(params) {{
        console.log('Executing {func_type} #{i} dengan params:', params);
        // Implementation for {func_type} operation
        return this.process(params);
    }},
    
    process(data) {{
        // Core processing logic
        const result = {{
            success: true,
            functionId: this.id,
            functionName: this.name,
            timestamp: Date.now(),
            data: data
        }};
        return result;
    }},
    
    validate(input) {{
        // Validation logic
        return input !== null && input !== undefined;
    }},
    
    cleanup() {{
        // Cleanup resources
        console.log('Cleaning up {func_type} #{i}');
        this.config = null;
    }}
}};

// Export module
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {func_type}{i};
}}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {{
    window['{func_type}{i}'] = {func_type}{i};
}}
'''
    
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Created 5000 function files in {functions_dir}")

# Menu categories dan subcategories untuk 3500 menus
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

# hasilkan 3500 menu butiran
print("Generating 3500 menu items...")
menus_data = []

for i in range(1, 3501):
    category = menu_categories[(i-1) % len(menu_categories)]
    subcategory = menu_subcategories[(i-1) % len(menu_subcategories)]
    layout = design_layouts[(i-1) % len(design_layouts)]
    icon_type = icon_types[(i-1) % len(icon_types)]
    
    # tentukan if menu has ikon atau teks only
    has_icon = i % 3 != 0  # 2/3 have icons, 1/3 teks only
    
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
    
    # buat individual menu berkas
    filename = f"menu_{str(i).zfill(5)}.json"
    filepath = os.path.join(menus_dir, filename)
    
    content = f'''{{
    "id": "{menu_item['id']}",
    "name": "{menu_item['name']}",
    "category": "{menu_item['category']}",
    "subcategory": "{menu_item['subcategory']}",
    "layout": "{menu_item['layout']}",
    "iconType": {json.dumps(menu_item['iconType'])},
    "hasIcon": {str(menu_item['hasIcon']).lower()},
    "path": "{menu_item['path']}",
    "parentId": {json.dumps(menu_item['parentId'])},
    "level": {menu_item['level']},
    "order": {menu_item['order']},
    "metadata": {{
        "createdAt": "2024-01-01T00:00:{str(i%60).zfill(2)}Z",
        "updatedAt": "2024-01-01T00:00:{str(i%60).zfill(2)}Z",
        "version": "1.0.{i}",
        "status": "active",
        "visibility": "public",
        "permissions": ["read", "write", "execute"],
        "tags": ["{category.lower()}", "{subcategory.lower()}", "{layout.lower()}", "icon-maker"],
        "description": "Menu item {i} for {subcategory} {category} with {layout}"
    }},
    "children": [],
    "actions": {{
        "onClick": "handleMenuClick({i})",
        "onHover": "handleMenuHover({i})",
        "onContextMenu": "handleMenuContext({i})"
    }},
    "styling": {{
        "className": "menu-item-{i}",
        "iconClass": "{menu_item['iconType'].replace(' ', '-').lower()}-icon" if menu_item['iconType'] else "text-only-menu",
        "theme": "default",
        "size": "medium",
        "color": "#333333",
        "hoverColor": "#007bff",
        "activeColor": "#0056b3"
    }}
}}
'''
    
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Created 3500 menu files in {menus_dir}")

# simpan menus data as JSON array untuk easy import
import json
with open(os.path.join(menus_dir, 'all_menus.json'), 'w') as f:
    json.dump(menus_data, f, indent=2)

print("Created all_menus.json with complete menu structure")
print("\nGeneration complete!")
print(f"- 5000 function files in: {functions_dir}")
print(f"- 3500 menu files in: {menus_dir}")

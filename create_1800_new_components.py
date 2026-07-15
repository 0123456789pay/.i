#!/usr/bin/env python3
import os

# Baca nama komponen dari file yang sudah digenerate
with open('/workspace/component_names.txt', 'r') as f:
    component_names = [line.strip() for line in f.readlines()[:1800]]

# Buat direktori jika belum ada
os.makedirs('/workspace/new_components', exist_ok=True)
os.makedirs('/workspace/new_components/js', exist_ok=True)
os.makedirs('/workspace/new_components/css', exist_ok=True)

# Template untuk file JS
js_template = """// {name} Component Script
export const {name}Comp = {{
    name: '{name}',
    type: 'component',
    version: '1.0.0',
    config: {{
        enabled: true,
        theme: 'default',
        size: 'medium'
    }},
    methods: {{
        init() {{
            console.log('{name} initialized');
        }},
        render(data) {{
            return `<div class="{name}-container">${{JSON.stringify(data)}}</div>`;
        }},
        destroy() {{
            console.log('{name} destroyed');
        }}
    }},
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
}};

export default {name}Comp;
"""

# Template untuk file CSS
css_template = """/* {name} Component Styles */
.{name}-container {{
    display: block;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
}}

.{name}-container:hover {{
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}}

.{name}-active {{
    border-color: #764ba2;
    background: #f0f4ff;
}}

.{name}-disabled {{
    opacity: 0.5;
    pointer-events: none;
}}
"""

created_count = 0
for name in component_names:
    try:
        # Buat file JS
        js_content = js_template.format(name=name)
        js_path = f'/workspace/new_components/js/{name}.js'
        with open(js_path, 'w') as f:
            f.write(js_content)
        
        # Buat file CSS
        css_content = css_template.format(name=name)
        css_path = f'/workspace/new_components/css/{name}.css'
        with open(css_path, 'w') as f:
            f.write(css_content)
        
        created_count += 1
        
        if created_count % 100 == 0:
            print(f"Created {created_count} components...")
    
    except Exception as e:
        print(f"Error creating {name}: {e}")

print(f"\nTotal created: {created_count} component pairs (.js + .css)")
print(f"Location: /workspace/new_components/js/ and /workspace/new_components/css/")

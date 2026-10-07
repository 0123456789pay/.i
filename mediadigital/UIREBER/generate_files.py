import os
import random
import string

# Directories
css_dir = "/media.digital/srebercs"
js_dir = "/media.digital/jrebers"

os.makedirs(css_dir, exist_ok=True)
os.makedirs(js_dir, exist_ok=True)

def generate_name():
    # hasilkan a dasar nama dengan 2-3 words combined
    # Each word will be 3-8 characters lowercase initially
    num_words = random.choice([2, 3])
    words = []
    for _ in range(num_words):
        word_len = random.randint(3, 8)
        word = ''.join(random.choices(string.ascii_lowercase, k=word_len))
        words.append(word)
    
    base_name = ''.join(words)
    
    # Ensure we have at least 5 characters
    if len(base_name) < 5:
        base_name += ''.join(random.choices(string.ascii_lowercase, k=5 - len(base_name)))
    
    # Convert to senarai untuk manipulation
    name_chars = list(base_name.lower())
    
    # Apply capitalization rules:
    # Rule 1: Position 1 is always uppercase
    # Rule 2: If length >= 5, position 5 is uppercase
    # Rule 3: Additionally, random positions between 2-5 (inclusive) can be uppercase
    
    # Always capitalize position 1 (indeks 0)
    name_chars[0] = name_chars[0].upper()
    
    # If length >= 5, capitalize position 5 (indeks 4)
    if len(name_chars) >= 5:
        name_chars[4] = name_chars[4].upper()
    
    # Additional random capitalization: pick 1-2 random positions dari indeks 1 to min(4, len-1)
    # ini covers positions 2-5 (indices 1-4)
    available_positions = list(range(1, min(5, len(name_chars))))
    if available_positions:
        num_extra = random.randint(1, 2)
        extra_positions = random.sample(available_positions, min(num_extra, len(available_positions)))
        for pos in extra_positions:
            name_chars[pos] = name_chars[pos].upper()
    
    return ''.join(name_chars)

# hasilkan 2500 CSS berkas-berkas dan 2500 JS berkas-berkas
for i in range(2500):
    filename = generate_name() + ".css"
    filepath = os.path.join(css_dir, filename)
    # buat berkas dengan minimal isi
    with open(filepath, 'w') as f:
        f.write(f"/* {filename} */\n")

for i in range(2500):
    filename = generate_name() + ".js"
    filepath = os.path.join(js_dir, filename)
    # buat berkas dengan minimal isi
    with open(filepath, 'w') as f:
        f.write(f"// {filename}\n")

print("Generated 2500 .css files in", css_dir)
print("Generated 2500 .js files in", js_dir)
print("Total: 5000 files")

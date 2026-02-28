import os
import glob

# Find all HTML files in the root directory only
html_files = glob.glob('*.html')

# Files that should have the menu
files_to_update = [
    'weapons.html', 'characters.html', 'artifacts.html', 'search.html',
    'stygian.html', 'theater.html', 'tcg.html', 'mw-set.html',
    'mw-inventory.html', 'inventory.html', 'miliastra.html', 'furnishings.html',
    'furnishing-set.html', 'enemy.html', 'columbina.html', 'diff.html',
    'wonderland.html', 'abyss.html'
]

updated_count = 0

for file in files_to_update:
    filepath = os.path.join('.', file)
    if not os.path.exists(filepath):
        print(f"File not found: {file}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if the file has the menu to update
    if 'achievements.html">Achievements</a>' not in content:
        print(f"Skipped: {file} (no achievements menu found)")
        continue
    
    # Replace achievements menu with banners menu
    old_pattern = '<a href="achievements.html">Achievements</a>'
    new_pattern = '<a href="wishes.html">Banners</a>'
    
    if old_pattern in content:
        new_content = content.replace(old_pattern, new_pattern)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        updated_count += 1
        print(f"✓ Updated: {file}")
    else:
        print(f"Skipped: {file} (pattern not found)")

print(f"\nTotal files updated: {updated_count}")

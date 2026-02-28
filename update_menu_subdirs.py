import os
import glob

# Find all HTML files in subdirectories
subdir_files = []

# Characters directory
for file in glob.glob('**/*.html', recursive=True):
    # Skip root level files (already updated)
    if file.count(os.sep) > 0:  # Has subdirectory
        subdir_files.append(file)

updated_count = 0

for file in subdir_files:
    if not os.path.exists(file):
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace achievements menu with banners menu (check for both patterns)
    patterns = [
        ('<a href="achievements.html">Achievements</a>', '<a href="wishes.html">Banners</a>'),
        ('<a href="../achievements.html">Achievements</a>', '<a href="../wishes.html">Banners</a>'),
        ('<a href="../../achievements.html">Achievements</a>', '<a href="../../wishes.html">Banners</a>'),
    ]
    
    updated = False
    for old_pattern, new_pattern in patterns:
        if old_pattern in content:
            content = content.replace(old_pattern, new_pattern)
            updated = True
    
    if updated:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        updated_count += 1
        print(f"✓ Updated: {file}")

print(f"\nTotal subdirectory files updated: {updated_count}")

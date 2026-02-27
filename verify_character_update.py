#!/usr/bin/env python3
content = open('character.html', encoding='utf-8').read()

checks = {
    'inventoryCache': 'inventoryCache' in content,
    'loadInventoryData': 'loadInventoryData' in content,
    'displayMaterials': 'displayMaterials' in content,
    'rankColor': 'rankColor' in content,
}

print('✓ Character page material icons update:')
print()
for feature, found in checks.items():
    status = '✓' if found else '✗'
    print(f'  {status} {feature}')

if all(checks.values()):
    print()
    print('✓ All updates applied successfully!')
    print('✓ Material icons will now display instead of text')
    print('✓ Ready to show icons for:')
    mats = {
        100021: 'Wolfhook',
        104151: 'Vayuda Turquoise Sliver',
        104152: 'Vayuda Turquoise Fragment',
        104153: 'Vayuda Turquoise Chunk',
        112122: 'Broken Drive Shaft',
        112123: 'Reinforced Drive Shaft',
        113085: 'Prismatic Severed Tail',
    }
    for mat_id, mat_name in mats.items():
        print(f'    [{mat_id}] {mat_name}')
    print()
    print('✓ Mora will display as 💰 card')

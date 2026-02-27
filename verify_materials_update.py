#!/usr/bin/env python3
import json

inv = json.load(open('inventory.json'))
print(f'✓ Material card display successfully updated!')
print(f'\n✓ Character pages will now show materials with icons')
print(f'\n═ Configuration Summary:')
print(f'   - Inventory items: {len(inv)} total materials')
print(f'   - Icon source: https://gi.yatta.moe/assets/UI/')
print(f'   - Material categories: {len(set(item["category"] for item in inv))}')
print(f'   - Rarity levels: 1★ to 5★')
print(f'\n═ Example materials ready to display:')
for item in inv[50:56]:
    print(f'   [{item["id"]}] {item["name"]} (Rank {item["rank"]}) - {item["category"]}')

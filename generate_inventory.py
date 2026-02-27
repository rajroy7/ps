#!/usr/bin/env python3
import json

# Load materials data
with open('materials.json', 'r') as f:
    materials_response = json.load(f)

materials_data = materials_response['data']
items = materials_data['items']
types = materials_data['types']

# Convert to inventory format
inventory = []

for item_id, item_info in items.items():
    inventory_item = {
        'id': item_info['id'],
        'name': item_info['name'],
        'category': types.get(item_info['type'], item_info['type']),
        'icon': item_info['icon'],
        'rank': item_info.get('rank', 1),
        'type': item_info['type'],
        'mapMark': item_info.get('mapMark', False),
        'route': item_info.get('route', '')
    }
    inventory.append(inventory_item)

# Sort by rank (descending) and name
inventory.sort(key=lambda x: (-x['rank'], x['name']))

# Save to inventory.json
with open('inventory.json', 'w', encoding='utf-8') as f:
    json.dump(inventory, f, indent=2, ensure_ascii=False)

print(f"✓ Generated inventory.json with {len(inventory)} items!")
print(f"\nTop 10 items by rarity:")
for item in inventory[:10]:
    print(f"  [{item['id']}] {item['name']} (Rank {item['rank']}) - {item['category']}")

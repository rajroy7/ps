#!/usr/bin/env python3
import json

with open('materials.json', 'r') as f:
    data = json.load(f)

types_count = len(data['data']['types'])
items_count = len(data['data']['items'])

print(f"✓ Materials data retrieved successfully!")
print(f"  - Total material types: {types_count}")
print(f"  - Total items: {items_count}")
print(f"\nMaterial types:")
for type_key, type_name in list(data['data']['types'].items())[:10]:
    print(f"  - {type_name} ({type_key})")
print("  ...")
print(f"\nSample items:")
for item_id, item_data in list(data['data']['items'].items())[:5]:
    print(f"  - [{item_id}] {item_data['name']} ({item_data['type']})")

#!/usr/bin/env python3
import json

data = json.load(open('inventory.json'))
print(f'✓ Total items in inventory.json: {len(data)}')
print(f'\nSample items:')
for item in data[:10]:
    print(f'  - {item["name"]} (ID: {item["id"]}, Category: {item["category"]}, Rank: {item["rank"]})')

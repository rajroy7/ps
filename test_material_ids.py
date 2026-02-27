#!/usr/bin/env python3
import json

inv = json.load(open('inventory.json'))
test_ids = [100021, 104151, 104152, 104153, 112122, 112123, 113085]

found = [item for item in inv if item['id'] in test_ids]
print(f'Materials found: {len(found)}/{len(test_ids)}')
print()
for item in found:
    print(f'[{item["id"]}] {item["name"]}')
    print(f'    Icon: {item["icon"]}')
    print(f'    Category: {item["category"]}')
    print()

if len(found) != len(test_ids):
    print(f'\nNOT FOUND:')
    for id in test_ids:
        if not any(item['id'] == id for item in found):
            print(f'  [{id}]')

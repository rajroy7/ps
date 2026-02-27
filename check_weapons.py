import json

d = json.load(open('weapons.json'))
print(f"Total weapons: {len(d)}")
print(f"\nCool Steel: {d[2]}")
print(f"\nAquila Favonia: {[w for w in d if 'Favonia' in w.get('name', '')][0]}")

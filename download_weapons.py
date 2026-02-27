import requests
import os
import json
import time
from datetime import datetime

# Base API: https://gi.yatta.moe/en/archive/weapon
BASE_URL = "https://gi.yatta.moe/api/v2/en/weapon"
DETAIL_URL = "https://gi.yatta.moe/api/v2/en/weapon"

# Create folder structure
os.makedirs("Data/weapons", exist_ok=True)

print("Fetching weapons from Project Amber...")
print("=" * 70)

try:
    # Get weapon index
    response = requests.get(BASE_URL, timeout=10)
    response.raise_for_status()
    
    data = response.json()
    weapons_index = data.get("data", {}).get("items", {})
    props_map = data.get("data", {}).get("props", {})  # Prop name mapping
    
    total_weapons = len(weapons_index)
    print("Found %d weapons.\n" % total_weapons)
    
    weapons_list = []
    success_count = 0
    
    for idx, (weapon_id, weapon_preview) in enumerate(weapons_index.items(), 1):
        try:
            # Get detailed weapon data
            detail_url = "%s/%s" % (DETAIL_URL, weapon_id)
            detail_resp = requests.get(detail_url, timeout=5)
            detail_resp.raise_for_status()
            
            weapon_data = detail_resp.json().get("data", {})
            
            # Extract base stats from upgrade section
            atk = "—"
            secondary_stat = "—"
            secondary_label = "—"
            
            if "upgrade" in weapon_data and "prop" in weapon_data["upgrade"]:
                props = weapon_data["upgrade"]["prop"]
                
                # Calculate level 90 stats
                base_atk = 0
                secondary_value = 0
                secondary_type = ""
                
                # Get base values at level 1
                for prop in props:
                    prop_type = prop.get("propType", "")
                    init_value = prop.get("initValue", 0)
                    
                    if prop_type == "FIGHT_PROP_BASE_ATTACK":
                        base_atk = init_value
                    elif prop_type != "NONE":
                        secondary_value = init_value
                        secondary_type = prop_type
                
                # Get added values from promotions
                promote_atk = 0
                promote_secondary = 0
                if "promote" in weapon_data["upgrade"]:
                    for promote in weapon_data["upgrade"]["promote"]:
                        if promote.get("addProps"):
                            for prop_type, value in promote["addProps"].items():
                                if prop_type == "FIGHT_PROP_BASE_ATTACK":
                                    promote_atk += value
                                elif prop_type == secondary_type:
                                    promote_secondary += value
                
                # Calculate level 90 stats
                atk_level_90 = int(base_atk + promote_atk) if base_atk else "—"
                atk = atk_level_90
                
                # For secondary stats, also handle growth curves
                if secondary_type and secondary_type != "NONE":
                    final_secondary = secondary_value + promote_secondary
                    stat_label = props_map.get(secondary_type, secondary_type)
                    # Convert to percentage display
                    percentage = int(final_secondary * 100) if isinstance(final_secondary, (int, float)) else final_secondary
                    secondary_stat = "%d%%" % percentage
                    secondary_label = stat_label
            
            # Save to individual JSON file
            weapon_name = weapon_data.get("name", "weapon_%s" % weapon_id)
            filename = "".join(c if c.isalnum() or c in (' ', '-', '_') else '' for c in weapon_name)
            file_path = "Data/weapons/%s.json" % filename
            
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(weapon_data, f, indent=4, ensure_ascii=False)
            
            # Build simplified entry for weapons.json
            weapons_list.append({
                "id": weapon_id,
                "name": weapon_name,
                "type": weapon_data.get("type", "Unknown"),
                "rarity": weapon_preview.get("rank", 3),
                "icon": weapon_data.get("icon", ""),
                "atk": atk,
                "secondaryStat": secondary_stat,
                "secondaryLabel": secondary_label,
                "specialProp": weapon_data.get("specialProp", "NONE")
            })
            
            success_count += 1
            status = "[%d/%d] OK: %s | ATK: %s | %s" % (idx, total_weapons, weapon_name[:35].ljust(35), str(atk).rjust(4), secondary_label)
            print(status)
            
            # Be gentle with API - don't hammer it
            time.sleep(0.15)
            
        except Exception as e:
            print("[%d/%d] ERROR: %s - %s" % (idx, total_weapons, weapon_id, str(e)[:40]))
            time.sleep(0.1)
    
    # Save simplified weapons.json for card display
    with open("weapons.json", "w", encoding="utf-8") as f:
        json.dump(weapons_list, f, indent=4, ensure_ascii=False)
    
    print("\n" + "=" * 70)
    print("SUCCESS: Processed %d/%d weapons!" % (success_count, total_weapons))
    print("Saved detailed data to Data/weapons/")
    print("Saved display data to weapons.json")
    print("Completed at: %s" % datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    print("=" * 70)
    
except Exception as e:
    print("Error: %s" % e)

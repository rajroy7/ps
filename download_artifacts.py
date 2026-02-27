import requests
import os
import json
import time
from datetime import datetime

# Artifact API endpoints
BASE_URL = "https://gi.yatta.moe/api/v2/en/reliquary"

# Create folder structure
os.makedirs("Data/artifacts", exist_ok=True)

print("Fetching artifacts from Project Amber...")
print("=" * 70)

try:
    # Get artifact index
    response = requests.get(BASE_URL, timeout=10)
    response.raise_for_status()
    
    data = response.json()
    artifacts_index = data.get("data", {}).get("items", {})
    
    total_artifacts = len(artifacts_index)
    print("Found %d artifacts.\n" % total_artifacts)
    
    artifacts_list = []
    success_count = 0
    
    for idx, (artifact_id, artifact_data) in enumerate(artifacts_index.items(), 1):
        try:
            # Extract all available data from artifacts_index
            name = artifact_data.get("name", "artifact_%s" % artifact_id)
            
            # Determine rarity from levelList
            level_list = artifact_data.get("levelList", [3, 4])
            rarity = max(level_list) if level_list else 3
            
            icon = artifact_data.get("icon", "")
            route = artifact_data.get("route", name)
            sort_order = artifact_data.get("sortOrder", 0)
            
            # Extract set bonuses (2-piece and 4-piece)
            affix_list = artifact_data.get("affixList", {})
            set_bonus_2pc = ""
            set_bonus_4pc = ""
            if affix_list:
                affix_keys = list(affix_list.keys())
                if len(affix_keys) > 0:
                    set_bonus_2pc = affix_list.get(affix_keys[0], "")
                if len(affix_keys) > 1:
                    set_bonus_4pc = affix_list.get(affix_keys[1], "")
            
            # Build comprehensive artifact entry
            full_data = {
                "id": artifact_id,
                "name": name,
                "rarity": rarity,
                "icon": icon,
                "route": route,
                "sortOrder": sort_order,
                "levelList": level_list,
                "setBonus2pc": set_bonus_2pc,
                "setBonus4pc": set_bonus_4pc,
                "affixList": affix_list,
                "rawData": artifact_data
            }
            
            # Save to individual JSON file
            filename = "".join(c if c.isalnum() or c in (' ', '-', '_') else '' for c in name)
            file_path = "Data/artifacts/%s.json" % filename
            
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(artifact_data, f, indent=4, ensure_ascii=False)
            
            artifacts_list.append(full_data)
            
            success_count += 1
            status = "[%d/%d] OK: %s | Rarity: %d★ | 2pc: %s | 4pc: %s" % (
                idx, total_artifacts, 
                name[:35].ljust(35),
                rarity,
                set_bonus_2pc[:25].ljust(25) if set_bonus_2pc else "—".ljust(25),
                set_bonus_4pc[:25].ljust(25) if set_bonus_4pc else "—".ljust(25)
            )
            print(status)
            
            # Be gentle with API
            time.sleep(0.1)
            
        except Exception as e:
            print("[%d/%d] ERROR: %s - %s" % (idx, total_artifacts, artifact_id, str(e)[:40]))
            time.sleep(0.05)
    
    # Save comprehensive artifacts.json for easy access
    with open("artifacts.json", "w", encoding="utf-8") as f:
        json.dump(artifacts_list, f, indent=4, ensure_ascii=False)
    
    print("\n" + "=" * 70)
    print("SUCCESS: Processed %d/%d artifacts!" % (success_count, total_artifacts))
    print("\nFiles created:")
    print("  ✓ artifacts.json - All artifacts with bonuses")
    print("  ✓ Data/artifacts/ - Individual artifact JSON files (%d files)" % success_count)
    print("\nArtifact Rarities:")
    rarity_counts = {}
    for art in artifacts_list:
        rarity = art["rarity"]
        rarity_counts[rarity] = rarity_counts.get(rarity, 0) + 1
    for rarity in sorted(rarity_counts.keys()):
        print("  %d★: %d artifacts" % (rarity, rarity_counts[rarity]))
    
except Exception as e:
    print("FATAL ERROR: %s" % str(e))


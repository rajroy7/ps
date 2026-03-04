#!/usr/bin/env python3
"""
Create books.json from pre-fetched API data.
Simpler approach focusing on metadata and image URLs.
"""

import json
from datetime import datetime

# Books data extracted from the API (sample structure)
# This will be expanded to include all books
books_data = [
    {
        "id": 1,
        "name": "The Fox in the Dandelion Sea",
        "rank": 4,
        "icon": "UI_ItemIcon_100188",
        "icon_url": "https://ik.imagekit.io/gukc1okbd/UI_ItemIcon_100188.webp",
        "route": "The Fox in the Dandelion Sea"
    },
    {
        "id": 2,
        "name": "Hilichurl Ballad Selection",
        "rank": 3,
        "icon": "UI_ItemIcon_100196",
        "icon_url": "https://ik.imagekit.io/gukc1okbd/UI_ItemIcon_100196.webp",
        "route": "Hilichurl Ballad Selection",
        "volumes": [
            {
                "id": 100196,
                "name": "Hilichurl Ballad Selection (I)",
                "description": "The masterpiece of the Poet Laureate of Hilichurlian! Scholar Jacob Musk will show you the mysterious spiritual world of the hilichurls through this poetry collection!"
            },
            {
                "id": 100197,
                "name": "Hilichurl Ballad Selection (II)",
                "description": "Are wine and poetry a part of the hilichurl lifestyle? Do they have pure and devout desires? Expert on the hilichurls, Jacob Musk, is here to answer!"
            }
        ]
    },
    {
        "id": 3,
        "name": "Vera's Melancholy",
        "rank": 4,
        "icon": "UI_ItemIcon_100178",
        "icon_url": "https://ik.imagekit.io/gukc1okbd/UI_ItemIcon_100178.webp",
        "route": "Vera's Melancholy"
    },
    {
        "id": 4,
        "name": "The Boar Princess",
        "rank": 4,
        "icon": "UI_ItemIcon_100202",
        "icon_url": "https://ik.imagekit.io/gukc1okbd/UI_ItemIcon_100202.webp",
        "route": "The Boar Princess"
    },
    {
        "id": 5,
        "name": "The Mondstadt Tower",
        "rank": 2,
        "icon": "UI_ItemIcon_100208",
        "icon_url": "https://ik.imagekit.io/gukc1okbd/UI_ItemIcon_100208.webp",
        "route": "The Mondstadt Tower"
    }
]

def main():
    try:
        with open("books.json", 'w', encoding='utf-8') as f:
            json.dump(books_data, f, ensure_ascii=False, indent=2)
        print("✓ Created books.json with sample structure")
        print(f"  Books: {len(books_data)}")
        print(f"  Timestamp: {datetime.now().isoformat()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()

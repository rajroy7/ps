#!/usr/bin/env python3
"""
Fetch all Genshin Impact books data from the Yatta API
Using urllib instead of requests (built-in).
"""

import json
import urllib.request
import urllib.error
import time
from typing import Dict, List, Any

def get_image_url(icon_id: str) -> str:
    """Convert icon ID to ImageKit CDN URL."""
    if not icon_id:
        return ""
    return f"https://ik.imagekit.io/gukc1okbd/{icon_id}.webp"

def fetch_json(url: str, retries: int = 3) -> Dict[str, Any]:
    """Fetch JSON from URL with retry logic."""
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(url, timeout=30) as response:
                return json.loads(response.read().decode('utf-8'))
        except urllib.error.URLError as e:
            if attempt < retries - 1:
                print(f"  Retry {attempt + 1}/{retries} for {url.split('/')[-1]}...")
                time.sleep(2)
            else:
                print(f"  Failed to fetch: {url}")
                return {}
        except Exception as e:
            print(f"  Error: {e}")
            return {}
    return {}

def main():
    """Main function to fetch and process books."""
    print("Fetching Genshin Impact books data...")
    print("=" * 60)
    
    # Fetch all books
    print("\n1. Fetching books list...")
    list_url = "https://gi.yatta.moe/api/v2/en/book?vh=64F0"
    data = fetch_json(list_url)
    
    if not data or data.get("response") != 200:
        print("   ERROR: Failed to fetch books list")
        return
    
    books_dict = data.get("data", {}).get("items", {})
    print(f"   ✓ Found {len(books_dict)} books")
    
    # Process each book
    print(f"\n2. Processing {len(books_dict)} books...")
    books_list = []
    
    for idx, (book_id_str, book_info) in enumerate(books_dict.items(), 1):
        book_id = int(book_id_str)
        
        # Show progress every 50 books
        if (idx - 1) % 50 == 0 and idx > 1:
            print(f"   Progress: {idx}/{len(books_dict)} books...")
        
        # Fetch detailed info
        detail_url = f"https://gi.yatta.moe/api/v2/EN/book/{book_id}?vh=64F0"
        details = fetch_json(detail_url)
        
        if details and details.get("response") == 200:
            book_data = details.get("data", {})
            book = {
                "id": book_id,
                "name": book_data.get("name", ""),
                "rank": book_data.get("rank", 1),
                "icon": book_data.get("icon", ""),
                "icon_url": get_image_url(book_data.get("icon", "")),
                "route": book_data.get("route", ""),
                "volumes": book_data.get("volume", [])
            }
        else:
            # Use basic info as fallback
            book = {
                "id": book_id,
                "name": book_info.get("name", ""),
                "rank": book_info.get("rank", 1),
                "icon": book_info.get("icon", ""),
                "icon_url": get_image_url(book_info.get("icon", "")),
                "route": book_info.get("route", ""),
                "volumes": []
            }
        
        books_list.append(book)
        
        # Small delay between requests to be nice to the API
        if idx < len(books_dict):
            time.sleep(0.1)
    
    print(f"   ✓ Downloaded {len(books_list)} books with details")
    
    # Save to JSON
    print(f"\n3. Saving to books.json...")
    try:
        with open("books.json", 'w', encoding='utf-8') as f:
            json.dump(books_list, f, ensure_ascii=False, indent=2)
        print(f"   ✓ Saved successfully!")
        print("\n" + "=" * 60)
        print(f"SUCCESS: Downloaded {len(books_list)} books")
        print(f"File: books.json")
        print("=" * 60)
    except Exception as e:
        print(f"   ERROR: Failed to save: {e}")

if __name__ == "__main__":
    main()

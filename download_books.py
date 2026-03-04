#!/usr/bin/env python3
"""
Fetch all Genshin Impact books data from the Yatta API
and save to books.json with complete information.
"""

import json
import requests
from typing import Dict, List, Any

def get_image_url(icon_id: str) -> str:
    """Convert icon ID to ImageKit CDN URL."""
    if not icon_id:
        return ""
    # Using ImageKit CDN with the icon ID as filename
    return f"https://ik.imagekit.io/gukc1okbd/{icon_id}.webp"

def fetch_all_books() -> Dict[str, Any]:
    """Fetch all books from the main API endpoint."""
    url = "https://gi.yatta.moe/api/v2/en/book?vh=64F0"
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        data = response.json()
        if data.get("response") == 200:
            return data.get("data", {}).get("items", {})
        else:
            print(f"API Error: {data.get('response')}")
            return {}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching books list: {e}")
        return {}

def fetch_book_details(book_id: int) -> Dict[str, Any]:
    """Fetch detailed information for a specific book."""
    url = f"https://gi.yatta.moe/api/v2/EN/book/{book_id}?vh=64F0"
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        data = response.json()
        if data.get("response") == 200:
            return data.get("data", {})
        else:
            return {}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching book {book_id} details: {e}")
        return {}

def process_books(books_dict: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Process all books and fetch detailed information.
    Returns a list of complete book objects.
    """
    books_list = []
    total = len(books_dict)
    
    print(f"Processing {total} books...")
    
    for idx, (book_id_str, book_info) in enumerate(books_dict.items(), 1):
        book_id = int(book_id_str)
        
        # Fetch detailed information
        details = fetch_book_details(book_id)
        
        if details:
            # Combine basic info with detailed info
            book = {
                "id": book_id,
                "name": details.get("name", book_info.get("name", "")),
                "rank": details.get("rank", book_info.get("rank", 1)),
                "icon": details.get("icon", book_info.get("icon", "")),
                "icon_url": get_image_url(details.get("icon", book_info.get("icon", ""))),
                "route": details.get("route", book_info.get("route", "")),
                "volumes": details.get("volume", [])
            }
        else:
            # Fallback to basic info if details not available
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
        
        # Progress indicator
        if idx % 50 == 0:
            print(f"  Processed {idx}/{total} books...")
    
    print(f"Successfully processed {len(books_list)} books!")
    return books_list

def save_books_json(books_list: List[Dict[str, Any]], filepath: str) -> bool:
    """Save books data to JSON file."""
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(books_list, f, ensure_ascii=False, indent=2)
        print(f"Books data saved to {filepath}")
        return True
    except Exception as e:
        print(f"Error saving books.json: {e}")
        return False

def main():
    """Main function to orchestrate the book data fetching."""
    print("Starting book data fetch...")
    print("-" * 50)
    
    # Fetch all books
    books_dict = fetch_all_books()
    
    if not books_dict:
        print("Failed to fetch books. Exiting.")
        return False
    
    print(f"Found {len(books_dict)} books in API")
    print("-" * 50)
    
    # Process books and fetch details
    books_list = process_books(books_dict)
    
    if not books_list:
        print("Failed to process books. Exiting.")
        return False
    
    # Save to JSON
    filepath = "books.json"
    success = save_books_json(books_list, filepath)
    
    if success:
        print("-" * 50)
        print("✓ Book data download complete!")
        print(f"  Total books: {len(books_list)}")
        print(f"  File: {filepath}")
    
    return success

if __name__ == "__main__":
    main()

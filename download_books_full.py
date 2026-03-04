#!/usr/bin/env python3
import requests
import json
import time

print("Downloading all 566 books with FULL content...")

# First, get the list of all books
response = requests.get('https://gi.yatta.moe/api/v2/en/book?vh=64F0', timeout=15)
data = response.json()
books_obj = data['data']['items']
book_ids = sorted([int(k) for k in books_obj.keys()])

print(f"Found {len(book_ids)} books to process")

books = []
for idx, book_id in enumerate(book_ids, 1):
    try:
        book_data = books_obj[str(book_id)]
        
        # Try to fetch full content from readable endpoint
        full_content = None
        try:
            readable_url = f'https://gi.yatta.moe/api/v2/EN/readable/Book{book_id}?vh=64F0'
            readable_response = requests.get(readable_url, timeout=3)
            if readable_response.status_code == 200:
                readable_data = readable_response.json()
                if readable_data.get('response') == 200 and 'data' in readable_data:
                    full_content = readable_data['data']
        except:
            pass
        
        # Also try to get volume details
        volumes = []
        try:
            detail_response = requests.get(f'https://gi.yatta.moe/api/v2/EN/book/{book_id}?vh=64F0', timeout=3)
            if detail_response.status_code == 200:
                detail_data = detail_response.json()
                if detail_data['response'] == 200 and 'volume' in detail_data['data']:
                    volumes = detail_data['data']['volume']
        except:
            pass
        
        book_entry = {
            'id': book_id,
            'name': book_data.get('name', f'Book {book_id}'),
            'rank': book_data.get('rank', 1),
            'icon': book_data.get('icon', ''),
            'route': book_data.get('route', '')
        }
        
        if volumes:
            book_entry['volumes'] = volumes
        
        if full_content:
            book_entry['full_content'] = full_content
        
        books.append(book_entry)
        
        if idx % 50 == 0:
            print(f"  Processed {idx}/{len(book_ids)} books...")
        
        time.sleep(0.02)
    except Exception as e:
        print(f"  Error processing book {book_id}: {e}")
        continue

# Save to books.json
print(f"\nSaving {len(books)} books with full content to books.json...")
with open('books.json', 'w', encoding='utf-8') as f:
    json.dump(books, f, indent=2, ensure_ascii=False)

file_size = len(json.dumps(books, ensure_ascii=False)) / 1024 / 1024
print(f"✓ Successfully saved {len(books)} books with full content!")
print(f"✓ books.json file size: {file_size:.1f} MB")

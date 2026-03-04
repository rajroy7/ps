#!/usr/bin/env python3
import requests
import json
import time
import sys

print("Downloading all 566 books with FULL TEXT...")

# Get list of all books
try:
    response = requests.get('https://gi.yatta.moe/api/v2/en/book?vh=64F0', timeout=15)
    data = response.json()
    books_obj = data['data']['items']
    book_ids = sorted([int(k) for k in books_obj.keys()])
except Exception as e:
    print(f"Error fetching book list: {e}")
    sys.exit(1)

print(f"Found {len(book_ids)} books")

books = []
failed = 0

for idx, book_id in enumerate(book_ids, 1):
    try:
        book_data = books_obj[str(book_id)]
        
        # Try to get full text content
        full_text = None
        try:
            readable_url = f'https://gi.yatta.moe/api/v2/EN/readable/Book{book_id}?vh=64F0'
            readable_response = requests.get(readable_url, timeout=3)
            if readable_response.status_code == 200:
                readable_data = readable_response.json()
                if readable_data.get('response') == 200 and 'data' in readable_data:
                    full_text = readable_data['data']
        except:
            pass
        
        book_entry = {
            'id': book_id,
            'name': book_data.get('name', f'Book {book_id}'),
            'rank': book_data.get('rank', 1),
            'icon': book_data.get('icon', ''),
            'route': book_data.get('route', '')
        }
        
        if full_text:
            book_entry['full_text'] = full_text
        
        books.append(book_entry)
        
        if idx % 100 == 0:
            print(f"  Processed {idx}/{len(book_ids)} books...")
            sys.stdout.flush()
        
        time.sleep(0.02)
    except Exception as e:
        failed += 1
        print(f"  Error book {book_id}: {str(e)[:50]}")
        continue

print(f"\nSaving {len(books)} books to books.json...")
with open('books.json', 'w', encoding='utf-8') as f:
    json.dump(books, f, indent=2, ensure_ascii=False)

file_size = len(json.dumps(books, ensure_ascii=False)) / 1024 / 1024
print(f"✓ Saved {len(books)} books (Failed: {failed})")
print(f"✓ File size: {file_size:.2f} MB")
print("✓ Done!")

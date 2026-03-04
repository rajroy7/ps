#!/usr/bin/env python3
"""
Fetch full readable text for all books and save incrementally to books_full.json.
Resumes if `books_full.json` exists.
"""
import requests, json, time, os, sys
from pathlib import Path

BOOKS_JSON = Path('books.json')
OUT_JSON = Path('books_full.json')
BASE_LIST_URL = 'https://gi.yatta.moe/api/v2/en/book?vh=64F0'
READABLE_URL = 'https://gi.yatta.moe/api/v2/EN/readable/Book{book_id}?vh=64F0'

session = requests.Session()
session.headers.update({'User-Agent': 'ProjectSkirkFetcher/1.0 (contact: local)'})


def load_base_list():
    if not BOOKS_JSON.exists():
        print('books.json not found in current directory. Exiting.', file=sys.stderr)
        sys.exit(1)
    with BOOKS_JSON.open('r', encoding='utf-8') as f:
        return json.load(f)


def load_progress():
    if not OUT_JSON.exists():
        return {}
    with OUT_JSON.open('r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            return {b['id']: b for b in data}
        except Exception as e:
            print('Failed to read existing books_full.json, starting fresh:', e, file=sys.stderr)
            return {}


def save_progress(map_by_id):
    # write atomic
    tmp = OUT_JSON.with_suffix('.tmp')
    with tmp.open('w', encoding='utf-8') as f:
        json.dump(list(map_by_id.values()), f, ensure_ascii=False, indent=2)
    tmp.replace(OUT_JSON)


def fetch_readable(book_id, retries=3, timeout=10):
    url = READABLE_URL.format(book_id=book_id)
    for attempt in range(1, retries+1):
        try:
            r = session.get(url, timeout=timeout)
            if r.status_code == 200:
                j = r.json()
                if j.get('response') == 200 and 'data' in j:
                    return j['data']
                else:
                    return None
            elif r.status_code == 404:
                return None
            else:
                print(f'Warning: status {r.status_code} for book {book_id}')
        except requests.RequestException as e:
            print(f'Request error for book {book_id} (attempt {attempt}):', e)
        time.sleep(0.5 * attempt)
    return None


def main():
    base = load_base_list()
    progress = load_progress()
    base_by_id = {b['id']: b for b in base}

    ids = sorted(base_by_id.keys())
    total = len(ids)
    print(f'Will process {total} books; already have {len(progress)} saved.')

    for idx, bid in enumerate(ids, 1):
        if bid in progress and progress[bid].get('full_text'):
            if idx % 100 == 0:
                print(f'[{idx}/{total}] skip {bid} (already have text)')
            continue

        print(f'[{idx}/{total}] Fetching readable for book {bid}...')
        text = fetch_readable(bid, retries=4, timeout=8)
        entry = base_by_id[bid].copy()
        if text:
            entry['full_text'] = text
            print(f'  → got full text ({len(text)} chars)')
        else:
            # optionally note missing
            entry['full_text'] = None
            print('  → no readable content')

        progress[bid] = entry
        # save every 10 books
        if idx % 10 == 0 or idx == total:
            save_progress(progress)
            print(f'  Saved progress: {len(progress)} entries')
        # small delay to be gentle
        time.sleep(0.03)

    print('All done. Final save...')
    save_progress(progress)
    print('Saved books_full.json')

if __name__ == '__main__':
    main()

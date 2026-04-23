import csv
import json
import os
import sys

def import_csv(target_env="dev"):
    """
    Imports events from data/events_{env}.csv into data/events.{env}.json.
    target_env: 'dev' or 'prod'
    """
    csv_file = f"events_{target_env}.csv"
    csv_path = path = os.path.join(os.path.dirname(__file__), f'../data/{csv_file}')
    json_path = os.path.join(os.path.dirname(__file__), f'../data/events.{target_env}.json')

    if not os.path.exists(csv_path):
        print(f"❌ Error: {csv_path} not found.")
        return

    new_events = []
    try:
        with open(csv_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                event = {
                    "id": os.urandom(4).hex(),
                    "status": row.get('status', 'Upcoming'),
                    "startDate": row['startDate'],
                    "endDate": row.get('endDate') or row['startDate'],
                    "isMultiDay": row['startDate'] != row.get('endDate') if row.get('endDate') else False,
                    "event_time": { 
                        "start": f"{row['startDate']} 13:00", 
                        "end": f"{row.get('endDate') or row['startDate']} 21:00" 
                    },
                    "registration": { "start": "", "end": "" },
                    "category": row.get('category') or "Battle",
                    "formats": [f.strip() for f in row['formats'].split(',')] if row.get('formats') else ["1vs1"],
                    "name": { "ko": row['name_ko'], "en": row['name_en'] },
                    "location": {
                        "venue": { "ko": row.get('venue_ko', 'NA'), "en": row.get('venue_en', 'NA') },
                        "city": { "ko": row['city_ko'], "en": row['city_en'] },
                        "country": { "ko": row['country_ko'], "en": row['country_en'] }
                    },
                    "url": row.get('url') or "#"
                }
                new_events.append(event)
    except Exception as e:
        print(f"❌ Error parsing {csv_file}: {e}")
        return

    # Merge logic
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
        
        existing_urls = {e['url'] for e in existing_data if e['url'] != "#"}
        added_count = 0
        for e in new_events:
            if e['url'] not in existing_urls:
                existing_data.append(e)
                added_count += 1
        
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, ensure_ascii=False, indent=2)
            
        print(f"✅ Imported {added_count} events from {csv_file} to events.{target_env}.json")
    except Exception as e:
        print(f"❌ Error updating JSON: {e}")

if __name__ == "__main__":
    env = sys.argv[1] if len(sys.argv) > 1 else "dev"
    import_csv(env)

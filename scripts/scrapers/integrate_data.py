import json
import os

def integrate():
    refined_path = os.path.join(os.path.dirname(__file__), 'wdsf_refined.json')
    dev_db_path = os.path.join(os.path.dirname(__file__), '../../data/events.dev.json')
    
    with open(refined_path, 'r', encoding='utf-8') as f:
        new_events = json.load(f)
        
    with open(dev_db_path, 'r', encoding='utf-8') as f:
        existing_events = json.load(f)
        
    existing_urls = {e['url'] for e in existing_events}
    
    added_count = 0
    for event in new_events:
        if event['url'] not in existing_urls:
            existing_events.append(event)
            added_count += 1
            
    with open(dev_db_path, 'w', encoding='utf-8') as f:
        json.dump(existing_events, f, ensure_ascii=False, indent=2)
        
    print(f"✅ Integration complete. Added {added_count} new events to events.dev.json.")

if __name__ == "__main__":
    integrate()

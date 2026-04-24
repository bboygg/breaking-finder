import json
import csv
import os

def export_json_to_csv(env="dev"):
    json_path = os.path.join(os.path.dirname(__file__), f'../data/events.{env}.json')
    csv_path = os.path.join(os.path.dirname(__file__), f'../data/events_{env}.csv')
    
    if not os.path.exists(json_path):
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    headers = [
        'name_ko', 'name_en', 'startDate', 'endDate', 'status', 
        'category', 'formats', 'venue_ko', 'venue_en', 
        'city_ko', 'city_en', 'country_ko', 'country_en', 'url'
    ]

    with open(csv_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for e in data:
            writer.writerow({
                'name_ko': e['name']['ko'],
                'name_en': e['name']['en'],
                'startDate': e['startDate'],
                'endDate': e['endDate'],
                'status': e['status'],
                'category': e['category'],
                'formats': ','.join(e['formats']),
                'venue_ko': e['location']['venue']['ko'],
                'venue_en': e['location']['venue']['en'],
                'city_ko': e['location']['city']['ko'],
                'city_en': e['location']['city']['en'],
                'country_ko': e['location']['country']['ko'],
                'country_en': e['location']['country']['en'],
                'url': e['url']
            })
    print(f"✅ Exported {json_path} to {csv_path}")

if __name__ == "__main__":
    export_json_to_csv("dev")
    export_json_to_csv("prod")

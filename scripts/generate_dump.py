import json
import os
import random
from datetime import datetime, timedelta

DATA_FILE = os.path.join(os.path.dirname(__file__), '../data/events.json')

# Updated pools
categories_pool = ["Battle", "Workshop", "Jam", "Cypher", "Others"]
formats_pool = ["1vs1", "2vs2", "3vs3", "4vs4", "Team", "7 to smoke", "Footwork", "Powermove", "Toprock", "B-Girls", "Kids", "Others"]
status_pool = ["Standby", "Ongoing", "Done", "Cancelled"]

cities_pool = [
    {"ko": "서울", "en": "Seoul", "country_ko": "대한민국", "country_en": "South Korea"},
    {"ko": "부산", "en": "Busan", "country_ko": "대한민국", "country_en": "South Korea"},
    {"ko": "도쿄", "en": "Tokyo", "country_ko": "일본", "country_en": "Japan"},
    {"ko": "파리", "en": "Paris", "country_ko": "프랑스", "country_en": "France"},
    {"ko": "뉴욕", "en": "New York", "country_ko": "미국", "country_en": "USA"}
]

def generate_data(count=100):
    events = []
    start_date = datetime(2024, 1, 1)
    
    for i in range(count):
        duration = random.choice([1, 1, 1, 2, 3])
        start_dt = start_date + timedelta(days=random.randint(0, 730))
        end_dt = start_dt + timedelta(days=duration - 1)
        
        reg_start = start_dt - timedelta(days=30)
        reg_end = start_dt - timedelta(days=2)
        
        city = random.choice(cities_pool)
        event_category = random.choice(categories_pool)
        formats = random.sample(formats_pool, random.randint(1, 3))
        status = random.choice(status_pool)
        
        name_ko = f"{city['ko']} {event_category}".strip()
        name_en = f"{city['en']} {event_category}".strip()
        
        events.append({
            "id": str(i+1),
            "status": status,
            "startDate": start_dt.strftime("%Y-%m-%d"),
            "endDate": end_dt.strftime("%Y-%m-%d"),
            "isMultiDay": duration > 1,
            "event_time": {
                "start": start_dt.replace(hour=13, minute=0).strftime("%Y-%m-%d %H:%M"),
                "end": end_dt.replace(hour=21, minute=0).strftime("%Y-%m-%d %H:%M")
            },
            "registration": {
                "start": reg_start.strftime("%Y-%m-%d"),
                "end": reg_end.strftime("%Y-%m-%d")
            },
            "category": event_category,
            "formats": formats,
            "name": {
                "ko": name_ko,
                "en": name_en
            },
            "location": {
                "venue": {"ko": "NA", "en": "NA"},
                "city": {"ko": city["ko"], "en": city["en"]},
                "country": {"ko": city["country_ko"], "en": city["country_en"]}
            },
            "url": "https://www.instagram.com/p/C123456789/"
        })
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(events, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    generate_data(100)
    print("✅ Data updated: type -> category, removed description, NA venue.")

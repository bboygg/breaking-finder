import json
import os
import sys
from datetime import datetime

def load_raw_data():
    path = os.path.join(os.path.dirname(__file__), 'wdsf_events.json')
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_refinement_prompt(raw_events):
    prompt = f"""
    You are a data engineer specializing in Breaking (Bboying) events.
    Convert the following raw WDSF events into our specific JSON schema.
    
    REQUIRED SCHEMA:
    {{
        "status": "Upcoming",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "isMultiDay": boolean,
        "event_time": {{ "start": "YYYY-MM-DD 13:00", "end": "YYYY-MM-DD 21:00" }},
        "registration": {{ "start": "", "end": "" }},
        "category": "Competition",
        "formats": ["1vs1", "B-Girls", etc.],
        "name": {{ "ko": "Korean Name", "en": "English Name" }},
        "location": {{
            "venue": {{ "ko": "NA", "en": "NA" }},
            "city": {{ "ko": "City Name (KO)", "en": "City Name (EN)" }},
            "country": {{ "ko": "Country Name (KO)", "en": "Country Name (EN)" }}
        }},
        "url": "Original URL"
    }}

    RAW DATA:
    {json.dumps(raw_events, indent=2)}

    INSTRUCTIONS:
    1. CATEGORY: Set to "Competition" for WDSF events.
    2. FORMATS: Extract formats from the "name" field if not specified. 
       Example: "1 vs 1 B-Girl Adults" -> ["1vs1", "B-Girls"]
       Look for patterns like "1vs1", "2vs2", "B-Girl", "B-Boy", "Youth", "Adult".
    3. VENUE: If not specified, set both ko/en to "NA".
    4. DATE: Parse date ranges like "4 - 6 December 2026" into startDate and endDate.
    5. TRANSLATION: Translate City/Country to Korean for "ko" fields.
    6. Return ONLY a JSON array of refined events.
    """
    return prompt

if __name__ == "__main__":
    raw_data = load_raw_data()
    print(generate_refinement_prompt(raw_data))

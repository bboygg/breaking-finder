import os
import json
import google.generativeai as genai

def refine_with_gemini():
    """
    Reads raw WDSF data and uses Gemini API to structure it.
    Requires GEMINI_API_KEY environment variable.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY not found in environment.")
        return

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Load raw data from scraper
    raw_path = os.path.join(os.path.dirname(__file__), 'wdsf_events.json')
    with open(raw_path, 'r', encoding='utf-8') as f:
        raw_events = json.load(f)

    prompt = f"""
    You are a data engineer. Convert these raw WDSF Breaking events into our strict JSON schema.
    
    SCHEMA:
    {{
        "status": "Upcoming",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "isMultiDay": boolean,
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

    INSTRUCTIONS:
    - Default format to ["1vs1"] if not specified.
    - Translate City/Country to Korean for "ko" fields.
    - Return ONLY valid JSON array.

    DATA:
    {json.dumps(raw_events)}
    """

    response = model.generate_content(prompt)
    
    # Clean and save the response
    try:
        # Remove markdown code blocks if present
        json_str = response.text.replace('```json', '').replace('```', '').strip()
        refined_data = json.loads(json_str)
        
        output_path = os.path.join(os.path.dirname(__file__), 'wdsf_refined.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(refined_data, f, ensure_ascii=False, indent=2)
        print(f"✅ Gemini successfully refined {len(refined_data)} events.")
    except Exception as e:
        print(f"❌ Failed to parse Gemini response: {e}")
        print("Raw Response:", response.text)

if __name__ == "__main__":
    refine_with_gemini()

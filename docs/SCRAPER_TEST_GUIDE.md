# Scraper Test & Verification Guide 🧪

Follow these steps to verify that the crawling pipeline is working correctly.

## 1. Run the Raw Scraper
This captures data from the website without any AI processing.
```bash
# Activate environment
source scripts/scrapers/.venv/bin/activate

# Run scraper
python3 scripts/scrapers/wdsf_scraper_final.py
```
**Verification**: Check `scripts/scrapers/wdsf_events.json`. 
- Does the "name" match the full title on the WDSF website?
- Are there 4+ events listed?

## 2. Verify AI Refinement (Gemini)
Currently, this is a manual check because we are using a local prompt. 
- Open `scripts/scrapers/refine_wdsf.py`.
- Copy the generated prompt.
- **Verification**: Paste the prompt into a Gemini chat. Does the JSON output:
  - Have correctly formatted `startDate`?
  - Have Korean translations for cities?
  - Default to `1vs1` if format is missing?

## 3. Test Integration
Merge the refined data into the main development database.
```bash
python3 scripts/scrapers/integrate_data.py
```
**Verification**: Check `data/events.dev.json`.
- Are the new WDSF events at the bottom of the list?
- Run `npm run dev` and check the "Competition" filter.

## ⚠️ Common Failure Points
1. **Selectors**: If WDSF changes their CSS classes, `wdsf_scraper_final.py` will find 0 events.
2. **Next Month Link**: If the scraper stops at the current month, check the regex in `wdsf_scraper_final.py`.

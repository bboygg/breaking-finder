import asyncio
import os
import json
import re
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler

async def scrape_wdsf_complete():
    # Base URL for Breaking competitions
    # Note: Use [0]=104 to target the first discipline in the filter
    base_url = "https://www.worlddancesport.org/Calendar/Competitions?DisciplineIds%5B0%5D=104"
    all_events = []
    visited_urls = set()
    
    async with AsyncWebCrawler(verbose=True) as crawler:
        current_url = base_url
        
        # Traverse up to 12 months (1 year)
        for month_idx in range(12):
            if current_url in visited_urls:
                break
            visited_urls.add(current_url)
            
            print(f"🌐 Scraping Month {month_idx + 1}: {current_url}")
            result = await crawler.arun(
                url=current_url,
                bypass_cache=True,
                wait_for="ul.calendarlist", # Corrected wait_for
                delay_before_return__secs=2
            )
            
            if not result.success:
                print(f"❌ Failed to crawl: {result.error_message}")
                break
                
            soup = BeautifulSoup(result.html, 'html.parser')
            
            # Extract events using corrected selectors
            items = soup.select('a.calendarlist__item')
            page_events = []
            for item in items:
                try:
                    date_elem = item.select_one('.calendarlist__item__date')
                    name_elem = item.select_one('.calendarlist__item__competitions')
                    loc_elem = item.select_one('.calendarlist__item__location')
                    
                    if date_elem and name_elem:
                        # Clean up text (remove extra spaces and newlines)
                        name_text = " ".join(name_elem.get_text().split())
                        date_text = date_elem.get_text(strip=True)
                        loc_text = loc_elem.get_text(strip=True) if loc_elem else "TBA"
                        
                        event = {
                            "date": date_text,
                            "name": name_text,
                            "location": loc_text,
                            "url": "https://www.worlddancesport.org" + item.get('href', ''),
                            "source": "WDSF"
                        }
                        page_events.append(event)
                except Exception as e:
                    print(f"⚠️ Error parsing item: {e}")
            
            all_events.extend(page_events)
            print(f"✅ Found {len(page_events)} events on this page.")
            
            # Find next month link
            next_nav = soup.select_one('.calendarlist__nav__next a.calendarlist__nav__link')
            if next_nav and next_nav.get('href'):
                current_url = "https://www.worlddancesport.org" + next_nav.get('href')
            else:
                print("🏁 No more 'Next' links found.")
                break
                
    # Save the structured findings
    os.makedirs("scripts/scrapers", exist_ok=True)
    with open("scripts/scrapers/wdsf_events.json", "w", encoding="utf-8") as f:
        json.dump(all_events, f, ensure_ascii=False, indent=2)
    
    print(f"\n🎉 Total events found: {len(all_events)}")
    print("📂 Saved to scripts/scrapers/wdsf_events.json")

if __name__ == "__main__":
    asyncio.run(scrape_wdsf_complete())

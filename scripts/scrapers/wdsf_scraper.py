import asyncio
import os
import json
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

async def scrape_wdsf():
    """
    Scrapes the WDSF Breaking Competition Calendar for a 12-month period.
    Matches 'real-world' usage patterns for crawl4ai.
    """
    base_url = "https://www.worlddancesport.org/Calendar/Competitions?DisciplineIds%5B0%5D=104"
    all_events = []
    
    # Configure Browser and Run settings
    browser_config = BrowserConfig(headless=True)
    run_config = CrawlerRunConfig(
        bypass_cache=True,
        wait_for="ul.calendarlist"
    )
    
    async with AsyncWebCrawler(config=browser_config) as crawler:
        current_url = base_url
        
        for month_idx in range(12):
            print(f"🌐 Crawling Month {month_idx + 1}: {current_url}")
            
            result = await crawler.arun(url=current_url, config=run_config)
            
            if not result.success:
                print(f"❌ Failed to crawl {current_url}: {result.error_message}")
                break
                
            soup = BeautifulSoup(result.html, 'html.parser')
            items = soup.select('a.calendarlist__item')
            
            for item in items:
                try:
                    date_elem = item.select_one('.calendarlist__item__date')
                    name_elem = item.select_one('.calendarlist__item__competitions')
                    loc_elem = item.select_one('.calendarlist__item__location')
                    
                    if date_elem and name_elem:
                        # Capture full competition details (Age, Gender, Discipline)
                        name_text = " ".join(name_elem.get_text(separator=" ", strip=True).split())
                        
                        all_events.append({
                            "date": date_elem.get_text(strip=True),
                            "name": name_text,
                            "location": loc_elem.get_text(strip=True) if loc_elem else "NA",
                            "url": "https://www.worlddancesport.org" + item.get('href', ''),
                            "source": "WDSF"
                        })
                except Exception as e:
                    print(f"⚠️ Error parsing event: {e}")
            
            # Find the 'Next' month navigation link
            next_nav = soup.select_one('.calendarlist__nav__next a.calendarlist__nav__link')
            if next_nav and next_nav.get('href'):
                current_url = "https://www.worlddancesport.org" + next_nav.get('href')
            else:
                print("🏁 End of calendar reached.")
                break
                
    # Save the raw findings to a temporary JSON file
    output_path = os.path.join(os.path.dirname(__file__), 'wdsf_events.json')
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_events, f, ensure_ascii=False, indent=2)
    
    print(f"\n🎉 Extraction Complete. {len(all_events)} events saved to wdsf_events.json")

if __name__ == "__main__":
    asyncio.run(scrape_wdsf())

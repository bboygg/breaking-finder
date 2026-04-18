import asyncio
import os
from crawl4ai import AsyncWebCrawler

async def scrape_wdsf_robust():
    # Trying the main competitions calendar
    url = "https://www.worlddancesport.org/Calendar/Competitions"
    
    async with AsyncWebCrawler(verbose=True) as crawler:
        # Increase wait time for dynamic content
        result = await crawler.arun(
            url=url,
            bypass_cache=True,
            wait_for="div.competition-list, table.calendar", # Wait for common calendar elements
            delay_before_return__secs=5
        )

        if result.success:
            print(f"✅ Successfully crawled: {url}")
            print(f"📄 Page Title: {result.metadata.get('title', 'No Title')}")
            
            # Save the markdown
            with open("scripts/scrapers/wdsf_competitions.md", "w", encoding="utf-8") as f:
                f.write(result.markdown)
            
            # Check for Breaking
            if "Breaking" in result.markdown:
                print("🎯 Found 'Breaking' in the page content!")
            else:
                print("⚠️ 'Breaking' NOT found. Might need to apply filters via JS.")
        else:
            print(f"❌ Failed to crawl WDSF: {result.error_message}")

if __name__ == "__main__":
    asyncio.run(scrape_wdsf_robust())

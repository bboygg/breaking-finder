import asyncio
import os
import json
from crawl4ai import AsyncWebCrawler

async def check_wdsf_calendar():
    # Base URL for WDSF Calendar
    url = "https://www.worlddancesport.org/Calendar"
    
    async with AsyncWebCrawler(verbose=True) as crawler:
        result = await crawler.arun(
            url=url,
            bypass_cache=True
        )

        if result.success:
            print("✅ Successfully crawled WDSF Calendar")
            # Save the raw HTML snippet or markdown
            with open("scripts/scrapers/wdsf_calendar.md", "w", encoding="utf-8") as f:
                f.write(result.markdown)
            print("📝 Raw markdown saved to scripts/scrapers/wdsf_calendar.md")
            
            # Find the discipline selection logic
            print("\n--- Searching for 'Breaking' in markdown ---")
            if "Breaking" in result.markdown:
                print("Found 'Breaking' in content!")
            else:
                print("'Breaking' not found in markdown.")
        else:
            print(f"❌ Failed to crawl WDSF: {result.error_message}")

if __name__ == "__main__":
    asyncio.run(check_wdsf_calendar())

import asyncio
import os
import json
from crawl4ai import AsyncWebCrawler
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy

async def scrape_wdsf():
    # URL for WDSF Breaking Calendar
    url = "https://www.worlddancesport.org/Calendar/Competition/Breaking"
    
    # Define a simple schema for extraction
    schema = {
        "name": "WDSF Events",
        "baseSelector": "div.calendar-item, tr.competition-row, .competition-list-item", # Educated guesses
        "fields": [
            {"name": "title", "selector": "a.title, .name", "type": "text"},
            {"name": "date", "selector": ".date, .time", "type": "text"},
            {"name": "location", "selector": ".location, .venue", "type": "text"},
            {"name": "link", "selector": "a", "type": "attribute", "attribute": "href"}
        ]
    }
    
    # Using JsonCssExtractionStrategy for structured data
    extraction_strategy = JsonCssExtractionStrategy(schema, verbose=True)

    async with AsyncWebCrawler(verbose=True) as crawler:
        result = await crawler.arun(
            url=url,
            bypass_cache=True
        )

        if result.success:
            print("✅ Successfully crawled WDSF")
            # Save the raw markdown to help us refine selectors later
            with open("scripts/scrapers/wdsf_raw.md", "w", encoding="utf-8") as f:
                f.write(result.markdown)
            print("📝 Raw markdown saved to scripts/scrapers/wdsf_raw.md")
            
            # Since we don't know the exact selectors yet, let's also just print 
            # a snippet of the markdown to understand the structure.
            print("\n--- Markdown Snippet ---")
            print(result.markdown[:1000])
            print("------------------------\n")
        else:
            print(f"❌ Failed to crawl WDSF: {result.error_message}")

if __name__ == "__main__":
    asyncio.run(scrape_wdsf())

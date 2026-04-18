# Breaking Finder: Scraper Architecture 🏗️

This document outlines the modular pipeline used to collect, refine, and integrate breaking event data.

## 🔄 The 3-Step Pipeline

### 1. Extraction Layer (Scraper)
- **Tool**: `crawl4ai` (Python + Playwright)
- **Role**: Visits target websites (WDSF, Dance Code) and extracts raw content.
- **Logic**: Site-specific selectors (CSS/Xpath) are used to find the "Container" of events.
- **Output**: `raw_events.json` or `markdown`.

### 2. Refinement Layer (Gemini AI)
- **Tool**: Google Gemini API
- **Role**: Acts as a "Human-like Parser".
- **Logic**:
  - Converts inconsistent date formats (e.g., "4-6 Dec") to standardized ISO dates.
  - Maps location strings to structured `{ city, country }` objects.
  - Categorizes events and identifies formats (1vs1, B-Girls) from titles.
- **Output**: `refined_events.json` (Strict Schema).

### 3. Integration Layer (Merge & Deduplicate)
- **Tool**: Python Script
- **Role**: Safely updates the main database.
- **Logic**: Checks the `url` or `unique_id` to prevent duplicate entries before appending to `events.dev.json`.

## 🛠 Why This Architecture?
- **Resilience**: If a website layout changes slightly, the AI can still often "find" the data in the raw text.
- **Scalability**: New sources can be added by only creating a new Step 1 (Scraper). Step 2 and 3 remain largely the same.

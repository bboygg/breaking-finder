# Breaking Finder: Scraper Architecture 🏗️

This document outlines the modular pipeline used to collect, refine, and integrate breaking event data.

## 🔄 The 3-Step Pipeline

### 1. Extraction Layer (Scraper)
- **Tool**: `crawl4ai` (Python + Playwright)
- **Role**: Visits target websites (WDSF, Dance Code) and extracts raw content.
- **Logic**: Use the **Strategy Pattern** [전략 패턴] where each source (Naver, Instagram, and8) is a standalone plugin.
- **Output**: `raw_events.json` or `markdown`.

### 2. Refinement Layer (Gemini AI)
- **Tool**: Google Gemini API
- **Role**: Acts as a "Human-like Parser" and **Normalization Buffer** [데이터 정규화 계층].
- **Logic**:
  - Converts inconsistent date formats (e.g., "4-6 Dec") to standardized ISO dates.
  - Maps location strings to structured `{ city, country }` objects.
  - Categorizes events and identifies formats (1vs1, B-Girls) from titles.
- **Output**: `refined_events.json` (Strict Schema).

### 3. Integration Layer (Merge & Deduplicate)
- **Tool**: Python Script
- **Role**: Safely updates the main database.
- **Logic**: 
  - Checks the `url` or `unique_id` to prevent duplicate entries.
  - **Deduplication Strategy**: Fuzzy matching on `startDate` + `City` to flag potential cross-source duplicates.
- **Output**: `events.dev.json`.

---

## 🛠 Architectural Considerations for Scaling

### 1. Source Isolation
- Adding a new source should only involve creating a new file in `scrapers/` without touching the core engine.

### 2. Reliability & Health Monitoring
- **Scraper Heartbeats**: Monitor scraper health. If a scraper that usually finds 10 events suddenly finds 0, trigger an alert.

### 3. Rate Limiting & Ethics
- Implement randomized delays and rotating User-Agents to mimic different browsers and avoid IP bans.

### 4. The Instagram/Social Media Challenge
- **Manual Trigger**: A CLI where you paste a URL and the scraper uses local session cookies to extract data.
- **OCR Integration**: Use Optical Character Recognition [광학 문자 인식] for image-only event posts.

# Scraper Functional Requirements (v1.0) 📄

## 1. Data Integrity & Accuracy
- **Full Name Capture**: Must capture the complete event title including age group, gender, and format.
  - *Bad*: World Championships: Adult Breaking
  - *Good*: WDSF World Championships Breaking 1 vs 1 B-Boys Adult
- **Date Standardization**: Standardize "Human-readable" dates into ISO `YYYY-MM-DD`.
  - Handle ranges (e.g., "4 - 6 December") into `startDate` and `endDate`.
- **Structured Location**: Split raw strings into `{ venue, city, country }`.

## 2. Categorization Logic
- **Default Category**: 
  - WDSF/Official events -> `Competition`.
  - Community/Jam events -> `Battle` or `Jam`.
- **Format Extraction**: If a title contains "1 vs 1" or "2 vs 2", map it to the `formats` array.
  - If no format is found in a WDSF event, default to `1vs1`.

## 3. Operational Requirements
- **Deduplication**: Prevent duplicate entries based on the source URL.
- **Language Support**: All name and location fields must have `ko` and `en` versions.
- **Bypass Blocks**: Must be able to scrape Javascript-heavy sites using Headless Browsers.

## 4. Known Issues to Fix
- [ ] Detailed name parts are being truncated or simplified during extraction.

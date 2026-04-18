# Breaking Finder Roadmap & TODO List 🕺

## 🛠 Phase 1: Automated Data Management (Current Priority)
- [x] **Source Deep Dive:** Analyzed structure for Naver Blog, Dance Code, WDSF, and and8.dance.
- [ ] **Scraper Engine (Python/Playwright):** 
  - [ ] **Naver Scraper:** Focus on frame-switching to extract post content.
  - [ ] **Dance Code Scraper:** Target "비보이" category list.
  - [ ] **WDSF Scraper:** Extract official Olympic-style events.
  - [ ] **and8.dance Scraper:** Extract global community events.
- [ ] **AI Data Structuring (Gemini API):**
  - Prompt: "Identify event names, dates (YYYY-MM-DD), locations (City, Country), and categories from this raw HTML."
- [ ] **Automated PR Pipeline:**
  - Weekly GitHub Action to run all scrapers and merge into `data/events.dev.json`.

## 🧪 Phase 2: Pipeline Setup & Quality
- [ ] **Code Refactoring:**
  - Audit codebase for "Human Readable" [가독성] and "Maintainable" [유지보수성] patterns.
  - Fix inconsistencies in variable naming (e.g., ensure `category` is used everywhere instead of `type`).
- [ ] **Lighthouse CI Integration:** 
  - Automated performance [성능] and accessibility [접근성] audits.
- [ ] **E2E Testing (Playwright Python):**
  - Verify core user paths: Filtering, Detail View, Language persistence.

## 🚢 Phase 3: Infrastructure & Expansion
- [ ] **Hosting Evaluation:** Vercel vs AWS vs DigitalOcean.
- [ ] **Calendar View:** Add monthly visualization.
- [ ] **PWA Support:** Enable native-like mobile experience.

---
*Updated for v0.2.0 by Gemini CLI*

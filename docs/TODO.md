# Breaking Finder Roadmap & TODO List 🕺

## 🛠 v0.5: WDSF specialized scrapper (Current)
- [x] **WDSF Scrapper:** Built and refined `crawl4ai` logic.
- [ ] **WDSF AI Refiner:** Automate Gemini API mapping for WDSF raw data.
- [ ] **Data Verification:** Final audit of `events.dev.json` vs WDSF site.

## 🚀 v1.0: Official Launch (WDSF + Manual + New Infra)
- [ ] **Manual Input Manner:**
  - Create a simple `scripts/add_event.py` for easy manual entry.
  - Document the manual update workflow for community jams.
- [ ] **Infrastructure Migration:** 
  - Evaluate and move to a new host (AWS/DigitalOcean) to solve Vercel pause issue.
- [ ] **Automated Pipeline:** 
  - GitHub Action to sync WDSF data weekly.

## 🤖 v1.5: Multi-Source Expansion
- [ ] **Add Korean Sources:** Naver Blog and Dance Code.
- [ ] **Add and8.dance:** Global community events.

## 🧪 v1.8: Quality & Professional SDET Setup
- [ ] **Lighthouse CI:** Performance and accessibility [접근성] enforcement.
- [ ] **E2E Testing:** Playwright Python for core user flows.

---
*Updated for v0.3.0 by Gemini CLI*

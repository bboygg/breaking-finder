# Breaking Finder 🕺

Breaking Finder is a sustainable, high-performance event calendar for the global breaking (Bboy/Bgirl) community. Built with Next.js 15 and Server Components.

## 🚀 Key Features

-   **Bilingual Support (KO/EN):** Switch languages seamlessly via the global navigation bar.
-   **SSG Performance:** Near-instant page loads using Static Site Generation.
-   **Advanced Filtering:** Filter by Event Type (Battle, Jam, Cypher, etc.), Format (1vs1, Team, etc.), and Date Range.
-   **Mobile First:** Clean, responsive UI inspired by professional marketplace layouts.
-   **Zero-Cost Infrastructure:** Powered by local JSON data for maximum sustainability.

## 🛠 Tech Stack

-   **Framework:** Next.js 15 (App Router)
-   **Styling:** Vanilla CSS Modules
-   **Data:** Local JSON (Environment-based split)
-   **Automation:** Python scripts for data management
-   **Verification:** Playwright (Python) & Lighthouse CI

## 📂 Project Structure

-   `app/`: Next.js application routes and components.
-   `data/`: Event data storage.
    -   `events.dev.json`: Local development data.
    -   `events.prod.json`: Production data.
-   `scripts/`: Utility scripts.
    -   `generate_dump.py`: Generates realistic test data for development.
-   `public/`: Static assets.

## 💻 Development Workflow

### 1. Setup
```bash
npm install
```

### 2. Generate Development Data
If you need fresh test data, run the Python script:
```bash
python3 scripts/generate_dump.py
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Adding Real Events
You can manually edit `data/events.dev.json` or `data/events.prod.json`. The app will automatically map missing fields from old Supabase exports to the new schema:
-   Missing `status` defaults to `Done`.
-   Single `date` is mapped to `startDate` and `endDate`.
-   Missing `type` defaults to `Others`.

## 🚢 Deployment

The project is ready for deployment on **Vercel**. 
-   When `NODE_ENV=production`, the app will load `data/events.prod.json`.
-   Ensure `events.prod.json` contains your production database export.

## ❓ FAQ: When should I move to a real Database?

Stick with the current JSON approach until:
1.  **Data Volume:** You exceed **~2,000 - 3,000 events**. Large JSON files can slow down the build process.
2.  **Concurrency:** You need multiple people to edit data simultaneously via a UI (Admin Panel).
3.  **Real-time Features:** You need user authentication, "likes", or real-time comments.

For now, this file-based system offers the best speed, lowest cost, and easiest maintenance.

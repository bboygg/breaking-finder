# Breaking Finder - Windsurf Rules

## Project Overview
This is a Next.js web application called "Breaking Finder" that helps users discover breaking battles and events in Korea. Built with Next.js 15, React 19, and Supabase for data management.

## Tech Stack
- **Framework**: Next.js 15.1.2 with App Router
- **Frontend**: React 19.0.0, CSS Modules
- **Backend**: Supabase (PostgreSQL database)
- **Deployment**: Vercel
- **Styling**: CSS Modules + Global CSS
- **Linting**: ESLint with Next.js config

## Project Structure
```
app/
├── (home)/                 # Home page group
│   ├── layout.js          # Home-specific layout
│   └── page.js            # Main landing page
├── api/
│   └── events/
│       └── route.js       # Events API endpoint
├── events/                # Events listing page
│   ├── layout.js         # Events-specific layout
│   └── page.js           # Events listing with pagination
├── lib/
│   └── supabase.js       # Supabase client configuration
├── global.css            # Global styles
├── layout.js             # Root layout with navigation
└── styles.module.css     # Component-specific styles
```

## Development Guidelines

### Code Style
- Use functional components with hooks
- Prefer `'use client'` for client-side components
- Use CSS Modules for component styling
- Follow Next.js App Router conventions
- Use async/await for API calls

### File Naming
- Use kebab-case for directories
- Use camelCase for JavaScript files
- Use `.module.css` for component-specific styles
- Use `layout.js` and `page.js` for App Router structure

### API Design
- Use Next.js Route Handlers in `app/api/`
- Return proper HTTP status codes
- Include error handling with try-catch
- Use NextResponse for API responses

### Database Integration
- Use Supabase client from `app/lib/supabase.js`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Handle database errors gracefully
- Use proper SQL ordering and filtering

### UI/UX Patterns
- Mobile-first responsive design
- Table-based event listings
- Pagination for large datasets (10 items per page)
- Loading states for async operations
- Consistent navigation with fixed header
- Black and white color scheme with accent colors

### Component Structure
- Keep components focused and single-purpose
- Use proper semantic HTML (tables for tabular data)
- Include proper accessibility attributes
- Handle loading and error states

### Performance
- Use Next.js built-in optimizations
- Implement proper pagination
- Optimize images and assets
- Use proper caching strategies

### Environment Setup
- Requires `.env.local` with Supabase credentials
- Development server runs on port 3000 (or next available)
- Uses npm for package management

## Common Patterns

### Event Data Structure
Events should have the following structure:
```javascript
{
  id: number,
  name: string,
  date: string (ISO format),
  location: string,
  category: string,
  url: string
}
```

### API Error Handling
```javascript
try {
  const { data, error } = await supabase.from('table').select('*');
  if (error) throw error;
  return NextResponse.json(data);
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { error: 'Error message' },
    { status: 500 }
  );
}
```

### Client-Side Data Fetching
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/endpoint');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

## Deployment
- Deployed on Vercel at https://breakingfinder.com
- Uses environment variables for Supabase configuration
- Automatic deployments from main branch

## Internationalization
- Configured for 'en' and 'kr' locales
- Default locale is 'en'
- Ready for future i18n implementation

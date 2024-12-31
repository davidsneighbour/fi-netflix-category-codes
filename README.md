# Search Database Application

This application provides a searchable database interface with analytics integration.

## Features

- Real-time search functionality
- Item database with code and category fields
- Status indicators for verified and initial items
- Form for adding new items
- Matomo analytics integration
- URL-based search parameters
- Rate limiting and usage tracking

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_MATOMO_URL=your-matomo-url
VITE_MATOMO_SITE_ID=your-site-id
```

## Project Structure

```
src/
├── components/          # React components
│   ├── AddItemForm.tsx # Form for adding new items
│   ├── SearchBar.tsx   # Search input component
│   └── SearchResults.tsx# Results display component
├── hooks/              # Custom React hooks
│   └── useSearch.ts    # Search functionality hook
├── lib/                # Utility functions and configurations
│   ├── analytics.ts    # Matomo analytics integration
│   └── supabase.ts     # Supabase client configuration
└── types/              # TypeScript type definitions
    └── supabase.ts     # Database types
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses a Supabase database with the following schema:

- `items` table:
  - `id`: UUID (Primary Key)
  - `code`: Integer
  - `category`: Text
  - `verified`: Boolean
  - `initial`: Boolean
  - `created_at`: Timestamp

## Analytics Integration

The application uses Matomo for analytics tracking:

- Page views
- Search terms
- Item additions
- Error events

## Security

- Row Level Security (RLS) enabled
- Public read access
- Authenticated write access
- Input validation using Zod
- Rate limiting via Supabase

## Deployment

The application is configured for deployment on Netlify:

1. Connect your repository to Netlify
2. Configure environment variables in Netlify dashboard
3. Deploy using the Netlify CLI or GitHub integration
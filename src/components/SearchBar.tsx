import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MatomoAnalytics } from '../lib/analytics';

const analytics = MatomoAnalytics.getInstance();

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setSearchParams({ q: searchTerm });
      analytics.trackSiteSearch(searchTerm, 'item-search');
    } else if (searchTerm.length === 0) {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code or category..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          min={3}
        />
      </div>
      {searchTerm.length > 0 && searchTerm.length < 3 && (
        <p className="mt-2 text-sm text-gray-500">
          Please enter at least 3 characters to search
        </p>
      )}
    </div>
  );
}
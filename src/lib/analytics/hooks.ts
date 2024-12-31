import { useEffect } from 'react';
import { MatomoAnalytics } from './core';

export function usePageTracking(title?: string) {
  useEffect(() => {
    const analytics = MatomoAnalytics.getInstance();
    analytics.trackPageView(title);
  }, [title]);
}

export function useSearchTracking(searchTerm: string | null, resultsCount: number) {
  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      const analytics = MatomoAnalytics.getInstance();
      analytics.trackSiteSearch(searchTerm, 'item-search', resultsCount);
    }
  }, [searchTerm, resultsCount]);
}
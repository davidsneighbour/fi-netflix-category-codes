import { MATOMO_CONFIG } from './config';
import type { TrackingEvent, OutboundLink } from './types';

declare global {
  interface Window {
    _paq: any[];
  }
}

export class MatomoAnalytics {
  private static instance: MatomoAnalytics;
  private initialized = false;

  private constructor() {
    this.initializeMatomo();
  }

  public static getInstance(): MatomoAnalytics {
    if (!MatomoAnalytics.instance) {
      MatomoAnalytics.instance = new MatomoAnalytics();
    }
    return MatomoAnalytics.instance;
  }

  private initializeMatomo() {
    if (this.initialized) return;

    window._paq = window._paq || [];
    
    // Set up tracking methods before trackPageView
    this.setupCustomTracking();
    
    window._paq.push(['trackPageView']);
    window._paq.push(['enableLinkTracking']);
    
    const u = MATOMO_CONFIG.URL;
    window._paq.push(['setTrackerUrl', u + 'matomo.php']);
    window._paq.push(['setSiteId', MATOMO_CONFIG.SITE_ID]);

    const d = document;
    const g = d.createElement('script');
    const s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = u + 'matomo.js';
    if (s.parentNode) s.parentNode.insertBefore(g, s);

    this.initialized = true;
  }

  private setupCustomTracking() {
    // Track outbound links automatically
    window._paq.push(['enableLinkTracking', true]);
    
    // Track search results
    window._paq.push(['trackSiteSearch']);
  }

  trackPageView(customTitle?: string) {
    if (customTitle) {
      window._paq?.push(['setDocumentTitle', customTitle]);
    }
    window._paq?.push(['trackPageView']);
  }

  trackEvent({ category, action, name, value }: TrackingEvent) {
    window._paq?.push(['trackEvent', category, action, name, value]);
  }

  trackSiteSearch(keyword: string, category?: string, resultsCount?: number) {
    window._paq?.push(['trackSiteSearch', keyword, category, resultsCount]);
  }

  trackOutboundLink({ url, linkType = 'outbound' }: OutboundLink) {
    window._paq?.push(['trackLink', url, linkType]);
  }

  trackDownload(url: string) {
    window._paq?.push(['trackLink', url, 'download']);
  }
}
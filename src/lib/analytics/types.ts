export interface TrackingEvent {
  category: string;
  action: string;
  name?: string;
  value?: number;
}

export interface OutboundLink {
  url: string;
  linkType?: string;
}
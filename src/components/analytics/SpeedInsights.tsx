
import { useEffect } from 'react';
import { injectSpeedInsights } from '@vercel/speed-insights';

interface SpeedInsightEvent {
  target?: {
    value?: string;
  };
}

interface SpeedInsightData {
  url?: string;
  event?: SpeedInsightEvent;
  attribution?: Record<string, any>;
}

export default function SpeedInsights() {
  useEffect(() => {
    injectSpeedInsights({
      // Add analytics for form interactions
      beforeSend: (data: SpeedInsightData) => {
        // Filter out sensitive form data before sending
        if (data.url && data.url.includes('form') && data.event) {
          // Don't track form input values for privacy
          if (data.event.target && data.event.target.value) {
            data.event.target.value = '[REDACTED]';
          }
          
          // Add custom attribution to form events
          return {
            ...data,
            attribution: {
              ...(data.attribution || {}),
              formInteraction: true
            }
          };
        }
        return data;
      }
    });
  }, []);
  
  return null;
}

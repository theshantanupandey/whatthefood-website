
import { useEffect } from 'react';
import { injectSpeedInsights } from '@vercel/speed-insights';

export default function SpeedInsights() {
  useEffect(() => {
    injectSpeedInsights({
      // Add analytics for form interactions
      beforeSend: (event) => {
        // Filter out sensitive form data before sending
        if (event && typeof event === 'object' && 'target' in event) {
          // If this is a form event with a target containing value
          if (
            event.target && 
            typeof event.target === 'object' && 
            'value' in event.target
          ) {
            // Don't track form input values for privacy
            const sanitizedEvent = { ...event };
            if (sanitizedEvent.target && typeof sanitizedEvent.target === 'object') {
              // Clone and modify the event
              sanitizedEvent.target = { ...sanitizedEvent.target, value: '[REDACTED]' };
            }
            return sanitizedEvent;
          }
        }
        return event;
      }
    });
  }, []);
  
  return null;
}

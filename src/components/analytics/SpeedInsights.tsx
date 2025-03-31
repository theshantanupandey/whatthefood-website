
import { useEffect } from 'react';
import { injectSpeedInsights } from '@vercel/speed-insights';

export default function SpeedInsights() {
  useEffect(() => {
    injectSpeedInsights({});
  }, []);
  
  return null;
}


import { apiPost } from './api';

export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests?: string[];
}

export async function subscribeToNewsletter(data: NewsletterSubscription) {
  return apiPost('newsletter-subscribe', data);
}

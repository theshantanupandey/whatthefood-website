
import DOMPurify from 'dompurify';

/**
 * Sanitizes a string input to prevent XSS attacks
 * 
 * @param input The string to sanitize
 * @returns The sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] }).trim();
}

/**
 * Sanitizes object properties recursively
 * Only string values are sanitized
 * 
 * @param obj The object to sanitize
 * @returns A new object with sanitized values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (!obj) return {} as T;
  
  return Object.entries(obj).reduce((sanitized, [key, value]) => {
    if (typeof value === 'string') {
      return { ...sanitized, [key]: sanitizeString(value) };
    } else if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof File)) {
      return { ...sanitized, [key]: sanitizeObject(value) };
    } else if (Array.isArray(value)) {
      return { 
        ...sanitized, 
        [key]: value.map(item => 
          typeof item === 'string' ? sanitizeString(item) : 
          (typeof item === 'object' && item !== null ? sanitizeObject(item) : item)
        )
      };
    }
    return { ...sanitized, [key]: value };
  }, {} as T);
}

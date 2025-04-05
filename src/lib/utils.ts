import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names or class name objects into a single string,
 * then merges Tailwind CSS classes to avoid conflicts.
 * 
 * @param inputs - Class names or class name objects to be combined
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
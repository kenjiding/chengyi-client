import { AnalyticeEvents } from "@/types/analytics";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getHost = (path?: string) => {
  const host = process.env.DOCKER_SERVER_HOST || process.env.NEXT_PUBLIC_SERVER_HOST || '';
  return path ? `${host}${path}` : `${host}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export function pushGoogleAnalyticsEvent(type: AnalyticeEvents, data: any) {
  if (window.gtag) window.gtag('event', type, data);
}
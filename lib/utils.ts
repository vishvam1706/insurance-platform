import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
  "Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry",
]

export const LANGUAGES = [
  "Hindi", "English", "Bengali", "Marathi", "Telugu", "Tamil",
  "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia", "Assamese",
  "Urdu", "Maithili", "Santali", "Kashmiri",
]

export const INSURANCE_TYPES = [
  { value: "term", label: "Term Life Insurance" },
  { value: "health", label: "Health Insurance" },
]

/** Maps each Indian state to its primary language for auto-preselection. */
export const STATE_LANGUAGE_MAP: Record<string, string> = {
  "Andhra Pradesh": "Telugu",
  "Arunachal Pradesh": "English",
  "Assam": "Assamese",
  "Bihar": "Hindi",
  "Chhattisgarh": "Hindi",
  "Goa": "English",
  "Gujarat": "Gujarati",
  "Haryana": "Hindi",
  "Himachal Pradesh": "Hindi",
  "Jharkhand": "Hindi",
  "Karnataka": "Kannada",
  "Kerala": "Malayalam",
  "Madhya Pradesh": "Hindi",
  "Maharashtra": "Marathi",
  "Manipur": "English",
  "Meghalaya": "English",
  "Mizoram": "English",
  "Nagaland": "English",
  "Odisha": "Odia",
  "Punjab": "Punjabi",
  "Rajasthan": "Hindi",
  "Sikkim": "English",
  "Tamil Nadu": "Tamil",
  "Telangana": "Telugu",
  "Tripura": "Bengali",
  "Uttar Pradesh": "Hindi",
  "Uttarakhand": "Hindi",
  "West Bengal": "Bengali",
  "Andaman and Nicobar Islands": "English",
  "Chandigarh": "Hindi",
  "Dadra and Nagar Haveli": "Hindi",
  "Daman and Diu": "Hindi",
  "Delhi": "Hindi",
  "Jammu and Kashmir": "Kashmiri",
  "Ladakh": "Hindi",
  "Lakshadweep": "Malayalam",
  "Puducherry": "Tamil",
}
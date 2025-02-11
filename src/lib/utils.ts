import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hiddenNumber(value: string) {
  const formatter =  new Intl.NumberFormat('id-ID').format(Number(value));
  // get first 1 characters
  const first = formatter.slice(0, 1);
  // get the rest of the characters
  const rest = formatter.slice(1);
  const form = rest.replace(/\d/g, '*');
  return first + form;
}
import { isValidImgURL } from './validator'

export function sanitizeImgURLs(urls: Record<string, string>): string[] {
  return Object.values(urls).filter((url) => isValidImgURL(url))
}

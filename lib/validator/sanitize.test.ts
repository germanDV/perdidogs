/** @jest-environment node */
import { sanitizeImgURLs } from './sanitize'

describe('sanitizeImgURLs', () => {
  it('should return an array of valid img URLs', () => {
    const input = {
      '1': 'https://www.images.com/50x50/pic.png',
      '2': 'http://somehost.io/not-http.png',
      '3': '',
      '4': 'https://somehost.io/https-pic.jpeg',
      '5': 'https://somehost.io/https-pic.svg',
    }

    const expected = ['https://www.images.com/50x50/pic.png', 'https://somehost.io/https-pic.jpeg']

    expect(sanitizeImgURLs(input)).toEqual(expected)
  })
})

/** @jest-environment node */
import { isValidImgURL } from "./validator"

type ImgURLTestCase = [string, boolean]

const imgURLTestCases: ImgURLTestCase[] = [
  ["https://somehost.com/pic.png", true],
  ["https://somehost.com/pic.PNG", true],
  ["https://somehost.com/another_pic.jpg", true],
  ["http://somehost.com/non-https.png", false],
  ["", false],
  ["badly-formatted-url.png", false],
  ["https://somehost.com/assets/pic.ture.jpeg", true],
  ["https://somehost.com/assets/pic.ture.JPG", true],
  ["https://somehost.com/webp_is_also_supported.webp", true],
  ["https://somehost.com/pic.svg", false],
]

describe("isValidImgURL", () => {
  test.each(imgURLTestCases)("URL %s is valid: %s", (url, expected) => {
    expect(isValidImgURL(url)).toBe(expected)
  })
})

import * as cheerio from "cheerio";

/**
 * Extract metadata from a given URL using Cheerio for HTML parsing.
 *
 * This function is designed to:
 * 1. Identify the platform of the URL (YouTube, TikTok, Instagram, etc.).
 * 2. Use Cheerio to parse the HTML and extract metadata.
 * 3. Provide normalized metadata output (title, description, platform).
 *
 * Since this version demonstrates Cheerio extraction only,
 * to integrate platform-specific rules and manual-scraping paths.
 *
 * @param url - The URL of the post/page to extract metadata from.
 * @returns A promise that resolves to an object containing the extracted metadata.
 *          The object has the following properties:
 *          - caption: The extracted title or description of the post/page.
 *          - platform: The platform of the URL.
 * @throws If there is an error fetching the URL or parsing the HTML,
 *         the function will throw an error with a message describing the issue.
 */

function getRootDomain(hostname: string) {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;
  return parts.slice(-2).join(".");
}

export async function extractMetadata(url: string) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "LinkPreviewBot/1.0" },
      signal: AbortSignal.timeout(5000),
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const platform =
      $('meta[property="og:site_name"]').attr("content") ??
      getRootDomain(new URL(url).hostname);

    const caption =
      platform === "Instagram" || platform === "YouTube"
        ? $('meta[property="og:title"]').attr("content") || $("title").text()
        : $('meta[property="og:description"]').attr("content") ||
          $('meta[name="description"]').attr("content");

    return {
      caption,
      platform,
    };
  } catch (error) {
    console.error("Error extracting metadata:", error);

    return {
      caption: "Unknown",
      platform: "Unknown",
    };
  }
}

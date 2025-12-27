import * as cheerio from "cheerio";

/**
 * Extract metadata from a given URL using a hybrid strategy.
 *
 * This function is designed to:
 * 1. Identify the platform of the URL (YouTube, TikTok, Instagram, etc.)
 * 2. Automatically choose the best extraction strategy:
 *    - Platforms that block manual scraping → use OGS (safer & more reliable)
 *    - Platforms that allow HTML access → use Cheerio (faster & lighter)
 * 3. Provide normalized metadata output (title, description, platform).
 *
 * Since this version demonstrates OGS extraction only,
 * the fallback logic and decision matrix can be expanded later
 * to integrate platform-specific rules and manual-scraping paths.
 *
 * @param url - The URL of the post/page to extract metadata from.
 * @returns Extracted metadata containing title, description, and platform name.
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

import ogs from "open-graph-scraper";

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
export async function extractMetadata(url: string) {
  /**
   * PERFORMANCE OPTIMIZATION GUIDELINES
   * ==================================
   * - Avoid performing platform detection too late; do it early to prevent unnecessary fetch overhead.
   * - Cache results for repeated URLs to avoid scraping the same page multiple times.
   * - Prefer Cheerio for platforms with stable HTML (news sites, blogs, Medium) because:
   *      → It is faster, lighter, and does not rely on external parsing.
   * - Use OGS only when necessary (Instagram, Facebook, TikTok, Twitter) because:
   *      → These platforms block manual scraping and break Cheerio-based parsing.
   * - Consider parallelizing fetch operations only when multiple URLs must be processed at once.
   * - Add user-agent spoofing if OGS or Cheerio fail on stricter platforms.
   * - Avoid running extraction in critical request paths; use asynchronous job queues when needed.
   */

  // Use Open Graph Scraper (OGS) as the primary extraction engine.
  // OGS automatically handles:
  //   - Redirect chains
  //   - Missing OG tags fallback
  //   - Bot protection workarounds
  //   - Twitter Card metadata
  const { result } = await ogs({ url });

  return {
    // Fallbacks ensure valid metadata even if OG/Twitter tags are incomplete.
    title: result.ogTitle || result.twitterTitle || "Unknown",
    description: result.ogDescription || result.twitterDescription || "Unknown",

    // Platform detection via og:site_name is not always accurate,
    // but serves as a general categorization fallback.
    platform: result.ogSiteName || "Other",
  };
}

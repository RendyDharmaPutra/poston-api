import ogs from "open-graph-scraper";

export async function extractMetadata(url: string) {
  const { result } = await ogs({ url });

  return {
    title: result.ogTitle || result.twitterTitle || "Unknown",
    description: result.ogDescription || result.twitterDescription || "Unknown",
    platform: result.ogSiteName || "Other",
  };
}

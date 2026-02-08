// =============================================================================
// MASSIVE SITEMAPS - DEPRECATED
// =============================================================================
// These sitemaps previously generated 500,000+ thin content URLs
// (category + every city in the database). They have been intentionally
// removed to avoid Google thin content penalties.
//
// Returns 410 Gone to tell search engines this content is permanently removed.
// =============================================================================

export async function GET() {
  return new Response(
    "This sitemap has been permanently removed. These URLs are no longer indexed.",
    { 
      status: 410,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}

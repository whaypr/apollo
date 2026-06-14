function detectSource() {
    const p = new URLSearchParams(location.search);

    // Path-based sources (highest priority)
    if (p.has("g")) return "github";
    if (p.has("l")) return "linkedin";
    if (p.has("i")) return "instagram";
    if (p.has("f")) return "facebook";
    if (p.has("d")) return "discord";
    if (p.has("x")) return "twitter";
    if (p.has("u")) return "usermap";

    // UTMs
    const utmSource = p.get("utm_source");
    if (utmSource === "ig") return "instagram"; // normalize with other sources
    if (utmSource) return utmSource;

    // Referrers
    const ref = (document.referrer || "").toLowerCase();
    if (ref.includes("instagram.com") || ref.includes("l.instagram.com")) return "instagram";
    if (ref.includes("facebook.com") || ref.includes("l.facebook.com") || ref.includes("m.facebook.com")) return "facebook";
    if (ref.includes("twitter.com") || ref.includes("x.com") || ref.includes("t.co")) return "x";
    if (ref.includes("linkedin.com")) return "linkedin";
    if (ref.includes("github.com") || ref.includes("gist.github.com")) return "github";
    if (ref.includes("reddit.com") || ref.includes("old.reddit.com")) return "reddit";
    if (ref.includes("youtube.com") || ref.includes("youtu.be")) return "youtube";
    if (ref.includes("news.ycombinator.com")) return "hackernews";

    return "direct";
}

document.addEventListener("DOMContentLoaded", function() {
    const p = new URLSearchParams(location.search);

    const source = detectSource();

    if (!source) return;

    goatcounter.count({
        event: true,
        path: `source/${source}`
    });
});

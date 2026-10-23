# SHEBE FARMS Journal Content

Add reviewed farm stories to `posts.json`. The page is intentionally empty until real posts and approved media are supplied; do not add descriptions or images that imply events that were not documented.

Each object in the `posts` array supports these fields:

```json
{
  "slug": "short-descriptive-story-name",
  "title": "A concise story headline",
  "overview": "A short summary for journal listings and search metadata.",
  "story": "The verified background and context for the activity shown.",
  "caption": "A natural description of the moment, if available.",
  "thumbnail": "../images/approved-story-image.jpg",
  "thumbnailAlt": "A factual description of the photograph",
  "videoUrl": "https://www.instagram.com/reel/example/",
  "platform": "Instagram",
  "date": "2026-10-23",
  "category": "Greenhouse",
  "featured": true,
  "photos": [
    {
      "src": "../images/approved-related-image.jpg",
      "alt": "A factual description of the related photograph"
    }
  ]
}
```

Use only `Instagram`, `Facebook`, or `TikTok` for `platform`. `date` is optional and must use `YYYY-MM-DD`. `thumbnail`, `thumbnailAlt`, `caption`, `featured`, and `photos` are optional. Keep `slug` unique, use an absolute HTTPS link for the original post, and add photos under `images/` before referencing them. The journal links visitors to the original video; it does not scrape social platforms or assume third-party embeds are available.

Article views use the stable URL format `blog.html?post=short-descriptive-story-name`. The static site has no content API or build-time article generator, so page metadata and BlogPosting structured data are populated in the browser from the JSON entry.

const journalRoot = document.getElementById("journalContent");

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>\"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);
}

function validExternalUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" ? url.href : "";
    } catch {
        return "";
    }
}

function formatDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.valueOf()) ? "" : new Intl.DateTimeFormat("en", {
        dateStyle: "long"
    }).format(date);
}

function postImage(post, className) {
    if (!post.thumbnail) return `<div class="${className}" aria-hidden="true"></div>`;
    return `<div class="${className}"><img src="${escapeHtml(post.thumbnail)}" alt="${escapeHtml(post.thumbnailAlt || post.title)}" loading="lazy" decoding="async"></div>`;
}

function postUrl(post) {
    return `blog.html?post=${encodeURIComponent(post.slug)}`;
}

function renderCard(post) {
    const date = formatDate(post.date);
    return `<article class="journal-card">
        <a href="${postUrl(post)}" aria-label="Read ${escapeHtml(post.title)}">
            ${postImage(post, "journal-card-media")}
            <div class="journal-card-copy">
                <div class="journal-card-meta"><span>${escapeHtml(post.platform)}</span><span>${escapeHtml(post.category)}</span>${date ? `<time datetime="${escapeHtml(post.date)}">${date}</time>` : ""}</div>
                <h3>${escapeHtml(post.title)}</h3>
                <p>${escapeHtml(post.overview)}</p>
            </div>
        </a>
        <a class="journal-link" href="${escapeHtml(validExternalUrl(post.videoUrl))}" target="_blank" rel="noopener noreferrer">Watch original video</a>
    </article>`;
}

function setPageMetadata(title, description, canonicalUrl) {
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.content = description;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl;
}

function renderArticle(post) {
    const date = formatDate(post.date);
    const externalUrl = validExternalUrl(post.videoUrl);
    const paragraphs = String(post.story || "").split(/\n\s*\n/).filter(Boolean)
        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`).join("");
    const relatedImages = (Array.isArray(post.photos) ? post.photos : [])
        .filter((photo) => photo && photo.src)
        .map((photo) => `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "Related farm photograph")}" loading="lazy" decoding="async">`)
        .join("");

    journalRoot.innerHTML = `<article class="journal-article">
        <a class="journal-link" href="blog.html">Back to the journal</a>
        <span class="journal-kicker">${escapeHtml(post.platform)} / ${escapeHtml(post.category)}${date ? ` / ${date}` : ""}</span>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="journal-article-intro">${escapeHtml(post.overview)}</p>
        ${postImage(post, "journal-article-media")}
        ${post.caption ? `<p><strong>Caption:</strong> ${escapeHtml(post.caption)}</p>` : ""}
        <div class="journal-story"><h2>The story</h2>${paragraphs}</div>
        ${relatedImages ? `<div class="journal-related-media" aria-label="More photographs from this story">${relatedImages}</div>` : ""}
        ${externalUrl ? `<a class="journal-link" href="${escapeHtml(externalUrl)}" target="_blank" rel="noopener noreferrer">Watch the original on ${escapeHtml(post.platform)}</a>` : ""}
    </article>`;

    const canonicalUrl = new URL(postUrl(post), window.location.href).href;
    setPageMetadata(`${post.title} | SHEBE FARMS Journal`, post.overview, canonicalUrl);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.overview,
        datePublished: post.date || undefined,
        image: post.thumbnail ? new URL(post.thumbnail, window.location.href).href : undefined,
        mainEntityOfPage: canonicalUrl,
        publisher: { "@type": "Organization", name: "SHEBE FARMS" }
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.append(script);
}

function renderJournal(posts) {
    const selectedSlug = new URLSearchParams(window.location.search).get("post");
    if (selectedSlug) {
        const post = posts.find((item) => item.slug === selectedSlug);
        if (post) {
            renderArticle(post);
            return;
        }
        journalRoot.innerHTML = `<section class="journal-empty"><h2>That story is not available.</h2><p>It may have been moved. Return to the farm journal to explore the latest updates.</p><a class="journal-link" href="blog.html">View the journal</a></section>`;
        return;
    }

    if (posts.length === 0) {
        journalRoot.innerHTML = `<section class="journal-empty"><span class="journal-kicker">Field notes, when they're ready</span><h2>The next chapter will come straight from the farm.</h2><p>There are no published journal stories yet. New entries will appear here with their original video, context, and photographs, when available.</p></section>`;
        return;
    }

    const featured = posts.find((post) => post.featured) || posts[0];
    const remaining = posts.filter((post) => post.slug !== featured.slug);
    journalRoot.innerHTML = `<article class="journal-featured">
        ${postImage(featured, "journal-featured-media")}
        <div class="journal-featured-copy">
            <span class="journal-eyebrow">Featured / ${escapeHtml(featured.platform)} / ${escapeHtml(featured.category)}</span>
            <h2>${escapeHtml(featured.title)}</h2>
            <p>${escapeHtml(featured.overview)}</p>
            <a class="journal-link" href="${postUrl(featured)}">Read the story</a>
            <a class="journal-link" href="${escapeHtml(validExternalUrl(featured.videoUrl))}" target="_blank" rel="noopener noreferrer">Watch original video</a>
        </div>
    </article>
    ${remaining.length ? `<div class="journal-list-heading"><h2>More from the farm</h2><span>${posts.length} ${posts.length === 1 ? "story" : "stories"}</span></div><div class="journal-grid">${remaining.map(renderCard).join("")}</div>` : ""}`;
}

if (journalRoot) {
    fetch("journal/posts.json")
        .then((response) => {
            if (!response.ok) throw new Error(`Journal content request failed: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            const posts = Array.isArray(data.posts) ? data.posts.filter((post) =>
                post && typeof post.slug === "string" && typeof post.title === "string" &&
                typeof post.overview === "string" && typeof post.story === "string" &&
                ["Instagram", "Facebook", "TikTok"].includes(post.platform) &&
                typeof post.category === "string" && validExternalUrl(post.videoUrl)
            ) : [];
            renderJournal(posts);
            journalRoot.setAttribute("aria-busy", "false");
        })
        .catch(() => {
            journalRoot.innerHTML = `<section class="journal-empty"><h2>Farm stories are temporarily unavailable.</h2><p>Please try again later, or get in touch with SHEBE FARMS directly.</p><a class="journal-link" href="contact.html">Contact SHEBE FARMS</a></section>`;
            journalRoot.setAttribute("aria-busy", "false");
        });
}

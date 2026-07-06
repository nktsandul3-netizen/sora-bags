import { brand } from "@/lib/config";
import type { InstagramPost } from "@/lib/instagram";
import SocialIcon from "./SocialIcon";

function instagramHandle(url: string) {
  const match = url.match(/instagram\.com\/([^/?#]+)/i);
  return match?.[1] ? `@${match[1]}` : "@sora.italy";
}

export default function InstagramFeed({
  posts,
}: {
  posts: InstagramPost[];
  title?: string;
  hint?: string;
}) {
  const handle = instagramHandle(brand.social.instagram);

  return (
    <section className="brand-gallery">
      <h2>
        <a
          href={brand.social.instagram}
          target="_blank"
          rel="noreferrer"
        >
          {handle}
        </a>
      </h2>

      <div className="brand-gallery-row">
        {posts.map((post, index) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram SÓRA ${index + 1}`}
            className="brand-gallery-item"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={post.caption || `SÓRA Instagram ${index + 1}`}
              loading="lazy"
              className="brand-gallery-img"
            />
            <span className="brand-gallery-overlay" aria-hidden="true">
              <SocialIcon name="instagram" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

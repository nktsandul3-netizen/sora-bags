export interface InstagramPost {
  id: string;
  caption?: string;
  imageUrl: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink: string;
}

const fallbackInstagramPosts: InstagramPost[] = [
  {
    id: "fallback-vanity",
    imageUrl: "/products/premium-woven-vanity-crossbody-bag/vanity-black-lifestyle-v2.png",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/sora.italy",
  },
  {
    id: "fallback-crossbody",
    imageUrl: "/products/elegant-leather-crossbody-bag-beige/cross-black-lifestyle-v2.png",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/sora.italy",
  },
  {
    id: "fallback-beach-tote",
    imageUrl: "/products/premium-woven-beach-tote-bag/beach-natural-black-1.png",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/sora.italy",
  },
  {
    id: "fallback-calf-tote",
    imageUrl: "/products/calf-leather-tote-bag/off-white-lifestyle-v2.png",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/sora.italy",
  },
  {
    id: "fallback-shopper",
    imageUrl: "/products/woven-leather-shopper-tote/as-seen-on-lifestyle-1.jpg",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/sora.italy",
  },
  {
    id: "fallback-shoulder",
    imageUrl: "/products/the-essential-shoulder-bag/tan-cognac-lifestyle-v3.png",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/sora.italy",
  },
];

interface InstagramMediaItem {
  id?: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
}

interface InstagramMediaResponse {
  data?: InstagramMediaItem[];
}

export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !accessToken) {
    return fallbackInstagramPosts.slice(0, limit);
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = new URL(`https://graph.instagram.com/v25.0/${userId}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, { next: { revalidate: 60 * 60 } });
    if (!response.ok) {
      return fallbackInstagramPosts.slice(0, limit);
    }

    const payload = (await response.json()) as InstagramMediaResponse;
    const posts =
      payload.data
        ?.map((item): InstagramPost | null => {
          const imageUrl = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
          if (!item.id || !imageUrl || !item.permalink || !item.media_type) return null;

          return {
            id: item.id,
            caption: item.caption,
            imageUrl,
            mediaType: item.media_type,
            permalink: item.permalink,
          };
        })
        .filter((post): post is InstagramPost => Boolean(post)) ?? [];

    return posts.length ? posts : fallbackInstagramPosts.slice(0, limit);
  } catch {
    return fallbackInstagramPosts.slice(0, limit);
  }
}

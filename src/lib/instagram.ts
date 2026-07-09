export interface InstagramPost {
  id: string;
  alt: string;
  previewUrl: string;
  videoUrl: string;
  /** @deprecated use previewUrl */
  imageUrl?: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink?: string;
  caption?: string;
}

/**
 * 5 bag-focused posts for the homepage Instagram rail.
 * Plants / non-product frames are excluded. Letterboxed frames use a cropped preview.
 */
export const homeInstagramPosts: InstagramPost[] = [
  {
    id: "DaAlYOktYC-",
    previewUrl: "/instagram/DaAlYOktYC-.jpg",
    videoUrl: "https://www.instagram.com/reel/DaAlYOktYC-/",
    alt: "Чёрная плетёная сумка SÓRA и золотые украшения",
  },
  {
    id: "DaIV_Zaty51",
    previewUrl: "/instagram/DaIV_Zaty51.jpg",
    videoUrl: "https://www.instagram.com/reel/DaIV_Zaty51/",
    alt: "Образ с бежевой сумкой SÓRA у двери",
  },
  {
    id: "Daaz_qutQIz",
    previewUrl: "/instagram/Daaz_qutQIz.jpg",
    videoUrl: "https://www.instagram.com/reel/Daaz_qutQIz/",
    alt: "Бежевый тоут SÓRA в белом образе",
  },
  {
    id: "DZ7YM3Bt6VZ",
    previewUrl: "/instagram/DZ7YM3Bt6VZ.jpg",
    videoUrl: "https://www.instagram.com/p/DZ7YM3Bt6VZ/",
    alt: "Белая плетёная сумка SÓRA и очки",
  },
  {
    id: "DZ7YbJ1NqNT",
    previewUrl: "/instagram/DZ7YbJ1NqNT.jpg",
    videoUrl: "https://www.instagram.com/reel/DZ7YbJ1NqNT/",
    alt: "Образ с сумкой SÓRA у белого фасада",
  },
];

export async function getInstagramPosts(limit = homeInstagramPosts.length): Promise<InstagramPost[]> {
  return homeInstagramPosts.slice(0, Math.min(5, limit)).map((post) => ({
    ...post,
    imageUrl: post.previewUrl,
    permalink: post.videoUrl,
    mediaType: "VIDEO",
  }));
}

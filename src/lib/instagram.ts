export interface InstagramPost {
  id: string;
  caption?: string;
  imageUrl: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink: string;
}

/** Ручной список постов @sora.italy — без Instagram API. */
const manualInstagramPosts: InstagramPost[] = [
  {
    id: "DaAlYOktYC-",
    imageUrl: "/instagram/DaAlYOktYC-.jpg",
    mediaType: "VIDEO",
    permalink: "https://www.instagram.com/reel/DaAlYOktYC-/",
  },
  {
    id: "DaIV_Zaty51",
    imageUrl: "/instagram/DaIV_Zaty51.jpg",
    mediaType: "VIDEO",
    permalink: "https://www.instagram.com/reel/DaIV_Zaty51/",
  },
  {
    id: "Daaz_qutQIz",
    imageUrl: "/instagram/Daaz_qutQIz.jpg",
    mediaType: "VIDEO",
    permalink: "https://www.instagram.com/reel/Daaz_qutQIz/",
  },
  {
    id: "DaYE_FGjVix",
    imageUrl: "/instagram/DaYE_FGjVix.jpg",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/p/DaYE_FGjVix/",
  },
  {
    id: "DZ8Q9SINk3w",
    imageUrl: "/instagram/DZ8Q9SINk3w.jpg",
    mediaType: "VIDEO",
    permalink: "https://www.instagram.com/reel/DZ8Q9SINk3w/",
  },
  {
    id: "DZ7YbJ1NqNT",
    imageUrl: "/instagram/DZ7YbJ1NqNT.jpg",
    mediaType: "VIDEO",
    permalink: "https://www.instagram.com/reel/DZ7YbJ1NqNT/",
  },
  {
    id: "DZ0Qm_DDRW7",
    imageUrl: "/instagram/DZ0Qm_DDRW7.jpg",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/p/DZ0Qm_DDRW7/",
  },
  {
    id: "DZ7YM3Bt6VZ",
    imageUrl: "/instagram/DZ7YM3Bt6VZ.jpg",
    mediaType: "IMAGE",
    permalink: "https://www.instagram.com/p/DZ7YM3Bt6VZ/",
  },
];

export async function getInstagramPosts(limit = manualInstagramPosts.length): Promise<InstagramPost[]> {
  return manualInstagramPosts.slice(0, limit);
}

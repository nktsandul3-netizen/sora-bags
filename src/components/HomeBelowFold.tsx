import InstagramFeed from "@/components/InstagramFeed";
import StoreExclusiveServices from "@/components/stores/StoreExclusiveServices";
import type { InstagramPost } from "@/lib/instagram";
import type { Locale } from "@/lib/i18n";

/** Below-the-fold home blocks — keep SSR to avoid pulse/skeleton flash on mobile. */
export default function HomeBelowFold({
  posts,
  locale,
  instagramTitle,
  instagramHint,
}: {
  posts: InstagramPost[];
  locale: Locale;
  instagramTitle: string;
  instagramHint: string;
}) {
  return (
    <>
      <InstagramFeed posts={posts} title={instagramTitle} hint={instagramHint} />
      <StoreExclusiveServices locale={locale} />
    </>
  );
}

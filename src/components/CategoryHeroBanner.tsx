import Image from "next/image";
import {
  categoryBanners,
  type CatalogBannerSection,
} from "@/lib/catalog-banner";

function aspectClass(aspect?: `${number}/${number}`) {
  if (aspect === "2/1") return "aspect-[2/1]";
  if (aspect === "128/31") return "aspect-[128/31]";
  return "aspect-[5/2]";
}

export default function CategoryHeroBanner({
  section,
}: {
  section: CatalogBannerSection;
  title: string;
  description?: string;
}) {
  const banner = categoryBanners[section];

  return (
    <section className="relative w-full overflow-hidden bg-stone-100">
      <div className={"relative w-full " + aspectClass(banner.aspect)}>
        <Image
          key={banner.image}
          src={banner.image}
          alt={banner.imageAlt}
          fill
          priority
          quality={85}
          sizes="(min-width: 1024px) 100vw, 100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CapsuleProductCard from "@/components/CapsuleProductCard";
import { products } from "@/lib/data";
import { getServerLocale, getServerT } from "@/lib/server-i18n";
import { withLocalePath } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  return buildPageMetadata({
    path: "/capsule/blue",
    locale,
    title: t("home.blueCapsule"),
    description:
      locale === "ro"
        ? "Capsule Blue — look selectat cu genți și accesorii SÓRA Bags."
        : locale === "en"
          ? "Blue capsule — a curated SÓRA Bags look with bags and accessories."
          : "Blue capsule — подобранный образ с сумками и аксессуарами SÓRA Bags.",
  });
}

const capsuleSlugs = [
  "womens-woven-spiral-panel-shoulder-tote-bag",
  "womens-woven-leather-zip-around-wallet",
  "womens-mustard-wave-silk-scarf",
  "sora-silk-bow-bag-charm",
];

export default async function BlueCapsulePage() {
  const [locale, t] = await Promise.all([getServerLocale(), getServerT()]);
  const capsuleProducts = capsuleSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <div className="bg-[#f7f5f0] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[560px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Capsule
          </p>
          <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-[#1A1A1A] sm:text-[32px]">
            {t("home.capsuleShopLook").replace(" →", "")}
          </h1>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
            <Image
              src="/banners/home-blue-edit-lifestyle-sharp-v2.jpg"
              alt="Blue capsule look"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={82}
              className="object-cover object-[55%_68%]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {capsuleProducts.map((product) => (
              <CapsuleProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={withLocalePath("/bags", locale)}
            className="inline-flex min-h-11 items-center bg-[#1A1A1A] px-7 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-black"
          >
            {t("home.toCatalog")}
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AboutUsContent from "@/components/about/AboutUsContent";
import PaymentDeliveryPageContent from "@/components/payment/PaymentDeliveryPageContent";
import ReturnPageContent from "@/components/return/ReturnPageContent";
import WarrantyPageContent from "@/components/warranty/WarrantyPageContent";
import GiftCertificatePageContent from "@/components/gift/GiftCertificatePageContent";
import WholesalePageContent from "@/components/wholesale/WholesalePageContent";
import RekvizityContent from "@/components/RekvizityContent";
import { getInfoPage, infoPages, navInfoPages } from "@/lib/info";

export function generateStaticParams() {
  return infoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoPage(slug);
  return { title: page?.title ?? "Информация" };
}

function InfoSidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <aside className="hidden lg:block">
      <nav className="space-y-1">
        {navInfoPages.map((p) => (
          <Link
            key={p.slug}
            href={`/info/${p.slug}`}
            className={
              "block rounded-lg px-3 py-2 text-sm transition " +
              (p.slug === activeSlug
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-950")
            }
          >
            {p.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default async function InfoPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) notFound();

  if (page.slug === "o-nas") {
    return <AboutUsContent />;
  }

  if (page.slug === "oplata-i-dostavka") {
    return <PaymentDeliveryPageContent />;
  }

  if (page.slug === "garantiya") {
    return <WarrantyPageContent />;
  }

  if (page.slug === "podarochnye-sertifikaty") {
    return <GiftCertificatePageContent />;
  }

  if (page.slug === "optom") {
    return <WholesalePageContent />;
  }

  if (page.slug === "vozvrat") {
    return <ReturnPageContent />;
  }

  if (page.bannerImage) {
    const usePortraitBanner = false;
    const isLongBannerPage = false;
    const bannerColumnClass = usePortraitBanner
      ? "w-full"
      : "-ml-[3cm] w-[calc(100%+3cm)]";
    const portraitBannerHeightClass =
      "h-[calc(min(100vw,720px)*1024/819+3.5cm)] max-h-[calc(85vh+3.5cm)] lg:h-[calc(min(42vw,560px)*1024/819+3.5cm)]";

    return (
      <div className="mx-auto max-w-7xl overflow-x-clip px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={[{ label: page.title }]} />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div
            className={
              `info-banner-column relative order-2 min-w-0 ${bannerColumnClass} lg:order-1 ` +
              (isLongBannerPage ? "" : "lg:sticky lg:top-24")
            }
          >
            <div className={page.extraBanners?.length ? "space-y-6" : undefined}>
              <div
                className={
                  usePortraitBanner
                    ? `info-banner-media relative w-full overflow-hidden min-h-[320px] bg-stone-100 ${portraitBannerHeightClass}`
                    : "info-banner-media relative h-[calc(min(100vw,720px)*1.25+7cm)] max-h-[calc(85vh+7cm)] w-full overflow-hidden lg:h-[calc(min(42vw,560px)*1.25+7cm)]"
                }
              >
                <Image
                  src={page.bannerImage}
                  alt={page.title}
                  priority
                  quality={85}
                  sizes={
                    usePortraitBanner
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) calc(50vw + 3cm), calc(100vw + 3cm)"
                  }
                  fill
                  className="object-cover object-center"
                />
              </div>

              {page.extraBanners?.map((banner) => (
                <div
                  key={banner.image}
                  className="info-banner-media relative w-full overflow-hidden"
                  style={{ aspectRatio: banner.aspect.replace("/", " / ") }}
                >
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    quality={85}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          <article
            className={
              "order-1 min-w-0 lg:order-2 lg:pt-0 " +
              (isLongBannerPage ? "info-scroll-content" : "")
            }
          >
            <>
              <h1 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-950">
                {page.title}
              </h1>
              <div className="mt-8 space-y-5 text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
                {page.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </>
          </article>
        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: page.title }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[220px_1fr]">
        <InfoSidebar activeSlug={page.slug} />

        <article>
          {page.slug === "rekvizity" ? (
            <RekvizityContent />
          ) : (
            <>
              <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">
                {page.title}
              </h1>
              <div className="mt-6 space-y-5 leading-relaxed text-stone-600">
                {page.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </>
          )}
        </article>
      </div>
    </div>
  );
}
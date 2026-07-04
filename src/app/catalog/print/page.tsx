import type { Metadata } from "next";
import Image from "next/image";
import CatalogPrintControls from "@/components/CatalogPrintControls";
import { brand } from "@/lib/config";
import {
  getCatalogProductMeta,
  getCatalogSections,
  getCatalogSummary,
} from "@/lib/catalog-print";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Каталог для печати",
  robots: { index: false, follow: false },
};

const SEASON_LABEL = "Коллекция сезона";

export default function CatalogPrintPage() {
  const summary = getCatalogSummary();
  const sections = getCatalogSections();
  const dateLabel = summary.generatedAt.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="catalog-print mx-auto max-w-[210mm] bg-white text-stone-900">
      <CatalogPrintControls />

      {/* ---------- Cover ---------- */}
      <section className="catalog-print-cover relative flex flex-col overflow-hidden bg-stone-950 print:rounded-none">
        <div className="catalog-cover-media relative h-[150mm] w-full shrink-0 print:h-[150mm]">
          <Image
            src="/hero-amalfi-4k.jpg"
            alt={brand.name}
            fill
            preload
            loading="eager"
            sizes="210mm"
            className="object-cover object-[50%_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/10 to-transparent" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-10 pt-8 text-white/80">
            <p className="text-[10px] uppercase tracking-[0.4em]">{brand.madeIn}</p>
            <p className="text-[10px] uppercase tracking-[0.35em]">{SEASON_LABEL}</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-10 pb-8 text-white">
            <h1 className="font-serif text-6xl leading-none tracking-tight">{brand.name}</h1>
            <p className="mt-3 max-w-md text-base text-white/85">{brand.tagline}</p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between bg-stone-950 px-10 py-8 text-white">
          <div className="grid grid-cols-3 gap-6 border-b border-white/15 pb-8">
            <div>
              <p className="font-serif text-4xl leading-none">{summary.totalProducts}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/50">Моделей в каталоге</p>
            </div>
            {summary.sections.map((section) => (
              <div key={section.id}>
                <p className="font-serif text-4xl leading-none">{section.productCount}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/50">{section.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 py-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Контакты</p>
              <div className="mt-3 space-y-1.5 text-sm text-white/85">
                <p className="font-medium text-white">{brand.domain}</p>
                <p>{brand.email}</p>
                {brand.phones.map((phone) => (
                  <p key={phone}>{phone}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Салон</p>
              <div className="mt-3 space-y-1.5 text-sm text-white/85">
                <p>{brand.address}</p>
                <p>{brand.workingHours}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/15 pt-6 text-[11px] text-white/45">
            <p>Актуально на {dateLabel}</p>
            <p>Цены указаны в MDL</p>
          </div>
        </div>
      </section>

      <div className="catalog-print-body px-8 print:px-0">
        {sections.map((section) => (
          <section key={section.id} className="catalog-print-section">
            <div className="catalog-print-section-header mt-12 flex items-end justify-between gap-6 border-b-2 border-stone-950 pb-4 print:mt-0">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#A01D26]">Раздел</p>
                <h2 className="font-serif text-4xl text-stone-950">{section.title}</h2>
              </div>
              <p className="pb-1 text-sm text-stone-400">{section.productCount} моделей</p>
            </div>

            {section.categories.map((group) => (
              <div key={group.category.slug} className="catalog-print-category mb-10 mt-8">
                <div className="mb-4 flex items-baseline gap-3">
                  <h3 className="font-serif text-2xl text-stone-900">{group.category.name}</h3>
                  <span className="h-px flex-1 bg-stone-200" />
                  <span className="text-xs uppercase tracking-wide text-stone-400">
                    {group.products.length} {group.products.length === 1 ? "модель" : "модели"}
                  </span>
                </div>

                <div className="catalog-print-grid grid grid-cols-2 gap-5">
                  {group.products.map((product) => {
                    const meta = getCatalogProductMeta(product);
                    const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
                    const discountPct = onSale
                      ? Math.round(100 - (product.price / (product.oldPrice as number)) * 100)
                      : 0;
                    const visibleSwatches = meta.swatches.slice(0, 6);
                    const extraSwatches = meta.swatches.length - visibleSwatches.length;

                    return (
                      <article
                        key={product.slug}
                        className="catalog-print-product overflow-hidden rounded-2xl border border-stone-200 bg-white"
                      >
                        <div className="catalog-print-media relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#f7f0e8] to-[#efe3d6]">
                          {meta.image ? (
                            <Image
                              src={meta.image}
                              alt={meta.title}
                              fill
                              loading="eager"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={
                                product.galleryFit === "contain"
                                  ? "object-contain object-center p-5"
                                  : "object-cover object-center"
                              }
                            />
                          ) : null}

                          {product.isNew ? (
                            <span className="absolute left-3 top-3 rounded-full bg-stone-950 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
                              Новинка
                            </span>
                          ) : null}
                          {onSale ? (
                            <span className="absolute right-3 top-3 rounded-full bg-[#A01D26] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
                              −{discountPct}%
                            </span>
                          ) : null}
                        </div>

                        <div className="space-y-2 p-4">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">{meta.brand}</p>
                          <h4 className="font-serif text-base leading-snug text-stone-950">{meta.title}</h4>
                          <p className="text-xs text-stone-500">{product.material}</p>

                          <div className="flex flex-wrap items-baseline gap-2 pt-1">
                            <p className="text-base font-semibold text-stone-900">
                              {formatPrice(product.price, "ru")}
                            </p>
                            {onSale && product.oldPrice ? (
                              <p className="text-xs text-stone-400 line-through">
                                {formatPrice(product.oldPrice, "ru")}
                              </p>
                            ) : null}
                          </div>

                          {visibleSwatches.length > 0 ? (
                            <div className="flex items-center gap-1.5 pt-1">
                              {visibleSwatches.map((swatch, idx) => (
                                <span
                                  key={`${product.slug}-${swatch.name}-${idx}`}
                                  title={swatch.name}
                                  className="h-3.5 w-3.5 rounded-full border border-stone-300"
                                  style={{ backgroundColor: swatch.hex }}
                                />
                              ))}
                              {extraSwatches > 0 ? (
                                <span className="text-[10px] text-stone-400">+{extraSwatches}</span>
                              ) : null}
                            </div>
                          ) : null}

                          <p className="pt-1 text-[10px] text-stone-400">
                            {brand.domain}
                            {meta.urlPath}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <footer className="catalog-print-footer mt-4 border-t border-stone-200 px-8 pb-10 pt-6 text-center text-xs text-stone-400 print:px-0">
        <p className="font-serif text-lg text-stone-700">{brand.name}</p>
        <p className="mt-1">{brand.legalName}</p>
        <p className="mt-1">
          {brand.email} · {brand.phones[0]} · {brand.domain}
        </p>
      </footer>
    </div>
  );
}

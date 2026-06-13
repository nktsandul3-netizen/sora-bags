import Image from "next/image";
import ConsultationBlock from "@/components/ConsultationBlock";
import RevealOnScroll from "@/components/about/RevealOnScroll";

const cream = "#F5F1EB";
const ink = "#1A1A1A";
const accent = "#C67A2C";

const sectionPad = "py-[clamp(5rem,10vw,8.75rem)]";

function SectionHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <h2
      className={
        "font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-medium uppercase leading-[1.15] tracking-[0.12em] " +
        (align === "center" ? "text-center" : "text-left")
      }
      style={{ color: ink }}
    >
      {children}
    </h2>
  );
}

function AccentRule({ className = "" }: { className?: string }) {
  return (
    <span
      className={`mt-6 block h-px w-12 ${className}`}
      style={{ backgroundColor: accent }}
      aria-hidden
    />
  );
}

function BodyCopy({
  children,
  className = "",
  centered = false,
}: {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={
        "max-w-[650px] text-[15px] leading-[1.85] sm:text-base sm:leading-[1.9] " +
        (centered ? "mx-auto text-center" : "") +
        " " +
        className
      }
      style={{ color: `${ink}CC` }}
    >
      {children}
    </div>
  );
}

function EditorialImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  objectFit = "cover",
  objectPosition = "object-center",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={88}
        sizes={sizes}
        className={`${objectFit === "contain" ? "object-contain" : "object-cover"} ${objectPosition}`}
      />
    </div>
  );
}

export default function AboutUsContent() {
  return (
    <div className="overflow-x-clip" style={{ color: ink }}>
      {/* Hero */}
      <section className="relative w-full">
        <div className="relative aspect-[3/2] w-full min-h-[min(52vh,640px)] sm:min-h-[min(62vh,760px)] lg:min-h-[min(72vh,820px)]">
          <Image
            src="/about/brand-flatlay.png"
            alt="SÓRA Bags — Mediterranean luxury"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />
        </div>
      </section>

      {/* Intro — Lancaster-style centered copy on white */}
      <section className="bg-white pt-[clamp(2rem,5vw,3.5rem)] pb-[clamp(1.5rem,4vw,2.5rem)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mx-auto max-w-[800px] text-center">
            <div
              className="mx-auto max-w-[650px] space-y-6 text-[15px] leading-[1.9] sm:text-base sm:leading-[1.95]"
              style={{ color: `${ink}CC` }}
            >
              <p>
                Мы создали SÓRA Bags с простой идеей — помочь женщинам находить сумки, которые выглядят
                дорого, служат долго и остаются актуальными независимо от модных трендов. Мы уверены, что
                качественная сумка — это не просто аксессуар. Это часть образа, отражение вкуса и деталь,
                которая сопровождает свою владелицу каждый день.
              </p>
              <p>
                В основе нашего ассортимента лежат итальянские сумки и аксессуары, выбранные с особым
                вниманием к качеству материалов, удобству и дизайну. Мы сотрудничаем с проверенными
                поставщиками и уделяем большое внимание каждой модели, прежде чем она появится в нашей
                коллекции. Для нас важно, чтобы каждая сумка сочетала в себе элегантность, практичность и
                долговечность.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Split banners — 2×2 mosaic, full-height images without crop */}
      <section className="overflow-x-clip pt-0" style={{ backgroundColor: cream }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start">
          <RevealOnScroll className="min-w-0 lg:col-start-1 lg:row-start-1">
            <Image
              src="/about/modern-classic-hero.png"
              alt="SÓRA Bags — современная классика"
              width={768}
              height={1024}
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.08}
            className="flex items-center px-4 py-12 sm:px-6 sm:py-14 lg:col-start-2 lg:row-start-1 lg:py-16 xl:py-20 lg:pl-4 lg:pr-8 xl:pl-8 xl:pr-[max(1rem,calc((100vw-80rem)/2))]"
          >
            <div>
              <SectionHeading>Современная классика</SectionHeading>
              <AccentRule />
              <BodyCopy className="mt-8 space-y-5">
                <p>
                  SÓRA Bags появился благодаря любви к современной классике. Мы заметили, что многие
                  покупательницы сталкиваются с выбором между доступностью и качеством. Наша задача —
                  предложить изделия, которые выглядят премиально, изготовлены из качественных материалов и
                  доступны по справедливой цене.
                </p>
                <p>
                  Мы стремимся создавать не просто магазин, а место, где каждая женщина сможет найти
                  аксессуар, соответствующий ее стилю жизни. Будь то деловая встреча, путешествие, прогулка
                  по городу или особенное событие — правильная сумка помогает чувствовать себя уверенно в
                  любой ситуации.
                </p>
              </BodyCopy>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.12}
            className="flex items-center px-4 py-12 sm:px-6 sm:py-14 lg:col-start-1 lg:row-start-2 lg:py-16 xl:py-20 lg:pr-4 lg:pl-8 xl:pr-8 xl:pl-[max(1rem,calc((100vw-80rem)/2))]"
          >
            <div>
              <SectionHeading>Элегантность в деталях</SectionHeading>
              <AccentRule />
              <BodyCopy className="mt-8 space-y-5">
                <p>
                  Особое внимание мы уделяем обслуживанию клиентов. Мы всегда готовы помочь с выбором
                  модели, рассказать о материалах, подобрать подходящий цвет и ответить на любые вопросы.
                  Для нас важна не только покупка, но и впечатление, которое остаётся после неё.
                </p>
                <p>
                  Мы верим, что настоящая элегантность заключается в деталях. Именно поэтому каждая сумка
                  в SÓRA Bags подбирается с учётом актуальных тенденций, качества исполнения и
                  практичности в повседневной жизни.
                </p>
              </BodyCopy>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.16} className="min-w-0 lg:col-start-2 lg:row-start-2">
            <Image
              src="/about/elegance-details-hero.png"
              alt="SÓRA Bags — элегантность в деталях"
              width={599}
              height={1024}
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Craftsmanship & Quality */}
      <section
        className="overflow-x-clip pt-[clamp(1.5rem,4vw,2.5rem)] pb-[clamp(5rem,10vw,8.75rem)]"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="grid items-center lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <RevealOnScroll className="min-w-0">
            <Image
              src="/about/craftsmanship-hero.png"
              alt="SÓRA Bags — мастерство и качество"
              width={819}
              height={1024}
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.12}
            className="px-4 sm:px-6 lg:pl-4 lg:pr-8 xl:pl-8 xl:pr-[max(1rem,calc((100vw-80rem)/2))]"
          >
            <SectionHeading>Мастерство и качество</SectionHeading>
            <AccentRule />
            <BodyCopy className="mt-8 space-y-5">
              <p>
                Каждая сумка SÓRA начинается с тщательно отобранных материалов — мягкой итальянской кожи,
                продуманной фурнитуры и фактур, выбранных за красоту и долговечность. Мы работаем с
                мастерами, которые знают: настоящая роскошь — в деталях: точная строчка, сбалансированные
                пропорции, удобные внутренние отделения для повседневной жизни.
              </p>
              <p>
                Наш подход сознательно сдержанный. Мы выбираем чистые силуэты, нейтральные оттенки и формы,
                которые не привязаны к сезону — вещи, к которым возвращаетесь из года в год, от утренних
                встреч до вечера у моря.
              </p>
              <p>
                Качество — это не обещание на бирке. Это вес в руке, то, как ремень ложится на плечо, и
                удовольствие от вещи, созданной надолго.
              </p>
            </BodyCopy>
          </RevealOnScroll>
        </div>
      </section>

      {/* Editorial Image Grid */}
      <section className={sectionPad} style={{ backgroundColor: cream }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-12 md:mb-16">
            <SectionHeading align="center">The World of SÓRA</SectionHeading>
            <AccentRule className="mx-auto" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 sm:items-start">
            {/* Left column — staggered down for editorial rhythm */}
            <div className="flex flex-col gap-3 sm:gap-4 sm:mt-24">
              <RevealOnScroll>
                <Image
                  src="/about/world-of-sora-hero.png"
                  alt="SÓRA Bags — образ жизни"
                  width={682}
                  height={1024}
                  quality={90}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="block h-auto w-full"
                />
              </RevealOnScroll>

              <RevealOnScroll delay={0.12}>
                <Image
                  src="/about/editorial-cafe-hero.png"
                  alt="SÓRA Bags — кафе в Париже"
                  width={768}
                  height={1024}
                  quality={90}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="block h-auto w-full"
                />
              </RevealOnScroll>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <RevealOnScroll delay={0.08}>
                <Image
                  src="/about/editorial-paris-street-hero.png"
                  alt="SÓRA Bags — улица в Париже"
                  width={576}
                  height={1024}
                  quality={90}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="block h-auto w-full"
                />
              </RevealOnScroll>

              <RevealOnScroll delay={0.14}>
                <Image
                  src="/about/editorial-market-hero.png"
                  alt="SÓRA Bags — образ жизни на рынке"
                  width={768}
                  height={1024}
                  quality={90}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="block h-auto w-full"
                />
              </RevealOnScroll>
            </div>

            {/* Full-width cinematic closer */}
            <RevealOnScroll className="sm:col-span-2" delay={0.16}>
              <EditorialImage
                src="/about/editorial-lounge-hero.png"
                alt="SÓRA Bags — чёрная сумка в интерьере"
                className="aspect-[16/9] w-full min-h-[220px] sm:min-h-[280px]"
                sizes="100vw"
                objectPosition="object-[center_45%]"
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Existing consultation block — unchanged */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ConsultationBlock />
      </div>
    </div>
  );
}
import Image from "next/image";
import ConsultationBlock from "@/components/ConsultationBlock";
import RevealOnScroll from "@/components/about/RevealOnScroll";
import type { Locale } from "@/lib/i18n";

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

const copy = {
  ru: {
    intro: [
      "Мы создали SÓRA Bags с простой идеей — помочь женщинам находить сумки, которые выглядят дорого, служат долго и остаются актуальными независимо от модных трендов. Мы уверены, что качественная сумка — это не просто аксессуар. Это часть образа, отражение вкуса и деталь, которая сопровождает свою владелицу каждый день.",
      "В основе нашего ассортимента лежат итальянские сумки и аксессуары, выбранные с особым вниманием к качеству материалов, удобству и дизайну. Мы сотрудничаем с проверенными поставщиками и уделяем большое внимание каждой модели, прежде чем она появится в нашей коллекции. Для нас важно, чтобы каждая сумка сочетала в себе элегантность, практичность и долговечность.",
    ],
    modern: "Современная классика",
    modernText: [
      "SÓRA Bags появился благодаря любви к современной классике. Мы заметили, что многие покупательницы сталкиваются с выбором между доступностью и качеством. Наша задача — предложить изделия, которые выглядят премиально, изготовлены из качественных материалов и доступны по справедливой цене.",
      "Мы стремимся создавать не просто магазин, а место, где каждая женщина сможет найти аксессуар, соответствующий ее стилю жизни. Будь то деловая встреча, путешествие, прогулка по городу или особенное событие — правильная сумка помогает чувствовать себя уверенно в любой ситуации.",
    ],
    details: "Элегантность в деталях",
    detailsText: [
      "Особое внимание мы уделяем обслуживанию клиентов. Мы всегда готовы помочь с выбором модели, рассказать о материалах, подобрать подходящий цвет и ответить на любые вопросы. Для нас важна не только покупка, но и впечатление, которое остаётся после неё.",
      "Мы верим, что настоящая элегантность заключается в деталях. Именно поэтому каждая сумка в SÓRA Bags подбирается с учётом актуальных тенденций, качества исполнения и практичности в повседневной жизни.",
    ],
    craft: "Мастерство и качество",
    craftText: [
      "Каждая сумка SÓRA начинается с тщательно отобранных материалов — мягкой итальянской кожи, продуманной фурнитуры и фактур, выбранных за красоту и долговечность. Мы работаем с мастерами, которые знают: настоящая роскошь — в деталях: точная строчка, сбалансированные пропорции, удобные внутренние отделения для повседневной жизни.",
      "Наш подход сознательно сдержанный. Мы выбираем чистые силуэты, нейтральные оттенки и формы, которые не привязаны к сезону — вещи, к которым возвращаетесь из года в год, от утренних встреч до вечера у моря.",
      "Качество — это не обещание на бирке. Это вес в руке, то, как ремень ложится на плечо, и удовольствие от вещи, созданной надолго.",
    ],
    world: "The World of SÓRA",
  },
  ro: {
    intro: [
      "Am creat SÓRA Bags cu o idee simplă: să ajutăm femeile să găsească genți care arată elegant, rezistă în timp și rămân actuale dincolo de tendințe. O geantă de calitate nu este doar un accesoriu, ci o parte a imaginii personale.",
      "La baza sortimentului nostru sunt genți și accesorii italiene, selectate cu atenție pentru materiale, confort și design. Pentru noi contează ca fiecare model să combine eleganța, utilitatea și durabilitatea.",
    ],
    modern: "Clasic modern",
    modernText: [
      "SÓRA Bags a apărut din dragoste pentru clasicul modern. Multe cliente aleg între accesibilitate și calitate, iar misiunea noastră este să oferim produse cu aspect premium, materiale bune și preț corect.",
      "Ne dorim să fim mai mult decât un magazin: un loc unde fiecare femeie găsește accesoriul potrivit stilului ei de viață, de la întâlniri de business până la plimbări sau evenimente speciale.",
    ],
    details: "Eleganță în detalii",
    detailsText: [
      "Acordăm o atenție deosebită serviciului pentru clienți. Vă ajutăm să alegeți modelul, materialul și culoarea potrivită și răspundem la întrebări cu grijă.",
      "Credem că eleganța adevărată stă în detalii. De aceea, fiecare geantă SÓRA este selectată pentru tendințe actuale, calitate de execuție și utilitate zilnică.",
    ],
    craft: "Măiestrie și calitate",
    craftText: [
      "Fiecare geantă SÓRA începe cu materiale atent alese: piele italiană, texturi frumoase și feronerie gândită pentru durabilitate. Lucrăm cu furnizori care înțeleg valoarea proporțiilor, cusăturilor și compartimentelor comode.",
      "Alegem siluete curate, nuanțe versatile și forme care nu depind de un singur sezon, piese la care revii de la întâlnirile de dimineață până la serile în oraș.",
      "Calitatea înseamnă felul în care se simte produsul în mână, cum cade cureaua pe umăr și bucuria unei piese create să dureze.",
    ],
    world: "Universul SÓRA",
  },
  en: {
    intro: [
      "We created SÓRA Bags with a simple idea: to help women find bags that look refined, last long and stay relevant beyond trends. A quality bag is more than an accessory; it is part of a look and a detail that accompanies its owner every day.",
      "Our assortment is built around Italian bags and accessories selected with care for materials, comfort and design. Every model should combine elegance, practicality and durability.",
    ],
    modern: "Modern classic",
    modernText: [
      "SÓRA Bags grew from a love of modern classics. Many customers have to choose between accessibility and quality; our task is to offer pieces that look premium, use quality materials and come at a fair price.",
      "We aim to be more than a store: a place where every woman can find an accessory that fits her lifestyle, from business meetings to travel, city walks and special occasions.",
    ],
    details: "Elegance in details",
    detailsText: [
      "We pay special attention to customer service. We are ready to help with model choice, materials, color and any questions that come up.",
      "We believe true elegance lives in the details. That is why every SÓRA bag is selected for current style, quality execution and everyday practicality.",
    ],
    craft: "Craftsmanship and quality",
    craftText: [
      "Every SÓRA bag begins with carefully chosen materials: soft Italian leather, thoughtful hardware and textures selected for beauty and durability. We work with partners who know that real luxury lives in precise stitching, balanced proportions and convenient compartments.",
      "Our approach is intentionally restrained. We choose clean silhouettes, neutral shades and shapes that are not tied to one season, pieces you return to year after year.",
      "Quality is not a promise on a tag. It is the weight in the hand, the way a strap rests on the shoulder and the pleasure of an item made to last.",
    ],
    world: "The World of SÓRA",
  },
};

export default function AboutUsContent({ locale = "ru" }: { locale?: Locale }) {
  const c = copy[locale];
  return (
    <div className="overflow-x-clip" style={{ color: ink }}>
      {/* Hero */}
      <section className="relative w-full bg-white">
        <div className="relative h-[42vw] min-h-[260px] max-h-[560px] w-full overflow-hidden bg-[#F5F1EB]">
          <Image
            src="/about/about-hero-sora-florence.png"
            alt="SÓRA Bags — Florence editorial"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
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
              {c.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
              <SectionHeading>{c.modern}</SectionHeading>
              <AccentRule />
              <BodyCopy className="mt-8 space-y-5">
                {c.modernText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </BodyCopy>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.12}
            className="flex items-center px-4 py-12 sm:px-6 sm:py-14 lg:col-start-1 lg:row-start-2 lg:py-16 xl:py-20 lg:pr-4 lg:pl-8 xl:pr-8 xl:pl-[max(1rem,calc((100vw-80rem)/2))]"
          >
            <div>
              <SectionHeading>{c.details}</SectionHeading>
              <AccentRule />
              <BodyCopy className="mt-8 space-y-5">
                {c.detailsText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
            <SectionHeading>{c.craft}</SectionHeading>
            <AccentRule />
            <BodyCopy className="mt-8 space-y-5">
              {c.craftText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </BodyCopy>
          </RevealOnScroll>
        </div>
      </section>

      {/* Editorial Image Grid */}
      <section className={sectionPad} style={{ backgroundColor: cream }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-12 md:mb-16">
            <SectionHeading align="center">{c.world}</SectionHeading>
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

          </div>
        </div>
      </section>

      {/* Existing consultation block — unchanged */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ConsultationBlock locale={locale} />
      </div>
    </div>
  );
}
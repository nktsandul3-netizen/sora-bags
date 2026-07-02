import { brand } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-stone-100 py-3.5 sm:flex-row sm:gap-6">
      <dt className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400 sm:w-44">
        {label}
      </dt>
      <dd className="text-stone-800">{value}</dd>
    </div>
  );
}

export default function RekvizityContent({ locale = "ru" }: { locale?: Locale }) {
  const c = {
    title: locale === "ru" ? "Реквизиты" : locale === "ro" ? "Date companie" : "Company details",
    company: locale === "ru" ? "Компания" : locale === "ro" ? "Companie" : "Company",
    beneficiary: locale === "ru" ? "Бенефициар" : locale === "ro" ? "Beneficiar" : "Beneficiary",
    reg: locale === "ru" ? "Рег. номер / IDNO" : locale === "ro" ? "Nr. înregistrare / IDNO" : "Registration no. / IDNO",
    director: locale === "ru" ? "Директор" : locale === "ro" ? "Director" : "Director",
    bankDetails: locale === "ru" ? "Банковские реквизиты для MDL" : locale === "ro" ? "Date bancare pentru MDL" : "Bank details for MDL",
    bank: locale === "ru" ? "Банк" : locale === "ro" ? "Bancă" : "Bank",
    note: locale === "ru"
      ? "При оплате в MDL указывайте назначение платежа и номер заказа. После перевода пришлите подтверждение на"
      : locale === "ro"
        ? "La plata în MDL, indicați scopul plății și numărul comenzii. După transfer, trimiteți confirmarea la"
        : "When paying in MDL, include payment purpose and order number. After transfer, send confirmation to",
  };
  return (
    <div className="text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
      <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">{c.title}</h1>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
        {c.company}
      </h2>
      <dl className="mt-4">
        <Row label={c.beneficiary} value="(R) RONS Concept Store SRL" />
        <Row
          label={c.reg}
          value="1026023036917"
        />
        <Row label={c.director} value="Radion Olga" />
      </dl>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
        {c.bankDetails}
      </h2>
      <dl className="mt-4">
        <Row label="IBAN" value="MD55AG000000022517554857" />
        <Row label={c.bank} value="BC «MAIB» S.A. suc. «MAIB PARK»" />
        <Row label="SWIFT" value="AGRNMD2X522" />
      </dl>

      <p className="mt-8 text-[13px] leading-relaxed text-stone-500">
        {c.note}{" "}
        <a
          href={`mailto:${brand.email}`}
          className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline"
        >
          {brand.email}
        </a>
        .
      </p>
    </div>
  );
}
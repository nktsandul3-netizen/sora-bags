import { brand } from "@/lib/config";

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

export default function RekvizityContent() {
  return (
    <div className="text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
      <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">Реквизиты</h1>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
        Компания
      </h2>
      <dl className="mt-4">
        <Row label="Бенефициар" value="(R) RONS Concept Store SRL" />
        <Row
          label="Рег. номер / IDNO"
          value="1026023036917"
        />
        <Row label="Директор" value="Radion Olga" />
      </dl>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
        Банковские реквизиты для MDL
      </h2>
      <dl className="mt-4">
        <Row label="IBAN" value="MD55AG000000022517554857" />
        <Row label="Банк" value="BC «MAIB» S.A. suc. «MAIB PARK»" />
        <Row label="SWIFT" value="AGRNMD2X522" />
      </dl>

      <p className="mt-8 text-[13px] leading-relaxed text-stone-500">
        При оплате в леях (MDL) указывайте назначение платежа и номер заказа. После
        перевода пришлите подтверждение на{" "}
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
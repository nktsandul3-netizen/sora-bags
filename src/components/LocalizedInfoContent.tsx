import type { Locale } from "@/lib/i18n";

type Section = {
  title: string;
  paragraphs: string[];
};

const copy: Record<Locale, Record<string, { title: string; intro: string; sections: Section[] }>> = {
  ru: {},
  ro: {
    "o-nas": {
      title: "Despre SÓRA",
      intro: "SÓRA Bags este un magazin de genți și accesorii selectate cu atenție pentru femei care apreciază eleganța, calitatea și utilitatea zilnică.",
      sections: [
        {
          title: "Ideea noastră",
          paragraphs: [
            "Alegem modele care arată premium, sunt plăcute la purtare și rămân actuale indiferent de tendințe.",
            "Fiecare produs este selectat după calitatea materialelor, forma, detaliile și confortul în utilizare.",
          ],
        },
        {
          title: "Serviciu",
          paragraphs: [
            "Suntem aici pentru a ajuta la alegerea modelului, culorii și formatului potrivit.",
            "Pentru noi contează nu doar achiziția, ci și experiența pe care clientul o are cu SÓRA.",
          ],
        },
      ],
    },
    "oplata-i-dostavka": {
      title: "Plată și livrare",
      intro: "După plasarea comenzii, managerul SÓRA vă contactează pentru confirmarea disponibilității, livrării și metodei de plată.",
      sections: [
        { title: "Livrare", paragraphs: ["Livrăm în Chișinău și pe întreg teritoriul Republicii Moldova.", "Termenul depinde de disponibilitatea produsului: produsele în stoc se livrează mai rapid, iar modelele la comandă pot necesita 7–14 zile lucrătoare."] },
        { title: "Plată", paragraphs: ["Metoda de plată se confirmă cu managerul după plasarea comenzii.", "Pentru unele comenzi poate fi disponibilă plata la primire sau prin transfer/link de plată."] },
      ],
    },
    vozvrat: {
      title: "Retur și schimb",
      intro: "Produsele pot fi schimbate sau returnate în condițiile legislației aplicabile și ale politicii magazinului.",
      sections: [
        { title: "Produse fără defecte", paragraphs: ["Produsul trebuie să nu fi fost utilizat, să păstreze aspectul comercial, etichetele și ambalajul.", "Costurile de livrare pentru retur pot fi suportate de cumpărător."] },
        { title: "Defecte de fabricație", paragraphs: ["Dacă observați un defect de fabricație, contactați-ne cât mai curând.", "Vom analiza situația și vom propune schimb, reparație sau rambursare, după caz."] },
      ],
    },
    garantiya: {
      title: "Garanția calității",
      intro: "Pentru produsele SÓRA se oferă garanție pentru defecte de fabricație, cu respectarea regulilor de utilizare și îngrijire.",
      sections: [
        { title: "Ce acoperă garanția", paragraphs: ["Garanția se aplică defectelor de fabricație identificate în perioada de garanție.", "Uzura naturală, zgârieturile și deteriorările cauzate de utilizare incorectă nu sunt acoperite."] },
        { title: "Îngrijire", paragraphs: ["Evitați umezeala excesivă, expunerea directă la soare și substanțele chimice.", "Păstrați produsul într-un săculeț textil și curățați-l cu produse potrivite pentru piele."] },
      ],
    },
    "podarochnye-sertifikaty": {
      title: "Certificate cadou",
      intro: "Certificatul cadou SÓRA este o modalitate elegantă de a oferi posibilitatea de a alege geanta sau accesoriul potrivit.",
      sections: [
        { title: "Condiții", paragraphs: ["Certificatele sunt disponibile de la 500 MDL și sunt valabile 6 luni.", "Certificatul nu poate fi schimbat în numerar."] },
        { title: "Utilizare", paragraphs: ["După cumpărare, certificatul este trimis electronic cu un număr unic.", "Poate fi folosit pentru produse disponibile în magazinul SÓRA."] },
      ],
    },
    "politika-konfidentsialnosti": {
      title: "Politica de confidențialitate",
      intro: "Folosim datele personale doar pentru procesarea comenzilor, livrare, comunicare și îmbunătățirea serviciilor.",
      sections: [
        { title: "Date colectate", paragraphs: ["Putem colecta nume, telefon, email, adresă de livrare și informații despre comandă.", "Datele nu sunt vândute terților."] },
        { title: "Scop", paragraphs: ["Datele sunt necesare pentru confirmarea și livrarea comenzii, precum și pentru suport client."] },
      ],
    },
    rekvizity: {
      title: "Date companie",
      intro: "Datele juridice și informațiile companiei sunt disponibile la cerere.",
      sections: [{ title: "Contact", paragraphs: ["Pentru informații suplimentare, vă rugăm să ne contactați prin telefon sau email."] }],
    },
    "nashi-magaziny": {
      title: "Magazinele noastre",
      intro: "Informațiile despre magazinele SÓRA vor fi publicate în curând.",
      sections: [{ title: "Disponibilitate", paragraphs: ["Pentru adresă, program sau disponibilitatea unui model, contactați-ne prin metoda preferată."] }],
    },
  },
  en: {
    "o-nas": {
      title: "About SÓRA",
      intro: "SÓRA Bags is a curated store of bags and accessories for women who value elegance, quality and everyday practicality.",
      sections: [
        { title: "Our idea", paragraphs: ["We choose models that look premium, feel comfortable and stay relevant beyond trends.", "Every item is selected for materials, shape, details and everyday usability."] },
        { title: "Service", paragraphs: ["We help customers choose the right model, color and format.", "For us, the experience after purchase matters as much as the purchase itself."] },
      ],
    },
    "oplata-i-dostavka": {
      title: "Payment and delivery",
      intro: "After you place an order, a SÓRA manager contacts you to confirm availability, delivery and payment.",
      sections: [
        { title: "Delivery", paragraphs: ["We deliver in Chișinău and across Moldova.", "Delivery time depends on availability: in-stock items ship faster, while pre-order models may take 7–14 business days."] },
        { title: "Payment", paragraphs: ["Payment method is confirmed with the manager after ordering.", "Depending on the order, payment on delivery, bank transfer or payment link may be available."] },
      ],
    },
    vozvrat: {
      title: "Returns and exchanges",
      intro: "Products can be exchanged or returned according to applicable law and store policy.",
      sections: [
        { title: "Items without defects", paragraphs: ["The item must be unused and keep its commercial appearance, tags and packaging.", "Return delivery costs may be covered by the buyer."] },
        { title: "Manufacturing defects", paragraphs: ["If you notice a manufacturing defect, contact us as soon as possible.", "We will review the case and offer exchange, repair or refund when applicable."] },
      ],
    },
    garantiya: {
      title: "Quality warranty",
      intro: "SÓRA products include warranty coverage for manufacturing defects when care and use rules are followed.",
      sections: [
        { title: "Coverage", paragraphs: ["Warranty applies to manufacturing defects found within the warranty period.", "Natural wear, scratches and damage caused by improper use are not covered."] },
        { title: "Care", paragraphs: ["Avoid excessive moisture, direct sunlight and chemical exposure.", "Store the item in a textile dust bag and clean it with products suitable for leather."] },
      ],
    },
    "podarochnye-sertifikaty": {
      title: "Gift certificates",
      intro: "A SÓRA gift certificate is an elegant way to let someone choose the right bag or accessory.",
      sections: [
        { title: "Terms", paragraphs: ["Certificates are available from 500 MDL and are valid for 6 months.", "A certificate cannot be exchanged for cash."] },
        { title: "How to use", paragraphs: ["After purchase, the certificate is sent electronically with a unique number.", "It can be used for products available at SÓRA."] },
      ],
    },
    "politika-konfidentsialnosti": {
      title: "Privacy policy",
      intro: "We use personal data only to process orders, arrange delivery, communicate with customers and improve our service.",
      sections: [
        { title: "Data collected", paragraphs: ["We may collect name, phone, email, delivery address and order information.", "We do not sell personal data to third parties."] },
        { title: "Purpose", paragraphs: ["Data is needed to confirm and deliver orders and provide customer support."] },
      ],
    },
    rekvizity: {
      title: "Company details",
      intro: "Legal and company information is available upon request.",
      sections: [{ title: "Contact", paragraphs: ["For additional information, please contact us by phone or email."] }],
    },
    "nashi-magaziny": {
      title: "Our stores",
      intro: "Information about SÓRA stores will be published soon.",
      sections: [{ title: "Availability", paragraphs: ["For address, working hours or model availability, contact us in the most convenient way."] }],
    },
  },
};

export default function LocalizedInfoContent({ slug, locale }: { slug: string; locale: Locale }) {
  const page = copy[locale][slug] ?? copy.en[slug];
  if (!page) return null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">{page.title}</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600">{page.intro}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {page.sections.map((section) => (
          <section key={section.title} className="rounded-2xl bg-white p-7 shadow-[0_4px_24px_rgba(28,25,23,0.06)]">
            <h2 className="font-serif text-xl text-stone-950">{section.title}</h2>
            <div className="mt-4 space-y-3 text-[15px] leading-7 text-stone-600">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

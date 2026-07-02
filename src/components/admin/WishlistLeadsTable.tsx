import Link from "next/link";
import type { WishlistCustomerLead } from "@/lib/admin/sales-intelligence";

function whatsappHref(lead: WishlistCustomerLead) {
  const digits = lead.customerPhone?.replace(/\D/g, "");
  if (!digits) return null;
  const text = `Здравствуйте, ${lead.customerName}! Видим, что вам понравилась модель ${lead.productTitle} в SÓRA. Можем подсказать по наличию, цветам или доставке.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export default function WishlistLeadsTable({
  leads,
  compact = false,
}: {
  leads: WishlistCustomerLead[];
  compact?: boolean;
}) {
  if (leads.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-stone-400">
        Пока нет авторизованных клиентов с товарами в избранном без покупки.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-stone-400">
            <th className="px-4 py-3 font-medium">Клиент</th>
            <th className="px-4 py-3 font-medium">Товар в избранном</th>
            {!compact && <th className="px-4 py-3 font-medium">Дата</th>}
            <th className="px-4 py-3 text-right font-medium">Действие</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const wa = whatsappHref(lead);
            return (
              <tr
                key={`${lead.customerId}-${lead.productSlug}`}
                className="border-t border-stone-100 hover:bg-stone-50"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/customers/${lead.customerId}`}
                    className="font-medium text-stone-900 hover:text-[#A01D26]"
                  >
                    {lead.customerName}
                  </Link>
                  <p className="mt-0.5 text-xs text-stone-400">
                    {lead.customerPhone || lead.customerEmail}
                  </p>
                </td>
                <td className="px-4 py-3">
                  {lead.productId ? (
                    <Link
                      href={`/admin/products/${lead.productId}`}
                      className="font-medium text-stone-800 hover:text-[#A01D26]"
                    >
                      {lead.productTitle}
                    </Link>
                  ) : (
                    <span className="font-medium text-stone-800">{lead.productTitle}</span>
                  )}
                  <p className="mt-0.5 text-xs text-stone-400">
                    Добавлял(а): {lead.adds} раз(а)
                  </p>
                </td>
                {!compact && (
                  <td className="whitespace-nowrap px-4 py-3 text-stone-500">
                    {new Date(lead.lastAddedAt).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    {wa && (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#25D366] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#20bd5a]"
                      >
                        WhatsApp
                      </a>
                    )}
                    <a
                      href={`mailto:${lead.customerEmail}?subject=${encodeURIComponent("SÓRA: товар в избранном")}`}
                      className="rounded-full border border-stone-300 px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:border-stone-500"
                    >
                      Email
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

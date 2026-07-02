import { brand } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-stone-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const localizedPrivacy = {
  ro: {
    title: "Politica de confidențialitate",
    updated: "Ultima actualizare: 14 iunie 2026",
    intro: `Bine ați venit pe site-ul ${brand.name}. Respectăm dreptul fiecărui utilizator la confidențialitate și protejăm datele personale oferite la utilizarea site-ului.`,
    sections: [
      { title: "1. Ce date colectăm", body: "Putem colecta următoarele informații:", items: ["Nume și prenume;", "Număr de telefon;", "Adresă de email;", "Adresă de livrare;", "Informații despre comenzi;", "Date colectate automat de browser, precum IP, tip dispozitiv, cookie-uri și alte date tehnice."] },
      { title: "2. Pentru ce folosim datele", body: "Informațiile colectate sunt folosite pentru:", items: ["Procesarea și executarea comenzilor;", "Comunicarea cu clientul despre comandă;", "Organizarea livrării;", "Îmbunătățirea site-ului și serviciilor;", "Trimiterea notificărilor despre comenzi;", "Respectarea cerințelor legale."] },
      { title: "3. Transferul datelor către terți", body: "Nu vindem și nu transmitem date personale către terți, cu excepția cazurilor necesare pentru livrare, cerute de lege sau acceptate de utilizator.", items: [] },
      { title: "4. Cookie-uri", body: "Site-ul poate utiliza cookie-uri pentru funcționare corectă, analiză și îmbunătățirea experienței. Cookie-urile pot fi dezactivate în browser, însă unele funcții pot funcționa incorect.", items: [] },
      { title: "5. Protecția datelor", body: "Aplicăm măsuri organizatorice și tehnice rezonabile pentru protejarea datelor personale împotriva accesului neautorizat, modificării, divulgării sau distrugerii.", items: [] },
      { title: "6. Perioada de stocare", body: "Datele personale sunt păstrate doar pe perioada necesară scopurilor de prelucrare sau conform cerințelor legale.", items: [] },
      { title: "7. Drepturile utilizatorului", body: "Utilizatorul are dreptul să solicite informații despre datele sale, corectarea datelor inexacte, ștergerea datelor când nu mai sunt necesare și retragerea consimțământului.", items: [] },
      { title: "8. Informații de contact", body: "Pentru întrebări privind prelucrarea datelor personale ne puteți contacta:", items: [] },
      { title: "9. Modificări ale politicii", body: "Ne rezervăm dreptul de a modifica această politică. Versiunea actuală este publicată întotdeauna pe site.", items: [] },
    ],
    site: "Site:",
  },
  en: {
    title: "Privacy policy",
    updated: "Last updated: June 14, 2026",
    intro: `Welcome to ${brand.name}. We respect every user's right to privacy and protect the personal data you provide when using our website.`,
    sections: [
      { title: "1. Data we collect", body: "We may collect the following information:", items: ["First and last name;", "Phone number;", "Email address;", "Delivery address;", "Order information;", "Data automatically collected by the browser, such as IP address, device type, cookies and other technical data."] },
      { title: "2. How data is used", body: "Collected information is used for:", items: ["Processing and fulfilling orders;", "Contacting the customer about an order;", "Arranging delivery;", "Improving the website and service quality;", "Sending order notifications;", "Meeting legal requirements."] },
      { title: "3. Sharing data with third parties", body: "We do not sell or transfer personal data to third parties except when needed for delivery, required by law or agreed by the user.", items: [] },
      { title: "4. Cookies", body: "The site may use cookies for correct operation, analytics and improved user experience. Cookies can be disabled in browser settings, but some site functions may not work correctly.", items: [] },
      { title: "5. Data protection", body: "We take reasonable organizational and technical measures to protect personal data against unauthorized access, modification, disclosure or destruction.", items: [] },
      { title: "6. Data retention", body: "Personal data is stored only for the period necessary for processing purposes or according to legal requirements.", items: [] },
      { title: "7. User rights", body: "The user has the right to request information about personal data, correct inaccurate data, request deletion when storage is no longer required and withdraw consent.", items: [] },
      { title: "8. Contact information", body: "For questions about personal data processing, you can contact us:", items: [] },
      { title: "9. Policy changes", body: "We reserve the right to update this privacy policy. The current version is always published on this website.", items: [] },
    ],
    site: "Website:",
  },
};

export default function PrivacyPolicyContent({ locale = "ru" }: { locale?: Locale }) {
  if (locale !== "ru") {
    const c = localizedPrivacy[locale];
    return (
      <div className="text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
        <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">{c.title}</h1>
        <p className="mt-3 text-[13px] text-stone-400">{c.updated}</p>
        <p className="mt-6">{c.intro}</p>
        {c.sections.map((section) => (
          <Section key={section.title} title={section.title}>
            <p>{section.body}</p>
            {section.items.length > 0 ? <List items={section.items} /> : null}
            {section.title.startsWith("8.") ? (
              <div className="space-y-1">
                <p className="text-stone-800">{brand.name}</p>
                <p>
                  E-mail:{" "}
                  <a href={`mailto:${brand.email}`} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                    {brand.email}
                  </a>
                </p>
                <p>
                  {c.site}{" "}
                  <a href={`https://${brand.domain}`} className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline">
                    {brand.domain}
                  </a>
                </p>
              </div>
            ) : null}
          </Section>
        ))}
      </div>
    );
  }
  return (
    <div className="text-sm leading-[1.75] text-stone-600 sm:text-[15px]">
      <h1 className="font-serif text-3xl text-stone-950 sm:text-4xl">
        Политика конфиденциальности
      </h1>
      <p className="mt-3 text-[13px] text-stone-400">
        Последнее обновление: 14 июня 2026 г.
      </p>

      <p className="mt-6">
        Добро пожаловать на сайт {brand.name}. Мы уважаем право каждого пользователя
        на конфиденциальность и обязуемся защищать персональные данные, которые вы
        предоставляете при использовании нашего сайта.
      </p>

      <Section title="1. Какие данные мы собираем">
        <p>Мы можем собирать следующую информацию:</p>
        <List
          items={[
            "Имя и фамилия;",
            "Номер телефона;",
            "Адрес электронной почты;",
            "Адрес доставки;",
            "Информация о заказах;",
            "Данные, автоматически собираемые браузером (IP-адрес, тип устройства, файлы cookie и другие технические данные).",
          ]}
        />
      </Section>

      <Section title="2. Для чего используются данные">
        <p>Собранная информация используется для:</p>
        <List
          items={[
            "Обработки и выполнения заказов;",
            "Связи с клиентом по вопросам заказа;",
            "Организации доставки товаров;",
            "Улучшения работы сайта и качества обслуживания;",
            "Отправки уведомлений о заказах;",
            "Выполнения требований законодательства.",
          ]}
        />
      </Section>

      <Section title="3. Передача данных третьим лицам">
        <p>
          Мы не продаем и не передаем персональные данные третьим лицам, за
          исключением случаев:
        </p>
        <List
          items={[
            "Когда это необходимо для доставки заказа;",
            "Когда этого требует законодательство;",
            "Когда пользователь дал свое согласие.",
          ]}
        />
      </Section>

      <Section title="4. Файлы Cookie">
        <p>
          Сайт может использовать файлы Cookie для обеспечения корректной работы
          сайта, анализа посещаемости и улучшения пользовательского опыта.
        </p>
        <p>
          Пользователь может отключить Cookie в настройках своего браузера, однако
          некоторые функции сайта могут работать некорректно.
        </p>
      </Section>

      <Section title="5. Защита данных">
        <p>
          Мы принимаем разумные организационные и технические меры для защиты
          персональных данных от несанкционированного доступа, изменения, раскрытия
          или уничтожения.
        </p>
      </Section>

      <Section title="6. Срок хранения данных">
        <p>
          Персональные данные хранятся только в течение периода, необходимого для
          выполнения целей их обработки или в соответствии с требованиями
          законодательства.
        </p>
      </Section>

      <Section title="7. Права пользователя">
        <p>Пользователь имеет право:</p>
        <List
          items={[
            "Запрашивать информацию о своих персональных данных;",
            "Требовать исправления неточных данных;",
            "Требовать удаления данных, если их хранение больше не требуется;",
            "Отозвать согласие на обработку данных.",
          ]}
        />
      </Section>

      <Section title="8. Контактная информация">
        <p>
          По вопросам обработки персональных данных вы можете связаться с нами:
        </p>
        <div className="space-y-1">
          <p className="text-stone-800">{brand.name}</p>
          <p>
            E-mail:{" "}
            <a
              href={`mailto:${brand.email}`}
              className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline"
            >
              {brand.email}
            </a>
          </p>
          <p>
            Сайт:{" "}
            <a
              href={`https://${brand.domain}`}
              className="text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline"
            >
              {brand.domain}
            </a>
          </p>
        </div>
      </Section>

      <Section title="9. Изменения политики">
        <p>
          Мы оставляем за собой право изменять настоящую Политику
          конфиденциальности. Актуальная версия всегда публикуется на данном сайте.
        </p>
      </Section>
    </div>
  );
}

import { defaultLocale, type Locale } from "@/lib/i18n";
import {
  localizeMeasurement,
  lookupSpecTranslation,
  specLabels,
  specValues,
} from "@/lib/product-spec-i18n";
import type { Product, ProductColor } from "@/lib/types";

const text: Record<string, Partial<Record<Locale, string>>> = {
  "Доставка 7–14 дней": { ro: "Livrare 7–14 zile", en: "Delivery 7–14 days" },
  Женский: { ro: "Femei", en: "Women" },
  Италия: { ro: "Italia", en: "Italy" },
  Пол: { ro: "Gen", en: "Gender" },
  Тип: { ro: "Tip", en: "Type" },
  Размер: { ro: "Dimensiune", en: "Size" },
  "Страна производства": { ro: "Țara de origine", en: "Country of origin" },
  Кожа: { ro: "Piele", en: "Leather" },
  Материал: { ro: "Material", en: "Material" },
  Отделение: { ro: "Compartiment", en: "Compartment" },
  Застёжка: { ro: "Închidere", en: "Closure" },
  Ремень: { ro: "Curea", en: "Strap" },
  Ручка: { ro: "Mâner", en: "Handle" },
  Ручки: { ro: "Mânere", en: "Handles" },
  Декор: { ro: "Decor", en: "Decor" },
  Силуэт: { ro: "Siluetă", en: "Silhouette" },
  Пряжка: { ro: "Cataramă", en: "Buckle" },
  Доставка: { ro: "Livrare", en: "Delivery" },
  Конструкция: { ro: "Construcție", en: "Construction" },
  Фурнитура: { ro: "Feronerie", en: "Hardware" },
  Замок: { ro: "Încuietoare", en: "Lock" },
  Назначение: { ro: "Utilizare", en: "Use" },
  Категория: { ro: "Categorie", en: "Category" },
  Плетение: { ro: "Împletire", en: "Weaving" },
  Комплект: { ro: "Set", en: "Set" },
  "Вместительное основное отделение": { ro: "Compartiment principal încăpător", en: "Spacious main compartment" },
  "Металлическая поворотная": { ro: "Închidere metalică rotativă", en: "Metal turn-lock closure" },
  "Регулируемый плечевой ремень": { ro: "Curea de umăr reglabilă", en: "Adjustable shoulder strap" },
  "Короткая верхняя ручка": { ro: "Mâner superior scurt", en: "Short top handle" },
  "Декоративная бахрома по передней части": { ro: "Franjuri decorative pe partea frontală", en: "Decorative fringe on the front" },
  "Надёжная застёжка-молния": { ro: "Fermoar sigur", en: "Secure zip closure" },
  "Длинные для ношения на плече": { ro: "Lungi, pentru purtare pe umăr", en: "Long handles for shoulder wear" },
  "Лёгкая и комфортная": { ro: "Ușoară și confortabilă", en: "Lightweight and comfortable" },
  "Премиальная металлическая фурнитура": { ro: "Feronerie metalică premium", en: "Premium metal hardware" },
  "Широкий регулируемый плечевой ремень": { ro: "Curea lată reglabilă de umăr", en: "Wide adjustable shoulder strap" },
  "Декоративная металлическая пряжка премиального качества": { ro: "Cataramă metalică decorativă premium", en: "Premium decorative metal buckle" },
  "Усиленная для сохранения формы": { ro: "Structură întărită pentru păstrarea formei", en: "Reinforced to hold its shape" },
  "Премиальная золотистая фурнитура": { ro: "Feronerie aurie premium", en: "Premium gold-tone hardware" },
  "Жёсткая для сохранения формы": { ro: "Rigidă pentru păstrarea formei", en: "Structured to hold its shape" },
  "Удобная верхняя ручка": { ro: "Mâner superior comod", en: "Comfortable top handle" },
  "Съёмный регулируемый плечевой ремень": { ro: "Curea de umăr detașabilă și reglabilă", en: "Detachable adjustable shoulder strap" },
  "Надёжный поворотный замок": { ro: "Încuietoare rotativă sigură", en: "Secure turn lock" },
  "Премиальная металлическая фурнитура золотого цвета": { ro: "Feronerie metalică aurie premium", en: "Premium gold-tone metal hardware" },
  "Для повседневных, деловых и вечерних образов": { ro: "Pentru ținute de zi cu zi, de afaceri și de seară", en: "For everyday, business and evening looks" },
  "Средняя / вместительная сумка": { ro: "Medie / încăpătoare", en: "Medium / spacious" },
  "Металлическая регулируемая пряжка на ремне": { ro: "Cataramă metalică reglabilă pe curea", en: "Metal adjustable buckle on strap" },
  "Одно основное отделение, внутри карман на молнии": { ro: "Un compartiment principal, cu buzunar interior cu fermoar", en: "One main compartment with an inner zip pocket" },
  "Основная застёжка — молния; внутри/сбоку видна магнитная кнопка": { ro: "Închidere principală cu fermoar; interior/lateral cu capse magnetice", en: "Main zip closure; magnetic snap visible inside/on the side" },
  "Металлическая, золотистого цвета": { ro: "Metalică, aurie", en: "Metal, gold-tone" },
  "1–3 дня": { ro: "1–3 zile", en: "1–3 days" },
  Уточняется: { ro: "Se clarifică", en: "To be confirmed" },
  "Эффектное ручное плетение кожи": { ro: "Împletire manuală expresivă a pielii", en: "Statement hand-woven leather" },
  "Удобные двойные ручки": { ro: "Mânere duble comode", en: "Comfortable double handles" },
  "Съёмный плечевой ремень": { ro: "Curea de umăr detașabilă", en: "Detachable shoulder strap" },
  "Кожаный клатч-органайзер": { ro: "Clutch-organizator din piele", en: "Leather organizer clutch" },
  "Для повседневных и деловых образов": { ro: "Pentru ținute de zi cu zi și de afaceri", en: "For everyday and business looks" },
  "38 × 28 × 13 см": { ro: "38 × 28 × 13 cm", en: "38 × 28 × 13 cm" },
  "30 × 37 × 10 см": { ro: "30 × 37 × 10 cm", en: "30 × 37 × 10 cm" },
  "Один плечевой ремень, регулируемый": {
    ro: "O singură curea de umăr, reglabilă",
    en: "One adjustable shoulder strap",
  },
  "Металлическая регулируемая пряжка": {
    ro: "Cataramă metalică reglabilă",
    en: "Metal adjustable buckle",
  },
  "Одно основное отделение": { ro: "Un compartiment principal", en: "One main compartment" },
  "Основная застёжка — молния": { ro: "Închidere principală cu fermoar", en: "Main zip closure" },
  "Shoulder Bag / Hobo Bag": { ro: "Shoulder Bag / Hobo Bag", en: "Shoulder Bag / Hobo Bag" },
  "Женская сумка-хобо / shoulder bag": {
    ro: "Geantă hobo pentru femei / shoulder bag",
    en: "Women's hobo bag / shoulder bag",
  },
  "37 × 18 × 10 см": { ro: "37 × 18 × 10 cm", en: "37 × 18 × 10 cm" },
  "Фактурная кожа / кожа с зернистой текстурой": {
    ro: "Piele texturată / piele cu granulație",
    en: "Textured leather / grained leather",
  },
  "Мягкая округлая форма": {
    ro: "Formă moale rotunjită",
    en: "Soft rounded shape",
  },
  "Верхняя ручка для носки в руке или на плече": {
    ro: "Mâner superior pentru purtare în mână sau pe umăr",
    en: "Top handle for hand or shoulder carry",
  },
  "Дополнительный съёмный плечевой ремень": {
    ro: "Curea de umăr detașabilă suplimentară",
    en: "Additional detachable shoulder strap",
  },
  "Текстильная подкладка, внутренний карман на молнии": {
    ro: "Căptușeală textilă, buzunar interior cu fermoar",
    en: "Textile lining, inner zip pocket",
  },
  "На каждый день, для работы, прогулок и базового гардероба": {
    ro: "Pentru fiecare zi, birou, plimbări și garderobă de bază",
    en: "For everyday wear, work, walks and a core wardrobe",
  },
  "Дополнительного съёмного ремня нет": { ro: "Fără curea detașabilă suplimentară", en: "No additional detachable strap" },
  "Не предусмотрена": { ro: "Nu este prevăzută", en: "Not included" },
  "Одно большое основное отделение, внутри карман на молнии": {
    ro: "Un compartiment principal mare, cu buzunar interior cu fermoar",
    en: "One large main compartment with an inner zip pocket",
  },
  "Магнитная кнопка + кожаная завязка": { ro: "Capsă magnetică + șnur din piele", en: "Magnetic snap + leather tie" },
  "Металлическая, цвет зависит от партии/модели": {
    ro: "Metalică, culoarea depinde de lot/model",
    en: "Metal, color varies by batch/model",
  },
  "Tote Bag / Shopper Bag": { ro: "Tote Bag / Shopper Bag", en: "Tote Bag / Shopper Bag" },
  "28 × 27 × 14 см": { ro: "28 × 27 × 14 cm", en: "28 × 27 × 14 cm" },
  "Фактурная кожа / натуральная кожа, если указано на бирке": {
    ro: "Piele texturată / piele naturală, dacă este indicat pe etichetă",
    en: "Textured leather / natural leather, if stated on the tag",
  },
  "Тоут / shopper bag с устойчивой формой": {
    ro: "Tote / shopper bag cu formă stabilă",
    en: "Tote / shopper bag with a structured shape",
  },
  "Две плечевые ручки": { ro: "Două mânere de umăr", en: "Two shoulder handles" },
  "Боковые ремешки с металлическими пряжками": {
    ro: "Curele laterale cu cataramă metalică",
    en: "Side straps with metal buckles",
  },
  "Одно основное вместительное отделение": {
    ro: "Un compartiment principal încăpător",
    en: "One spacious main compartment",
  },
  "Карман на молнии внутри сумки": {
    ro: "Buzunar cu fermoar în interiorul genții",
    en: "Zip pocket inside the bag",
  },
  "Магнитная кнопка / внутренняя фиксация сверху": {
    ro: "Capsă magnetică / fixare interioară în partea superioară",
    en: "Magnetic snap / inner top fastening",
  },
  "Металлическая, серебристого цвета": {
    ro: "Metalică, argintie",
    en: "Metal, silver-toned",
  },
  "Красная текстильная подкладка внутри": {
    ro: "Căptușeală textilă roșie în interior",
    en: "Red textile lining inside",
  },
  "Casual, office, everyday, базовый гардероб": {
    ro: "Casual, birou, zi cu zi, garderobă de bază",
    en: "Casual, office, everyday, core wardrobe",
  },
  "Leather Tote / Shoulder Bag": {
    ro: "Leather Tote / Shoulder Bag",
    en: "Leather Tote / Shoulder Bag",
  },
  Регулировка: { ro: "Reglaj", en: "Adjustment" },
  "Внутренний карман": { ro: "Buzunar interior", en: "Inner pocket" },
  Подкладка: { ro: "Căptușeală", en: "Lining" },
  Стиль: { ro: "Stil", en: "Style" },
  "Верхняя ручка + съёмный регулируемый плечевой ремень": {
    ro: "Mâner superior + curea de umăr detașabilă reglabilă",
    en: "Top handle + detachable adjustable shoulder strap",
  },
  "25 × 32 × 12 см": { ro: "25 × 32 × 12 cm", en: "25 × 32 × 12 cm" },
  "Фактурная кожа / натуральная кожа по бирке или поставщику": {
    ro: "Piele texturată / piele naturală conform etichetei sau furnizorului",
    en: "Textured leather / natural leather per tag or supplier",
  },
  "Структурированная трапециевидная форма": {
    ro: "Formă trapezoidală structurată",
    en: "Structured trapezoidal shape",
  },
  "Две короткие ручки + две длинные ручки для плеча": {
    ro: "Două mânere scurte + două mânere lungi pentru umăr",
    en: "Two short handles + two long shoulder handles",
  },
  "Отдельного съёмного ремня нет": {
    ro: "Fără curea detașabilă separată",
    en: "No separate detachable strap",
  },
  "Основное открытое пространство + центральное отделение на молнии": {
    ro: "Spațiu principal deschis + compartiment central cu fermoar",
    en: "Open main space + central zip compartment",
  },
  "Внутренняя косметичка/карман на молнии": {
    ro: "Organizator/buzunar interior cu fermoar",
    en: "Inner zip pouch/cosmetic bag",
  },
  "Центральное отделение закрывается на молнию": {
    ro: "Compartimentul central se închide cu fermoar",
    en: "Central compartment closes with a zipper",
  },
  "Внутри бежевый/карамельный оттенок": {
    ro: "Interior în nuanțe bej/caramel",
    en: "Beige/caramel interior",
  },
  "Casual, city, office, базовый гардероб": {
    ro: "Casual, oraș, birou, garderobă de bază",
    en: "Casual, city, office, core wardrobe",
  },
  "Удобный формат 2-в-1: сумка + внутренний карман/косметичка": {
    ro: "Format practic 2-în-1: geantă + buzunar/organizator interior",
    en: "Handy 2-in-1 format: bag + inner pouch/cosmetic bag",
  },
  "Duo Tote Bag": { ro: "Duo Tote Bag", en: "Duo Tote Bag" },
  Отделения: { ro: "Compartimente", en: "Compartments" },
  Особенность: { ro: "Caracteristică", en: "Feature" },
  Форма: { ro: "Formă", en: "Shape" },
};

const colors: Record<string, Record<Locale, string>> = {
  // Кириллица (палитра C.*)
  "Чёрный": { ru: "Чёрный", ro: "Negru", en: "Black" },
  "Коньячный": { ru: "Коньячный", ro: "Coniac", en: "Cognac" },
  "Коричневый": { ru: "Коричневый", ro: "Maro", en: "Brown" },
  "Бежевый": { ru: "Бежевый", ro: "Bej", en: "Beige" },
  "Песочный": { ru: "Песочный", ro: "Nisipiu", en: "Sand" },
  "Бордовый": { ru: "Бордовый", ro: "Bordo", en: "Burgundy" },
  "Синий": { ru: "Синий", ro: "Albastru", en: "Blue" },
  "Зелёный": { ru: "Зелёный", ro: "Verde", en: "Green" },
  "Серый": { ru: "Серый", ro: "Gri", en: "Grey" },
  "Пудровый": { ru: "Пудровый", ro: "Roz pudrat", en: "Powder pink" },

  // Нейтральные
  Black: { ru: "Чёрный", ro: "Negru", en: "Black" },
  "Black Onyx": { ru: "Чёрный оникс", ro: "Negru onix", en: "Black onyx" },
  "Jet Black": { ru: "Смоляной чёрный", ro: "Negru intens", en: "Jet black" },
  "Black / Red": { ru: "Чёрный с красным", ro: "Negru cu roșu", en: "Black / red" },
  White: { ru: "Белый", ro: "Alb", en: "White" },
  "Off-White": { ru: "Молочный", ro: "Alb cald", en: "Off-white" },
  Ivory: { ru: "Слоновая кость", ro: "Fildeș", en: "Ivory" },
  "Ivory Cream": { ru: "Кремовый", ro: "Crem", en: "Ivory cream" },
  Cream: { ru: "Кремовый", ro: "Crem", en: "Cream" },
  Beige: { ru: "Бежевый", ro: "Bej", en: "Beige" },
  "Natural Beige": { ru: "Натуральный бежевый", ro: "Bej natural", en: "Natural beige" },
  Taupe: { ru: "Тауп", ro: "Taupe", en: "Taupe" },
  "Taupe / Chocolate Brown": { ru: "Тауп с шоколадным", ro: "Taupe cu maro ciocolatiu", en: "Taupe / chocolate brown" },
  Grey: { ru: "Серый", ro: "Gri", en: "Grey" },
  "Light Grey": { ru: "Светло-серый", ro: "Gri deschis", en: "Light grey" },
  "Slate Grey": { ru: "Графитовый", ro: "Gri antracit", en: "Slate grey" },
  "Grey Stripe": { ru: "Серая полоска", ro: "Dungi gri", en: "Grey stripe" },

  // Коричнево-коньячные
  Camel: { ru: "Верблюжий", ro: "Camel", en: "Camel" },
  "Tan Cognac": { ru: "Коньячно-рыжий", ro: "Coniac deschis", en: "Tan cognac" },
  "Natural Tan": { ru: "Натуральный рыжий", ro: "Nisipiu natural", en: "Natural tan" },
  Cognac: { ru: "Коньячный", ro: "Coniac", en: "Cognac" },
  "Cognac Brown": { ru: "Коньячно-коричневый", ro: "Maro coniac", en: "Cognac brown" },
  "Natural / Cognac": { ru: "Натуральный с коньячным", ro: "Natural cu coniac", en: "Natural / cognac" },
  "Natural / Black": { ru: "Натуральный с чёрным", ro: "Natural cu negru", en: "Natural / black" },
  Brown: { ru: "Коричневый", ro: "Maro", en: "Brown" },
  "Chocolate Brown": { ru: "Шоколадный", ro: "Maro ciocolatiu", en: "Chocolate brown" },
  "Dark Brown": { ru: "Тёмно-коричневый", ro: "Maro închis", en: "Dark brown" },
  "Dark Chocolate": { ru: "Тёмный шоколад", ro: "Ciocolată închisă", en: "Dark chocolate" },
  Espresso: { ru: "Эспрессо", ro: "Espresso", en: "Espresso" },
  Mokko: { ru: "Мокко", ro: "Mocca", en: "Mocha" },

  // Красные / бордовые
  Red: { ru: "Красный", ro: "Roșu", en: "Red" },
  "Cherry Red": { ru: "Вишнёвый", ro: "Roșu cireș", en: "Cherry red" },
  "Ruby Red": { ru: "Рубиновый", ro: "Roșu rubiniu", en: "Ruby red" },
  Burgundy: { ru: "Бордовый", ro: "Bordo", en: "Burgundy" },
  "Deep Burgundy": { ru: "Тёмно-бордовый", ro: "Bordo intens", en: "Deep burgundy" },
  "Red-Orange": { ru: "Красно-оранжевый", ro: "Roșu-portocaliu", en: "Red-orange" },
  Orange: { ru: "Оранжевый", ro: "Portocaliu", en: "Orange" },

  // Розовые / фиолетовые
  Pink: { ru: "Розовый", ro: "Roz", en: "Pink" },
  "Dusty Pink": { ru: "Пыльно-розовый", ro: "Roz prăfuit", en: "Dusty pink" },
  Blush: { ru: "Пудрово-розовый", ro: "Roz pudrat", en: "Blush" },
  Mauve: { ru: "Мов", ro: "Mov deschis", en: "Mauve" },
  Magenta: { ru: "Маджента", ro: "Magenta", en: "Magenta" },
  Fuchsia: { ru: "Фуксия", ro: "Fucsia", en: "Fuchsia" },
  "Metallic Fuchsia": { ru: "Металлик фуксия", ro: "Fucsia metalizat", en: "Metallic fuchsia" },
  Plum: { ru: "Сливовый", ro: "Prună", en: "Plum" },
  Lavender: { ru: "Лавандовый", ro: "Lavandă", en: "Lavender" },

  // Жёлтые / зелёные
  Yellow: { ru: "Жёлтый", ro: "Galben", en: "Yellow" },
  "Butter Yellow": { ru: "Масляно-жёлтый", ro: "Galben unt", en: "Butter yellow" },
  Mustard: { ru: "Горчичный", ro: "Muștar", en: "Mustard" },
  "Mustard Yellow": { ru: "Горчично-жёлтый", ro: "Galben muștar", en: "Mustard yellow" },
  "Pale Yellow": { ru: "Бледно-жёлтый", ro: "Galben pal", en: "Pale yellow" },
  Chartreuse: { ru: "Шартрёз", ro: "Șartrez", en: "Chartreuse" },
  "Forest Green": { ru: "Тёмно-зелёный", ro: "Verde pădure", en: "Forest green" },
  "Olive Green": { ru: "Оливковый", ro: "Verde oliv", en: "Olive green" },
  "Sage Green": { ru: "Шалфейный", ro: "Verde salvie", en: "Sage green" },
  Mint: { ru: "Мятный", ro: "Verde mentă", en: "Mint" },
  Pistachio: { ru: "Фисташковый", ro: "Fistic", en: "Pistachio" },
  "Metallic Emerald": { ru: "Изумрудный металлик", ro: "Verde smarald metalizat", en: "Metallic emerald" },

  // Синие / бирюзовые
  "Light Blue": { ru: "Голубой", ro: "Albastru deschis", en: "Light blue" },
  "Baby Blue": { ru: "Нежно-голубой", ro: "Albastru bebeluș", en: "Baby blue" },
  "Sky Blue": { ru: "Небесно-голубой", ro: "Albastru cer", en: "Sky blue" },
  Blue: { ru: "Синий", ro: "Albastru", en: "Blue" },
  "Dusty Blue": { ru: "Пыльно-голубой", ro: "Albastru prăfuit", en: "Dusty blue" },
  "Navy Blue": { ru: "Тёмно-синий", ro: "Bleumarin", en: "Navy blue" },
  "Dark Navy": { ru: "Тёмно-морской", ro: "Bleumarin închis", en: "Dark navy" },
  "Cobalt Blue": { ru: "Кобальтовый", ro: "Albastru cobalt", en: "Cobalt blue" },
  "Metallic Electric Blue": { ru: "Электрик металлик", ro: "Albastru electric metalizat", en: "Metallic electric blue" },
  Turquoise: { ru: "Бирюзовый", ro: "Turcoaz", en: "Turquoise" },
  "Dusty Turquoise": { ru: "Пыльно-бирюзовый", ro: "Turcoaz prăfuit", en: "Dusty turquoise" },
  "Metallic Teal": { ru: "Изумрудный металлик", ro: "Turcoaz metalizat", en: "Metallic teal" },

  // Металлики
  Gold: { ru: "Золотой", ro: "Auriu", en: "Gold" },
  "Royal Gold": { ru: "Королевское золото", ro: "Auriu regal", en: "Royal gold" },
  Silver: { ru: "Серебристый", ro: "Argintiu", en: "Silver" },
  "Silver Metallic": { ru: "Серебристый металлик", ro: "Argintiu metalizat", en: "Silver metallic" },
  "Platinum Silver": { ru: "Платиновый", ro: "Argintiu platinat", en: "Platinum silver" },

  // Принты и многоцветные
  "Abstract Print": { ru: "Абстрактный принт", ro: "Imprimeu abstract", en: "Abstract print" },
  Botanical: { ru: "Ботанический принт", ro: "Imprimeu botanic", en: "Botanical print" },
  "Cherry Print": { ru: "Принт вишня", ro: "Imprimeu cireșe", en: "Cherry print" },
  "Colorful Brushstroke": { ru: "Цветные мазки", ro: "Tușe colorate", en: "Colorful brushstroke" },
  "Blue Multicolor Brushstroke": { ru: "Синие мазки", ro: "Tușe multicolore albastru", en: "Blue multicolor brushstroke" },
  "Green Geometric": { ru: "Зелёная геометрия", ro: "Geometrie verde", en: "Green geometric" },
  "Slate Geometric": { ru: "Графитовая геометрия", ro: "Geometric ardezie", en: "Slate geometric" },
  "Heart Leopard": { ru: "Леопард-сердца", ro: "Leopard inimioare", en: "Heart leopard" },
  Leopard: { ru: "Леопардовый принт", ro: "Imprimeu leopard", en: "Leopard print" },
  "Landscape Hills": { ru: "Пейзаж холмы", ro: "Peisaj cu dealuri", en: "Landscape hills" },
  "Lavender Ink": { ru: "Лавандовые чернила", ro: "Cerneală lavandă", en: "Lavender ink" },
  "Lavender Wave": { ru: "Лавандовая волна", ro: "Val lavandă", en: "Lavender wave" },
  "Aqua Wave": { ru: "Аква-волна", ro: "Val acvatic", en: "Aqua wave" },
  "Mustard Wave": { ru: "Горчичная волна", ro: "Val muștar", en: "Mustard wave" },
  "Mint Abstract": { ru: "Мятная абстракция", ro: "Abstract verde mentă", en: "Mint abstract" },
  "Dusty Blue Abstract": { ru: "Пыльно-голубая абстракция", ro: "Abstract albastru prăfuit", en: "Dusty blue abstract" },
  "Pastel Tie-Dye": { ru: "Пастельный тай-дай", ro: "Tie-dye pastel", en: "Pastel tie-dye" },
  "Rainbow Pastel": { ru: "Радужная пастель", ro: "Pastel curcubeu", en: "Rainbow pastel" },
  "Poppy Print": { ru: "Принт маки", ro: "Imprimeu maci", en: "Poppy print" },
  "Red Floral": { ru: "Красный цветочный", ro: "Floral roșu", en: "Red floral" },
  "Rose Print": { ru: "Принт розы", ro: "Imprimeu trandafiri", en: "Rose print" },
  "Watercolor Circles": { ru: "Акварельные круги", ro: "Cercuri acuarelă", en: "Watercolor circles" },
  "Whale Print": { ru: "Принт киты", ro: "Imprimeu balene", en: "Whale print" },
};

/**
 * Product titles follow the "Имя — тип/форма сумки" format (e.g. "Amelie — компактная сумка-багет").
 * The invented name stays the same across locales; only the descriptive part is translated.
 */
const productTitles: Record<string, Partial<Record<Locale, string>>> = {
  "Mirelle — сумка на плечо из замши": { ro: "Mirelle — geantă de umăr din piele întoarsă", en: "Mirelle — suede shoulder bag" },
  "Adriana — сумка на плечо из гладкой кожи": { ro: "Adriana — geantă de umăr din piele netedă", en: "Adriana — smooth leather shoulder bag" },
  "Fiorella — плетёная сумка-тоут": { ro: "Fiorella — geantă tote împletită", en: "Fiorella — woven tote bag" },
  "Ondine — плетёная сумка-шоппер": { ro: "Ondine — shopper împletit", en: "Ondine — woven shopper bag" },
  "Marbella — сумка-шоппер из замши": { ro: "Marbella — shopper din piele întoarsă", en: "Marbella — suede shopper bag" },
  "Positano — летняя сумка-тоут с плетением": { ro: "Positano — geantă tote de vară cu împletitură", en: "Positano — summer tote bag with woven detail" },
  "Capri — плетёная пляжная сумка-тоут": { ro: "Capri — geantă tote de plajă împletită", en: "Capri — woven beach tote bag" },
  "Ortigia — тоут с каркасным силуэтом": { ro: "Ortigia — geantă tote cu siluetă tip cage", en: "Ortigia — cage-frame tote bag" },
  "Perla — мини-сумка с верхней ручкой": { ro: "Perla — mini geantă cu mâner superior", en: "Perla — mini top-handle bag" },
  "Talia — классическая сумка на плечо": { ro: "Talia — geantă de umăr clasică", en: "Talia — classic shoulder bag" },
  "Vittoria — классическая сумка-тоут": { ro: "Vittoria — geantă tote clasică", en: "Vittoria — classic tote bag" },
  "Romina — сумка-боулинг": { ro: "Romina — geantă bowling", en: "Romina — bowling bag" },
  "Amara — сумка-хобо": { ro: "Amara — geantă hobo", en: "Amara — hobo bag" },
  "Liora — сумка-хобо": { ro: "Liora — geantă hobo", en: "Liora — hobo bag" },
  "Serena — сумка-хобо из гладкой кожи": { ro: "Serena — geantă hobo din piele netedă", en: "Serena — smooth leather hobo bag" },
  "Camelia — компактная сумка с верхней ручкой": { ro: "Camelia — geantă compactă cu mâner superior", en: "Camelia — compact top-handle bag" },
  "Selene — сумка-полумесяц на плечо": { ro: "Selene — geantă semilună de umăr", en: "Selene — crescent shoulder bag" },
  "Faustine — дорожная сумка-тоут": { ro: "Faustine — geantă tote de călătorie", en: "Faustine — travel tote bag" },
  "Marisol — плетёная сумка-хобо": { ro: "Marisol — geantă hobo împletită", en: "Marisol — woven hobo bag" },
  "Provence — плетёная сумка-тоут в винтажном стиле": { ro: "Provence — geantă tote împletită în stil vintage", en: "Provence — vintage-style woven tote bag" },
  "Taormina — плетёная сумка веерообразной формы": { ro: "Taormina — geantă împletită în formă de evantai", en: "Taormina — fan-shaped woven bag" },
  "Cuore — плетёная сумка с ручками в форме сердца": { ro: "Cuore — geantă împletită cu mânere în formă de inimă", en: "Cuore — woven bag with heart-shaped handles" },
  "Ravello — плетёная сумка-мешок": { ro: "Ravello — geantă sac împletită", en: "Ravello — woven bucket bag" },
  "Elodie — сумка через плечо": { ro: "Elodie — geantă crossbody", en: "Elodie — crossbody bag" },
  "Corinne — фактурная сумка через плечо": { ro: "Corinne — geantă crossbody texturată", en: "Corinne — textured crossbody bag" },
  "Luna — сумка-полумесяц": { ro: "Luna — geantă semilună", en: "Luna — crescent bag" },
  "Valentina — архитектурная сумка-тоут": { ro: "Valentina — geantă tote arhitecturală", en: "Valentina — architectural tote bag" },
  "Coralie — сумка-мешок с драпировкой": { ro: "Coralie — geantă sac cu drapaj", en: "Coralie — draped pouch bag" },
  "Beatrice — структурированная сумка-тоут": { ro: "Beatrice — geantă tote structurată", en: "Beatrice — structured tote bag" },
  "Milena — плетёная сумка-хобо": { ro: "Milena — geantă hobo împletită", en: "Milena — woven hobo bag" },
  "Adele — базовая сумка на плечо": { ro: "Adele — geantă de umăr esențială", en: "Adele — essential shoulder bag" },
  "Genevieve — сумка-тоут из телячьей кожи": { ro: "Genevieve — geantă tote din piele de vițel", en: "Genevieve — calf leather tote bag" },
  "Capucine — сумка-пауч": { ro: "Capucine — geantă pouch", en: "Capucine — pouch bag" },
  "Violaine — кожаная сумка-тоут": { ro: "Violaine — geantă tote din piele", en: "Violaine — leather tote bag" },
  "Claudine — классическая кожаная сумка-тоут": { ro: "Claudine — geantă tote clasică din piele", en: "Claudine — classic leather tote bag" },
  "Fabienne — винтажная соломенная сумка-тоут": { ro: "Fabienne — geantă tote vintage din paie", en: "Fabienne — vintage straw tote bag" },
  "Nerina — мягкая сумка-мешок": { ro: "Nerina — geantă sac moale", en: "Nerina — soft pouch bag" },
  "Solenne — сумка-багет": { ro: "Solenne — geantă baghetă", en: "Solenne — baguette bag" },
  "Ottavia — структурная сумка с пряжкой": { ro: "Ottavia — geantă structurată cu cataramă", en: "Ottavia — structured bag with buckle" },
  "Anouk — мини-сумка через плечо на цепочке": { ro: "Anouk — mini geantă crossbody cu lănțișor", en: "Anouk — mini chain crossbody bag" },
  "Sabina — большой шопер": { ro: "Sabina — shopper mare", en: "Sabina — large shopper bag" },
  "Iris — женский рюкзак": { ro: "Iris — rucsac damă", en: "Iris — women's backpack" },
  "Cosima — деловой портфель": { ro: "Cosima — servietă de birou", en: "Cosima — business briefcase" },
  "Delphine — сумка через плечо с карманами": { ro: "Delphine — geantă crossbody cu buzunare", en: "Delphine — crossbody bag with pockets" },
  "Estelle — клатч на цепочке": { ro: "Estelle — clutch cu lănțișor", en: "Estelle — chain clutch" },
  "Renata — дорожная сумка": { ro: "Renata — geantă de călătorie", en: "Renata — travel bag" },
  "Flora — поясная сумка": { ro: "Flora — geantă de talie", en: "Flora — belt bag" },
  "Verona — сумка-мешок на затяжке": { ro: "Verona — geantă sac cu șnur", en: "Verona — drawstring pouch bag" },
  "Alba — большая сумка-шоппер": { ro: "Alba — shopper mare", en: "Alba — large shopper bag" },
  "Tosca — компактная сумка через плечо": { ro: "Tosca — geantă crossbody compactă", en: "Tosca — compact crossbody bag" },
  "Bianca — сумка-хобо на плечо": { ro: "Bianca — geantă hobo de umăr", en: "Bianca — hobo shoulder bag" },
  "Camille — сумка-хобо на молнии": { ro: "Camille — geantă hobo cu fermoar", en: "Camille — zip hobo bag" },
  "Marcella — фактурная сумка-тоут": { ro: "Marcella — geantă tote texturată", en: "Marcella — textured tote bag" },
  "Isadora — сумка-сэтчел": { ro: "Isadora — geantă satchel", en: "Isadora — satchel bag" },
  "Chiara — структурированная сумка": { ro: "Chiara — geantă structurată", en: "Chiara — structured bag" },
  "Alessia — сумка-шоппер": { ro: "Alessia — geantă shopper", en: "Alessia — shopper bag" },
  "Martina — сумка-тоут на плечо": { ro: "Martina — geantă tote de umăr", en: "Martina — shoulder tote bag" },
  "Simona — мягкая сумка-хобо": { ro: "Simona — geantă hobo moale", en: "Simona — soft hobo bag" },
  "Elise — мини-сумка-тоут 2-в-1": { ro: "Elise — mini geantă tote 2-în-1", en: "Elise — mini 2-in-1 tote bag" },
  "Noemi — структурированная сумка-шоппер": { ro: "Noemi — shopper structurat", en: "Noemi — structured shopper bag" },
  "Ilaria — сумка-багет": { ro: "Ilaria — geantă baghetă", en: "Ilaria — baguette bag" },
  "Silvana — сумка с драпировкой и клапаном": { ro: "Silvana — geantă cu drapaj și clapetă", en: "Silvana — draped flap bag" },
  "Antonella — прямоугольная сумка": { ro: "Antonella — geantă rectangulară", en: "Antonella — rectangular bag" },
  "Graziella — сумка-тоут на утяжках": { ro: "Graziella — geantă tote cu șnururi laterale", en: "Graziella — drawstring tote bag" },
  "Marguerite — сумка-полумесяц с клапаном": { ro: "Marguerite — geantă semilună cu clapetă", en: "Marguerite — crescent flap bag" },
  "Emmeline — структурированная сумка с замком": { ro: "Emmeline — geantă structurată cu încuietoare", en: "Emmeline — structured bag with turn-lock" },
  "Josephine — сумка на плечо с пряжкой": { ro: "Josephine — geantă de umăr cu cataramă", en: "Josephine — shoulder bag with buckle" },
  "Seraphine — сумка-тоут с косметичкой": { ro: "Seraphine — geantă tote cu trusă cosmetică", en: "Seraphine — tote bag with pouch" },
  "Cortina — плетёная сумка на молнии": { ro: "Cortina — geantă împletită cu fermoar", en: "Cortina — woven zip bag" },
  "Volterra — компактная плетёная сумка": { ro: "Volterra — geantă împletită compactă", en: "Volterra — compact woven bag" },
  "Ischia — плетёная сумка с замком-защёлкой": { ro: "Ischia — geantă împletită cu clichet", en: "Ischia — woven turn-lock bag" },
  "Procida — плетёная сумка-ведро на шнурке": { ro: "Procida — geantă bucket împletită cu șnur", en: "Procida — woven drawstring bucket bag" },
  "Sperlonga — круглая плетёная сумка-ведро": { ro: "Sperlonga — geantă bucket rotundă împletită", en: "Sperlonga — round woven bucket bag" },
  "Violette — плетёная сумка-хобо": { ro: "Violette — geantă hobo împletită", en: "Violette — woven hobo bag" },
  "Avignon — плетёная сумка с чехлом": { ro: "Avignon — geantă împletită cu husă", en: "Avignon — woven bag with pouch" },
  "Honfleur — плетёная сумка-хобо с кожаными звеньями": { ro: "Honfleur — geantă hobo împletită cu inele din piele", en: "Honfleur — woven hobo bag with leather links" },
  "Deauville — компактная сумка с металлизированной отделкой": { ro: "Deauville — geantă compactă cu finisaj metalizat", en: "Deauville — compact bag with metallic trim" },
  "Annecy — плетёная сумка с фактурной кожей": { ro: "Annecy — geantă împletită cu piele texturată", en: "Annecy — woven bag with textured leather" },
  "Giverny — структурированная сумка с контрастной окантовкой": { ro: "Giverny — geantă structurată cu contur contrastant", en: "Giverny — structured bag with contrast trim" },
  "Biarritz — трапециевидная сумка с контрастной окантовкой": { ro: "Biarritz — geantă trapezoidală cu contur contrastant", en: "Biarritz — trapeze bag with contrast trim" },
  "Trieste — сумка-хобо полумесяцем": { ro: "Trieste — geantă hobo semilună", en: "Trieste — crescent hobo bag" },
  "Sienna — сумка-хобо полумесяцем из гладкой кожи": { ro: "Sienna — geantă hobo semilună din piele netedă", en: "Sienna — smooth leather crescent hobo bag" },
  "Colette — сумка на плечо с клапаном на замке": { ro: "Colette — geantă de umăr cu clapetă și încuietoare", en: "Colette — turn-lock flap shoulder bag" },
  "Lucerne — сумка-тоут с косметичкой и замком": { ro: "Lucerne — geantă tote cu trusă și încuietoare", en: "Lucerne — tote bag with pouch and turn-lock" },
  "Amelie — компактная сумка-багет": { ro: "Amelie — geantă baghetă compactă", en: "Amelie — compact baguette bag" },
  "Claire — компактная сумка-багет": { ro: "Claire — geantă baghetă compactă", en: "Claire — compact baguette bag" },
  "Paloma — сумка с фермуаром": { ro: "Paloma — geantă cu fermuar", en: "Paloma — kiss-lock bag" },
  "Leonie — вязаная сумка-тоут": { ro: "Leonie — geantă tote tricotată", en: "Leonie — knitted tote bag" },
  "Giuliana — плетёная сумка-тоут": { ro: "Giuliana — geantă tote împletită", en: "Giuliana — woven tote bag" },
  "Giada — плетёная сумка-тоут": { ro: "Giada — geantă tote împletită", en: "Giada — woven tote bag" },
  "Filippa — плетёная сумка-тоут": { ro: "Filippa — geantă tote împletită", en: "Filippa — woven tote bag" },
  "Luciana — плетёная сумка через плечо": { ro: "Luciana — geantă crossbody împletită", en: "Luciana — woven crossbody bag" },
  "Ines — плетёная сумка-хобо": { ro: "Ines — geantă hobo împletită", en: "Ines — woven hobo bag" },
  "Paola — плетёная сумка с клапаном": { ro: "Paola — geantă împletită cu clapă", en: "Paola — woven flap bag" },
  "Greta — сумка-тоут с замком": { ro: "Greta — geantă tote cu încuietoare", en: "Greta — turn-lock tote bag" },
  "Georgina — тоут с расклешёнными боками и замком": { ro: "Georgina — tote cu aripi și încuietoare", en: "Georgina — winged turn-lock tote" },
  "Francesca — кошелёк на молнии": { ro: "Francesca — portofel cu fermoar", en: "Francesca — zip-around wallet" },
  "Federica — кошелёк на клапане": { ro: "Federica — portofel cu clapă", en: "Federica — flap wallet" },
  "Fabiana — плетёный кошелёк на клапане": { ro: "Fabiana — portofel împletit cu clapă", en: "Fabiana — woven flap wallet" },
  "Giulietta — кошелёк-гармошка на молнии": { ro: "Giulietta — portofel acordeon cu fermoar", en: "Giulietta — accordion zip wallet" },
  "Seraphina — плетёный кошелёк на молнии": { ro: "Seraphina — portofel împletit cu fermoar", en: "Seraphina — woven zip-around wallet" },
  "Flavia — плетёный кошелёк на молнии с кнопкой": { ro: "Flavia — portofel împletit cu fermoar și capsă", en: "Flavia — woven zip snap wallet" },
  "Nerissa — сумка на короткой ручке": { ro: "Nerissa — geantă cu mâner scurt", en: "Nerissa — top handle bag" },
  "Fabrizia — мини-тоут": { ro: "Fabrizia — mini tote", en: "Fabrizia — mini tote bag" },
  "Lucrezia — сумка хобо на плечо": { ro: "Lucrezia — geantă hobo de umăr", en: "Lucrezia — hobo shoulder bag" },
  "Ginevra — тоут из вязаного полотна": { ro: "Ginevra — geantă tote tricotată", en: "Ginevra — knitted tote bag" },
  "Allegra — сумка-тоут на плечо": { ro: "Allegra — geantă tote de umăr", en: "Allegra — tote shoulder bag" },
  "Luna — мягкая сумка хобо": { ro: "Luna — geantă hobo moale", en: "Luna — soft hobo bag" },
  "Bettina — сумка на плечо с пряжкой": { ro: "Bettina — geantă de umăr cu cataramă", en: "Bettina — buckle shoulder bag" },
  "Perrine — багет на плечо": { ro: "Perrine — geantă baghetă de umăr", en: "Perrine — shoulder baguette bag" },
  "Anaelle — компактный багет": { ro: "Anaelle — geantă baghetă compactă", en: "Anaelle — compact baguette bag" },
  "Marcelle — компактная сумка-конверт на цепочке": { ro: "Marcelle — geantă plic compactă cu lanț", en: "Marcelle — compact envelope chain bag" },
  "Ninette — структурная сумка с контрастной окантовкой": { ro: "Ninette — geantă structurată cu bordură contrastantă", en: "Ninette — structured bag with contrast trim" },
  "Thea — структурная сумка с поворотным замком": { ro: "Thea — geantă structurată cu încuietoare rotativă", en: "Thea — structured turn-lock bag" },
  "Colline — сумка хобо полумесяцем": { ro: "Colline — geantă hobo semilună", en: "Colline — crescent hobo bag" },
  "Elara — кожаная сумка полумесяцем": { ro: "Elara — geantă semilună din piele", en: "Elara — leather crescent bag" },
  "Maelle — тоут на завязках": { ro: "Maelle — geantă tote cu șnur", en: "Maelle — drawstring tote bag" },
  "Livia — сумка полумесяц на плечо": { ro: "Livia — geantă semilună de umăr", en: "Livia — half-moon shoulder bag" },
  "Cassia — клатч с рамочным замком": { ro: "Cassia — clutch cu încuietoare tip cadru", en: "Cassia — kiss-lock clutch" },
  "Fiamma — клатч с металлической рамкой": { ro: "Fiamma — clutch cu cadru metalic", en: "Fiamma — metal-frame clutch" },
  "Gioia — сумка на плечо с боковыми завязками": { ro: "Gioia — geantă de umăr cu șnururi laterale", en: "Gioia — side-drawstring shoulder bag" },
  "Giorgia — боулинг-сумка двухцветная": { ro: "Giorgia — geantă bowling bicoloră", en: "Giorgia — two-tone bowling bag" },
  "Aurea — прямоугольная сумка в руке": { ro: "Aurea — geantă dreptunghiulară de mână", en: "Aurea — rectangular handbag" },
  "Halle — сумка-сэтчел": { ro: "Halle — geantă satchel", en: "Halle — satchel bag" },
  "Romilly — структурная сумка в руке": { ro: "Romilly — geantă structurată de mână", en: "Romilly — structured handbag" },
  "Vespera — структурный шоппер-тоут": { ro: "Vespera — geantă shopper structurată", en: "Vespera — structured shopper tote" },
  "Marielle — тоут с косметичкой": { ro: "Marielle — geantă tote cu trusă cosmetică", en: "Marielle — tote bag with pouch" },
  "Fiorenza — сумка-тоут": { ro: "Fiorenza — geantă tote", en: "Fiorenza — tote bag" },
  "Loretta — тоут с клапаном на замке": { ro: "Loretta — geantă tote cu clapă și încuietoare", en: "Loretta — turn-lock flap tote bag" },
  "Cressida — тоут с планкой на замке": { ro: "Cressida — geantă tote cu clapetă și încuietoare", en: "Cressida — turn-lock placket tote bag" },
  "Palmira — сумка с поворотным замком": { ro: "Palmira — geantă cu încuietoare rotativă", en: "Palmira — turn-lock top handle bag" },
  "Rosalba — сумка в форме сердца": { ro: "Rosalba — geantă în formă de inimă", en: "Rosalba — heart-shaped handbag" },
  "Margot — сумка с поворотным замком": { ro: "Margot — geantă cu încuietoare rotativă", en: "Margot — turn-lock top handle bag" },
  "Amabel — сумка хобо на молнии": { ro: "Amabel — geantă hobo cu fermoar", en: "Amabel — zip hobo bag" },
  "Ottilie — гладкий компактный багет": { ro: "Ottilie — geantă baghetă compactă netedă", en: "Ottilie — smooth compact baguette bag" },
  "Perlette — сумка на плечо с клапаном": { ro: "Perlette — geantă de umăr cu clapă", en: "Perlette — flap shoulder bag" },
  "Rosalind — гладкая хобо полумесяцем": { ro: "Rosalind — geantă hobo semilună netedă", en: "Rosalind — smooth crescent hobo bag" },
  "Odile — хобо полумесяц с цепочкой": { ro: "Odile — geantă hobo semilună cu lanț", en: "Odile — chain-strap crescent hobo bag" },
  "Solaine — сумка с драпированным клапаном": { ro: "Solaine — geantă cu clapă drapată", en: "Solaine — draped flap bag" },
  "Adalina — сумка-шоппер": { ro: "Adalina — geantă shopper", en: "Adalina — shopper bag" },
  "Elowen — сумка-мешок с плетёным основанием": { ro: "Elowen — geantă sac cu bază împletită", en: "Elowen — drawstring bucket bag" },
  "Fantine — хобо с плетёным основанием": { ro: "Fantine — geantă hobo cu bază împletită", en: "Fantine — woven-base hobo bag" },
  "Garance — структурная сумка с плетёным основанием": { ro: "Garance — geantă structurată cu bază împletită", en: "Garance — structured bag with woven base" },
  "Herminie — круглая сумка-мешок": { ro: "Herminie — geantă sac rotundă", en: "Herminie — round bucket bag" },
  "Isolde — сумка с плетёным основанием и замком": { ro: "Isolde — geantă cu bază împletită și încuietoare", en: "Isolde — woven-base turn-lock bag" },
  "Jacinta — компактная структурная сумка на молнии": { ro: "Jacinta — geantă structurată compactă cu fermoar", en: "Jacinta — compact structured zip bag" },
  "Kalina — структурная сумка на молнии": { ro: "Kalina — geantă structurată cu fermoar", en: "Kalina — structured zip bag" },
  "Lisette — тоут с пряжкой на ручке": { ro: "Lisette — geantă tote cu cataramă pe mâner", en: "Lisette — buckle handle tote bag" },
  "Manon — плетёная хобо полумесяцем": { ro: "Manon — geantă hobo semilună împletită", en: "Manon — woven crescent hobo bag" },
  "Noriane — плетёная сумка с клапаном": { ro: "Noriane — geantă împletită cu clapă", en: "Noriane — woven flap top handle bag" },
  "Oriane — тоут с овальными ручками": { ro: "Oriane — geantă tote cu mânere ovale", en: "Oriane — oval handle tote bag" },
  "Celia — тоут с овальными ручками": { ro: "Celia — geantă tote cu mânere ovale", en: "Celia — oval handle tote bag" },
  "Pernelle — структурная сумка с декоративной вставкой": { ro: "Pernelle — geantă structurată cu detaliu decorativ", en: "Pernelle — structured bag with crystal accent" },
  "Aveline — сумка с плетёной панелью": { ro: "Aveline — geantă cu panou împletit", en: "Aveline — woven panel top handle bag" },
  "Cendrine — тоут со спиральным плетением": { ro: "Cendrine — geantă tote cu împletitură spirală", en: "Cendrine — spiral-weave tote bag" },
  "Dorine — плетёная сумка треугольной формы": { ro: "Dorine — geantă triunghiulară împletită", en: "Dorine — triangular woven bag" },
  "Gwenaelle — плетёная сумка кроссбоди": { ro: "Gwenaelle — geantă crossbody împletită", en: "Gwenaelle — woven crossbody bag" },
  "Helena — плетёная сумка на плечо": { ro: "Helena — geantă de umăr împletită", en: "Helena — woven shoulder bag" },
  "Celeste — плетёная сумка-тоут": { ro: "Celeste — geantă tote împletită", en: "Celeste — woven tote bag" },
  "Vivienne — сумка-тоут": { ro: "Vivienne — geantă tote", en: "Vivienne — tote bag" },
  "Nadine — кошелёк на молнии": { ro: "Nadine — portofel cu fermoar", en: "Nadine — zip wallet" },
  "Suzette — картхолдер": { ro: "Suzette — portcard", en: "Suzette — card holder" },
  "Rosalia — картхолдер": { ro: "Rosalia — portcard", en: "Rosalia — card holder" },
  "Azzurina — картхолдер": { ro: "Azzurina — portcard", en: "Azzurina — card holder" },
  "Turchese — картхолдер": { ro: "Turchese — portcard", en: "Turchese — card holder" },
  "Bianca — картхолдер": { ro: "Bianca — portcard", en: "Bianca — card holder" },
  "Limona — картхолдер": { ro: "Limona — portcard", en: "Limona — card holder" },
  "Smeralda — картхолдер": { ro: "Smeralda — portcard", en: "Smeralda — card holder" },
  "Bruna — картхолдер": { ro: "Bruna — portcard", en: "Bruna — card holder" },
  "Olivetta — картхолдер": { ro: "Olivetta — portcard", en: "Olivetta — card holder" },
  "Salvia — кошелёк": { ro: "Salvia — portofel", en: "Salvia — wallet" },
  "Cenere — картхолдер": { ro: "Cenere — portcard", en: "Cenere — card holder" },
  "Rubina — картхолдер": { ro: "Rubina — portcard", en: "Rubina — card holder" },
  "Avorio — картхолдер": { ro: "Avorio — portcard", en: "Avorio — card holder" },
  "Notte — картхолдер": { ro: "Notte — portcard", en: "Notte — card holder" },
  "Cremisi — кошелёк": { ro: "Cremisi — portofel", en: "Cremisi — wallet" },
  "Perla — кошелёк": { ro: "Perla — portofel", en: "Perla — wallet" },
  "Nera — картхолдер": { ro: "Nera — portcard", en: "Nera — card holder" },
  "Brielle — ключница": { ro: "Brielle — port-chei", en: "Brielle — key holder" },
  "Camea — косметичка": { ro: "Camea — trusă cosmetică", en: "Camea — cosmetic pouch" },
  "Noelle — обложка для паспорта": { ro: "Noelle — copertă pentru pașaport", en: "Noelle — passport cover" },
  "Amalia — ремень": { ro: "Amalia — curea", en: "Amalia — belt" },
  "Zelie — подвеска для сумки": { ro: "Zelie — breloc pentru geantă", en: "Zelie — bag charm" },
  "Bat — брелок для сумки La Via Firenze": { ro: "Bat — breloc La Via Firenze", en: "Bat — La Via Firenze bag charm" },
  "Flower — брелок для сумки La Via Firenze": { ro: "Flower — breloc La Via Firenze", en: "Flower — La Via Firenze bag charm" },
  "Cat — брелок для сумки La Via Firenze": { ro: "Cat — breloc La Via Firenze", en: "Cat — La Via Firenze bag charm" },
  "Bear — брелок для сумки La Via Firenze": { ro: "Bear — breloc La Via Firenze", en: "Bear — La Via Firenze bag charm" },
  "Pegaso — кожаный брелок для сумки": { ro: "Pegaso — breloc din piele", en: "Pegaso — leather bag charm" },
  "Bassotto — кожаный брелок для сумки": { ro: "Bassotto — breloc din piele", en: "Bassotto — leather bag charm" },
  "Fiocco — шёлковый брелок-бант": { ro: "Fiocco — breloc fundă din mătase", en: "Fiocco — silk bow bag charm" },
  "Mix — брелок-набор для сумки": { ro: "Mix — set breloc pentru geantă", en: "Mix — bag charm set" },
  "Serenella — шёлковый платок": { ro: "Serenella — eșarfă din mătase", en: "Serenella — silk scarf" },
  "Marcelline — шёлковый платок": { ro: "Marcelline — eșarfă din mătase", en: "Marcelline — silk scarf" },
  "Celestina — шёлковый платок": { ro: "Celestina — eșarfă din mătase", en: "Celestina — silk scarf" },
  "Marina — шёлковый платок": { ro: "Marina — eșarfă din mătase", en: "Marina — silk scarf" },
  "Costanza — шёлковый платок": { ro: "Costanza — eșarfă din mătase", en: "Costanza — silk scarf" },
  "Doriana — шёлковый платок": { ro: "Doriana — eșarfă din mătase", en: "Doriana — silk scarf" },
  "Iride — шёлковый платок": { ro: "Iride — eșarfă din mătase", en: "Iride — silk scarf" },
  "Amorette — шёлковый платок": { ro: "Amorette — eșarfă din mătase", en: "Amorette — silk scarf" },
  "Colomba — шёлковый платок": { ro: "Colomba — eșarfă din mătase", en: "Colomba — silk scarf" },
  "Nebbia — шёлковый платок": { ro: "Nebbia — eșarfă din mătase", en: "Nebbia — silk scarf" },
  "Clarissa — шёлковый платок": { ro: "Clarissa — eșarfă din mătase", en: "Clarissa — silk scarf" },
  "Azzurra — шёлковый платок": { ro: "Azzurra — eșarfă din mătase", en: "Azzurra — silk scarf" },
  "Lavinia — шёлковый платок": { ro: "Lavinia — eșarfă din mătase", en: "Lavinia — silk scarf" },
  "Artemisia — шёлковый платок": { ro: "Artemisia — eșarfă din mătase", en: "Artemisia — silk scarf" },
  "Rosetta — шёлковый платок": { ro: "Rosetta — eșarfă din mătase", en: "Rosetta — silk scarf" },
  "Verdiana — шёлковый платок": { ro: "Verdiana — eșarfă din mătase", en: "Verdiana — silk scarf" },
  "Fiorina — шёлковый платок": { ro: "Fiorina — eșarfă din mătase", en: "Fiorina — silk scarf" },
  "Cerelia — шёлковый платок": { ro: "Cerelia — eșarfă din mătase", en: "Cerelia — silk scarf" },
  "Teodora — шёлковый платок": { ro: "Teodora — eșarfă din mătase", en: "Teodora — silk scarf" },
  "Delphina — шёлковый платок": { ro: "Delphina — eșarfă din mătase", en: "Delphina — silk scarf" },
  "Aimee — подарочный набор: кошелёк и картхолдер": { ro: "Aimee — set cadou: portofel și portcard", en: "Aimee — gift set: wallet and card holder" },
  "Rosalie — кошелёк на кнопке": { ro: "Rosalie — portofel cu capsă", en: "Rosalie — snap wallet" },
};

type ProductLocalizedCopy = {
  title?: Partial<Record<Locale, string>>;
  description?: Partial<Record<Locale, string>>;
  highlights?: Partial<Record<Locale, string[]>>;
};

const productCopyBySlug: Record<string, ProductLocalizedCopy> = {
  "premium-leather-kelly-shoulder-bag-black": {
    "title": {
      "ru": "Кожаная сумка Kelly на плечо",
      "ro": "Geantă de umăr din piele, stil Kelly",
      "en": "Premium Leather Kelly Shoulder Bag"
    },
    "description": {
      "ru": "Кожаная сумка Kelly на плечо. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă de umăr din piele, stil Kelly este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Premium Leather Kelly Shoulder Bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "woven-leather-shopper-tote-black": {
    "title": {
      "ru": "Ondine — плетёная сумка-шоппер",
      "ro": "Ondine — shopper împletit",
      "en": "Ondine — woven shopper bag"
    },
    "description": {
      "ru": "Ondine — плетёная сумка-шоппер. Модель выполнена из плетёной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Мягкий силуэт и выразительная фактура легко вписываются в повседневный гардероб.\n\nЗакрытие на кожаном шнурке. Внутреннее пространство рассчитано на телефон, кошелёк, ключи и косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Ondine — shopper împletit din piele, creat pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta moale și textura împletită se integrează ușor în garderoba de zi cu zi.\n\nÎnchidere cu șnur din piele. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Ondine — woven leather shopper bag designed for work, city errands and days when you need to carry more. The soft silhouette and woven texture integrate easily into an everyday wardrobe.\n\nLeather drawstring closure. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-woven-beach-tote-bag-natural-black": {
    "title": {
      "ru": "Capri — плетёная пляжная сумка-тоут",
      "ro": "Capri — geantă tote de plajă împletită",
      "en": "Capri — woven beach tote bag"
    },
    "description": {
      "ru": "Capri — плетёная пляжная сумка-тоут с кожаными ручками, золотой фурнитурой и полукруглым силуэтом — для курорта, города и путешествий.\n\nПросторное отделение с внутренним карманом на молнии вмещает телефон, кошелёк, косметику и документы. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Capri — geantă tote de plajă împletită, cu mânere din piele, accesorii aurii și siluetă semicirculară — pentru stațiune, oraș și călătorii.\n\nCompartimentul încăpător, cu buzunar interior cu fermoar, încăpe telefon, portofel, cosmetice și documente. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Capri — woven beach tote with leather handles, gold hardware and a semi-circular silhouette — for holidays, city days and travel.\n\nThe roomy interior with a zip pocket fits a phone, wallet, cosmetics and documents. Available to order, delivery in 7–14 days."
    }
  },
  "milano-cage-tote-bag-black-red": {
    "title": {
      "ru": "Ortigia — тоут с каркасным силуэтом",
      "ro": "Ortigia — geantă tote cu siluetă tip cage",
      "en": "Ortigia — cage-frame tote bag"
    },
    "description": {
      "ru": "Ortigia — тоут с каркасным силуэтом. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Ortigia — geantă tote cu siluetă tip cage este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Ortigia — cage-frame tote bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "mini-elegance-top-handle-bag-white": {
    "title": {
      "ru": "Micaela — мини-сумка с верхней ручкой",
      "ro": "Micaela — geantă mini cu mâner superior",
      "en": "Micaela — mini top handle bag"
    },
    "description": {
      "ru": "Мини-сумка с верхней ручкой. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă mini cu mâner superior este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Mini Elegance Top Handle Bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "classic-leather-tote-bag-black": {
    "title": {
      "ru": "Claudine — классическая кожаная сумка-тоут",
      "ro": "Claudine — geantă tote clasică din piele",
      "en": "Claudine — classic leather tote bag"
    },
    "description": {
      "ru": "Claudine — классическая кожаная сумка-тоут с поворотным замком, двойными ручками и строгим силуэтом — для работы, деловых встреч и повседневной носки.\n\nПросторное отделение вмещает документы, планшет, кошелёк и повседневные мелочи. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Claudine — geantă tote clasică din piele, cu încuietoare rotativă, mânere duble și siluetă strictă — pentru birou, întâlniri de afaceri și purtare zilnică.\n\nCompartimentul încăpător încăpe documente, tabletă, portofel și accesorii zilnice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Claudine — classic leather tote with a turn-lock closure, double handles and a structured silhouette — for work, business meetings and everyday wear.\n\nThe roomy interior fits documents, a tablet, a wallet and everyday essentials. Available to order, delivery in 7–14 days."
    }
  },
  "classic-leather-bowling-bag-black": {
    "title": {
      "ru": "Romina — сумка-боулинг",
      "ro": "Romina — geantă bowling",
      "en": "Romina — bowling bag"
    },
    "description": {
      "ru": "Romina — сумка-боулинг. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Romina — geantă bowling este o geantă bowling din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Romina — bowling bag is a bowling bag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-pink": {
    "title": {
      "ru": "Amara — сумка-хобо",
      "ro": "Amara — geantă hobo",
      "en": "Amara — hobo bag"
    },
    "description": {
      "ru": "Amara — сумка-хобо. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Amara — geantă hobo este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Amara — hobo bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-taupe": {
    "title": {
      "ru": "Liora — сумка-хобо",
      "ro": "Liora — geantă hobo",
      "en": "Liora — hobo bag"
    },
    "description": {
      "ru": "Liora — сумка-хобо. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Мягкий силуэт и золотая фурнитура выглядят собранно, но не перегружают образ.\n\nМагнитная застёжка с декоративным замком. Внутреннее пространство рассчитано на телефон, кошелёк, ключи и косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Liora — geantă hobo din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta moale și finisajele aurii rămân elegante fără exces.\n\nÎnchidere magnetică cu detaliu decorativ tip încuietoare. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Liora — hobo bag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The soft silhouette and gold hardware feel polished without looking heavy.\n\nMagnetic closure with a decorative lock detail. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-smooth-black": {
    "title": {
      "ru": "Serena — сумка-хобо из гладкой кожи",
      "ro": "Serena — geantă hobo din piele netedă",
      "en": "Serena — smooth leather hobo bag"
    },
    "description": {
      "ru": "Serena — сумка-хобо из гладкой кожи. Модель создана для повседневного гардероба, офиса и спокойных вечерних выходов. Плавные линии и лаконичный силуэт легко вписываются в базовый гардероб.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на телефон, кошелёк, ключи и косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Serena — geantă hobo din piele netedă, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Liniile fluide și silueta simplă se integrează ușor în ținutele de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Serena — smooth leather hobo bag designed for everyday styling, office looks and relaxed evening plans. Clean lines and a soft shape integrate easily into a considered wardrobe.\n\nSecure zip closure. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "structured-leather-top-handle-bag-black": {
    "title": {
      "ru": "Структурная кожаная сумка с верхней ручкой",
      "ro": "Geantă structurată din piele cu mâner superior",
      "en": "Structured Leather Top Handle Bag"
    },
    "description": {
      "ru": "Структурная кожаная сумка с верхней ручкой. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă structurată din piele cu mâner superior este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Structured Leather Top Handle Bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-fan-straw-handbag-natural-cognac": {
    "title": {
      "ru": "Соломенная сумка веерной формы",
      "ro": "Geantă din paie în formă de evantai",
      "en": "Premium Fan Straw Handbag"
    },
    "description": {
      "ru": "Соломенная сумка веерной формы. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă din paie în formă de evantai este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Premium Fan Straw Handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-crossbody-bag-white": {
    "title": {
      "ru": "Noelia — кожаная сумка кроссбоди",
      "ro": "Noelia — geantă crossbody din piele",
      "en": "Noelia — leather crossbody bag"
    },
    "description": {
      "ru": "Noelia — кожаная сумка кроссбоди. Модель выполнена из натуральной кожи и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПрактичная магнитная фиксация. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Noelia — geantă crossbody din piele naturală, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFixare magnetică practică. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Noelia — leather crossbody bag crafted from natural leather, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPractical magnetic fastening. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-crossbody-bag-beige": {
    "title": {
      "ru": "Элегантная кожаная сумка кроссбоди",
      "ro": "Geantă crossbody elegantă din piele",
      "en": "Elegant Leather Crossbody Bag"
    },
    "description": {
      "ru": "Элегантная кожаная сумка кроссбоди. Модель выполнена из натуральной кожи и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă crossbody elegantă din piele este o geantă crossbody din piele naturală, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Elegant Leather Crossbody Bag is a crossbody bag crafted from natural leather, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-moon-bag-cognac": {
    "title": {
      "ru": "Elara — кожаная сумка полумесяцем",
      "ro": "Elara — geantă semilună din piele",
      "en": "Elara — leather crescent bag"
    },
    "description": {
      "ru": "Elara — кожаная сумка полумесяцем из фактурной кожи с дугообразным силуэтом и золотистой фурнитурой — для повседневных и вечерних образов.\n\nКороткая ручка и съёмный регулируемый ремень, застёжка на молнии. Внутри — телефон, кошелёк, ключи и косметика. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Elara — geantă semilună din piele texturată, cu siluetă arcuită și finisaje aurii — pentru ținute de zi și de seară.\n\nMâner scurt și curea detașabilă reglabilă, fermoar sigur. Interiorul încăpe telefon, portofel, chei și cosmetice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Elara — leather crescent bag in textured leather with an arched silhouette and gold hardware — for day-to-evening looks.\n\nShort handle and detachable adjustable strap, zip closure. Fits a phone, wallet, keys and cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "elegant-leather-tote-bag-black": {
    "title": {
      "ru": "Violaine — кожаная сумка-тоут",
      "ro": "Violaine — geantă tote din piele",
      "en": "Violaine — leather tote bag"
    },
    "description": {
      "ru": "Violaine — кожаная сумка-тоут из кожи и замши с архитектурным силуэтом, двойными ручками и съёмным ремнём — для работы, города и поездок.\n\nПросторное отделение вмещает документы, кошелёк, косметику и повседневные мелочи. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Violaine — geantă tote din piele și piele întoarsă, cu siluetă arhitecturală, mânere duble și curea detașabilă — pentru birou, oraș și călătorii.\n\nCompartimentul încăpător încăpe documente, portofel, cosmetice și accesorii zilnice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Violaine — leather and suede tote with an architectural silhouette, double handles and a detachable strap — for work, city days and travel.\n\nThe roomy interior fits documents, a wallet, cosmetics and everyday essentials. Available to order, delivery in 7–14 days."
    }
  },
  "pouch-bag-black-onyx": {
    "title": {
      "ru": "Capucine — сумка-пауч",
      "ro": "Capucine — geantă pouch",
      "en": "Capucine — pouch bag"
    },
    "description": {
      "ru": "Capucine — сумка-пауч из телячьей кожи с мягкими драпированными линиями и золотистой фурнитурой на ручке — для повседневных и вечерних образов.\n\nЗастёжка на молнии, вместительное отделение внутри. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Capucine — geantă pouch din piele de vițel, cu linii drapate moi și finisaje aurii pe mâner — pentru ținute de zi și de seară.\n\nFermoar sigur, compartiment interior încăpător. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Capucine — calf leather pouch bag with soft draped lines and gold hardware on the handle — for day-to-evening looks.\n\nZip closure and a roomy interior. Available to order, delivery in 7–14 days."
    }
  },
  "structured-leather-tote-bag-burgundy": {
    "title": {
      "ru": "Beatrice — структурированная сумка-тоут",
      "ro": "Beatrice — geantă tote structurată",
      "en": "Beatrice — structured tote bag"
    },
    "description": {
      "ru": "Beatrice — структурированная сумка-тоут. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Beatrice — geantă tote structurată este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Beatrice — structured tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "the-essential-shoulder-bag-tan-cognac": {
    "title": {
      "ru": "Adele — базовая сумка на плечо",
      "ro": "Adele — geantă de umăr esențială",
      "en": "Adele — essential shoulder bag"
    },
    "description": {
      "ru": "Adele — базовая сумка на плечо. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Adele — geantă de umăr esențială este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Adele — essential shoulder bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "aurelia-soft-hobo-cognac": {
    "title": {
      "ru": "Мягкая сумка-хобо Aurelia из зернистой кожи коньячного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Мягкая сумка-хобо Aurelia из зернистой кожи коньячного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПрактичная магнитная фиксация. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFixare magnetică practică. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPractical magnetic fastening. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "aurelia-baguette-black": {
    "title": {
      "ru": "Сумка-багет Aurelia на короткой ручке из гладкой кожи чёрного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Сумка-багет Aurelia на короткой ручке из гладкой кожи чёрного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "vionetta-structured-bag-beige": {
    "title": {
      "ru": "Структурная сумка Vionetta с крупной пряжкой из кожи бежевого цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Структурная сумка Vionetta с крупной пряжкой из кожи бежевого цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "vionetta-mini-crossbody-rose": {
    "title": {
      "ru": "Мини-сумка Vionetta через плечо на цепочке пудрового цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Мини-сумка Vionetta через плечо на цепочке пудрового цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-tote-sand": {
    "title": {
      "ru": "Большой шопер SÓRA Atelier из плотной кожи песочного цвета",
      "ro": "Geantă tote",
      "en": "Tote bag"
    },
    "description": {
      "ru": "Большой шопер SÓRA Atelier из плотной кожи песочного цвета. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-backpack-black": {
    "title": {
      "ru": "Женский рюкзак SÓRA Atelier из мягкой кожи чёрного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Женский рюкзак SÓRA Atelier из мягкой кожи чёрного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "castello-briefcase-brown": {
    "title": {
      "ru": "Деловой портфель Castello из гладкой кожи коричневого цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Деловой портфель Castello из гладкой кожи коричневого цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-crossbody-cognac": {
    "title": {
      "ru": "Сумка через плечо Marrone с двумя карманами коньячного цвета",
      "ro": "Geantă de umăr",
      "en": "Shoulder bag"
    },
    "description": {
      "ru": "Сумка через плечо Marrone с двумя карманами коньячного цвета. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă de umăr este o geantă de umăr din piele texturată, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Shoulder bag is a shoulder bag crafted from textured leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-clutch-bordo": {
    "title": {
      "ru": "Клатч Marrone на цепочке из гладкой кожи бордового цвета",
      "ro": "Clutch",
      "en": "Clutch"
    },
    "description": {
      "ru": "Клатч Marrone на цепочке из гладкой кожи бордового цвета. Модель выполнена из натуральной кожи и создана для вечера, мероприятий и минималистичных выходов с самым необходимым. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nКомпактный формат для выхода. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Clutch este un clutch din piele naturală, creată pentru seară, evenimente și ieșiri minimaliste cu strictul necesar. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat compact pentru ieșiri. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Clutch is a clutch crafted from natural leather, designed for evenings, events and minimal outings with just the essentials. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nCompact format for going out. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "aurelia-travel-bag-brown": {
    "title": {
      "ru": "Дорожная сумка Aurelia из плотной кожи коричневого цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Дорожная сумка Aurelia из плотной кожи коричневого цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-belt-bag-black": {
    "title": {
      "ru": "Поясная сумка SÓRA Atelier из гладкой кожи чёрного цвета",
      "ro": "Geantă crossbody",
      "en": "Crossbody bag"
    },
    "description": {
      "ru": "Поясная сумка SÓRA Atelier из гладкой кожи чёрного цвета. Модель выполнена из натуральной кожи и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nСвободные руки в движении. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă crossbody este o geantă crossbody din piele naturală, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nMâini libere în mișcare. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Crossbody bag is a crossbody bag crafted from natural leather, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nHands-free ease on the move. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "vionetta-bucket-green": {
    "title": {
      "ru": "Сумка-мешок Vionetta на затяжке из кожи зелёного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Сумка-мешок Vionetta на затяжке из кожи зелёного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "aurelia-big-shopper-grey": {
    "title": {
      "ru": "Большая сумка Aurelia с двумя ручками серого цвета",
      "ro": "Geantă tote",
      "en": "Tote bag"
    },
    "description": {
      "ru": "Большая сумка Aurelia с двумя ручками серого цвета. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-crossbody-navy": {
    "title": {
      "ru": "Небольшая сумка через плечо Marrone синего цвета",
      "ro": "Geantă de umăr",
      "en": "Shoulder bag"
    },
    "description": {
      "ru": "Небольшая сумка через плечо Marrone синего цвета. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă de umăr este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Shoulder bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-turn-lock-strap-tote-bag": {
    "title": {
      "ru": "Greta — сумка-тоут с замком",
      "ro": "Greta — geantă tote",
      "en": "Greta — tote bag"
    },
    "description": {
      "ru": "Greta — сумка-тоут с замком. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Greta — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Greta — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-compact-woven-panel-metallic-top-handle-bag": {
    "title": {
      "ru": "Nerissa — сумка на короткой ручке",
      "ro": "Nerissa — geantă",
      "en": "Nerissa — handbag"
    },
    "description": {
      "ru": "Nerissa — сумка на короткой ручке. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Nerissa — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Nerissa — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-duo-mini-tote-bag": {
    "title": {
      "ru": "Fabrizia — мини-тоут",
      "ro": "Fabrizia — geantă",
      "en": "Fabrizia — handbag"
    },
    "description": {
      "ru": "Fabrizia — мини-тоут. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fabrizia — geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fabrizia — handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-hobo-shoulder-bag": {
    "title": {
      "ru": "Lucrezia — сумка хобо на плечо",
      "ro": "Lucrezia — geantă",
      "en": "Lucrezia — handbag"
    },
    "description": {
      "ru": "Lucrezia — сумка хобо на плечо. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Lucrezia — geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Lucrezia — handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-knitted-openwork-panel-tote-bag": {
    "title": {
      "ru": "Ginevra — тоут из вязаного полотна",
      "ro": "Ginevra — geantă tote",
      "en": "Ginevra — tote bag"
    },
    "description": {
      "ru": "Ginevra — тоут из вязаного полотна. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Ginevra — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Ginevra — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-leather-tote-shoulder-bag": {
    "title": {
      "ru": "Allegra — сумка-тоут на плечо",
      "ro": "Allegra — geantă tote",
      "en": "Allegra — tote bag"
    },
    "description": {
      "ru": "Allegra — сумка-тоут на плечо. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Allegra — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Allegra — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-luna-soft-hobo-bag": {
    "title": {
      "ru": "Luna — мягкая сумка хобо",
      "ro": "Luna — geantă",
      "en": "Luna — handbag"
    },
    "description": {
      "ru": "Luna — мягкая сумка хобо. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Luna — geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Luna — handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-accordion-buckle-shoulder-bag": {
    "title": {
      "ru": "Bettina — сумка на плечо с пряжкой",
      "ro": "Bettina — geantă de umăr cu cataramă",
      "en": "Bettina — buckle shoulder bag"
    },
    "description": {
      "ru": "Bettina — сумка на плечо с пряжкой. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Bettina — geantă de umăr este o geantă de umăr din piele texturată, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Bettina — shoulder bag is a shoulder bag crafted from textured leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-baguette-bag": {
    "title": {
      "ru": "Perrine — багет на плечо",
      "ro": "Perrine — geantă",
      "en": "Perrine — handbag"
    },
    "description": {
      "ru": "Perrine — багет на плечо. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Perrine — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Perrine — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-compact-baguette-bag": {
    "title": {
      "ru": "Anaelle — компактный багет",
      "ro": "Anaelle — geantă",
      "en": "Anaelle — handbag"
    },
    "description": {
      "ru": "Anaelle — компактный багет. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Anaelle — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Anaelle — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-contrast-trim-structured-top-handle-bag": {
    "title": {
      "ru": "Ninette — структурная сумка с контрастной окантовкой",
      "ro": "Ninette — geantă",
      "en": "Ninette — handbag"
    },
    "description": {
      "ru": "Ninette — структурная сумка с контрастной окантовкой. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Ninette — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Ninette — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-contrast-trim-turn-lock-structured-top-handle-bag": {
    "title": {
      "ru": "Thea — структурная сумка с поворотным замком",
      "ro": "Thea — geantă",
      "en": "Thea — handbag"
    },
    "description": {
      "ru": "Thea — структурная сумка с поворотным замком. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Thea — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Thea — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-crescent-hobo-bag": {
    "title": {
      "ru": "Colline — сумка хобо полумесяцем",
      "ro": "Colline — geantă",
      "en": "Colline — handbag"
    },
    "description": {
      "ru": "Colline — сумка хобо полумесяцем. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Colline — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Colline — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-drawstring-tote-bag": {
    "title": {
      "ru": "Maelle — тоут на завязках",
      "ro": "Maelle — geantă tote",
      "en": "Maelle — tote bag"
    },
    "description": {
      "ru": "Maelle — тоут на завязках. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nМягкое закрытие на шнурке. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Maelle — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere lejeră cu șnur. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Maelle — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRelaxed drawstring closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-half-moon-shoulder-bag": {
    "title": {
      "ru": "Livia — сумка полумесяц на плечо",
      "ro": "Livia — geantă de umăr",
      "en": "Livia — shoulder bag"
    },
    "description": {
      "ru": "Livia — сумка полумесяц на плечо. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Livia — geantă de umăr este o geantă de umăr din piele texturată, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Livia — shoulder bag is a shoulder bag crafted from textured leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-kiss-lock-pouch-bag-ivory": {
    "title": {
      "ru": "Cassia — клатч с рамочным замком",
      "ro": "Cassia — clutch cu încuietoare tip cadru",
      "en": "Cassia — kiss-lock clutch"
    },
    "description": {
      "ru": "Cassia — компактный клатч с рамочным замком. Модель выполнена из фактурной кожи с мягкой драпировкой и создана для вечера, мероприятий и минималистичных выходов. Силуэт собранный, но лёгкий — аксессуар не перегружает образ.\n\nКомпактный формат для выхода. Внутреннее пространство рассчитано на телефон, карты, помаду и мелочи. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Cassia — clutch compact cu încuietoare tip cadru. Model din piele texturată cu drapaj moale, creat pentru seară, evenimente și ieșiri minimaliste. Silueta rămâne elegantă fără să pară voluminoasă.\n\nFormat compact pentru ieșiri. Interiorul este gândit pentru telefon, carduri, ruj și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Cassia — compact kiss-lock clutch crafted from textured leather with a soft draped finish, designed for evenings, events and minimal outings. The silhouette feels polished without looking bulky.\n\nCompact format for going out. The interior fits a phone, cards, lipstick and small essentials. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pleated-leather-frame-clutch": {
    "title": {
      "ru": "Fiamma — клатч с металлической рамкой",
      "ro": "Fiamma — clutch cu cadru metalic",
      "en": "Fiamma — metal-frame clutch"
    },
    "description": {
      "ru": "Fiamma — мягкий клатч с вертикальной драпировкой и геометричной металлической рамкой-ручкой. Магнитная застёжка, просторное отделение и съёмный регулируемый плечевой ремень.\n\nНосить в руке за рамку или через плечо на ремне. Доставка 7–14 дней.",
      "ro": "Fiamma — clutch moale cu drapaj vertical și mâner-cadru metalic geometric. Închidere magnetică, compartiment spațios și curea de umăr detașabilă, reglabilă.\n\nSe poate purta în mână sau pe umăr. Livrare în 7–14 zile.",
      "en": "Fiamma — soft clutch with vertical draping and a geometric metal frame handle. Magnetic closure, a roomy single compartment and a detachable adjustable shoulder strap.\n\nCarry by the frame or wear crossbody on the strap. Delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-side-drawstring-shoulder-bag": {
    "title": {
      "ru": "Gioia — сумка на плечо с боковыми завязками",
      "ro": "Gioia — geantă de umăr cu șnururi laterale",
      "en": "Gioia — side-drawstring shoulder bag"
    },
    "description": {
      "ru": "Gioia — сумка на плечо из зернистой кожи с тонкими ремнями и декоративными боковыми завязками с золотыми наконечниками. Верх на молнии, одно просторное отделение.\n\nУдлинённый силуэт для города. Доставка 7–14 дней.",
      "ro": "Gioia — geantă de umăr din piele granulată, cu curele subțiri și șnururi decorative laterale cu capete aurii. Închidere cu fermoar, un compartiment spațios.\n\nSiluetă alungită pentru oraș. Livrare în 7–14 zile.",
      "en": "Gioia — pebbled leather shoulder bag with thin straps and decorative side drawstrings finished with gold tips. Zip-top closure and a roomy single compartment.\n\nElongated city silhouette. Delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-two-tone-bowling-bag": {
    "title": {
      "ru": "Giorgia — боулинг-сумка двухцветная",
      "ro": "Giorgia — geantă bowling bicoloră",
      "en": "Giorgia — two-tone bowling bag"
    },
    "description": {
      "ru": "Giorgia — структурная боулинг-сумка из зернистой кожи. Доступна в двухцветном сочетании taupe и однотонных оттенках. Верх на молнии, просторное отделение с карманом, золотая фурнитура.\n\nСобранный силуэт для города. Доставка 7–14 дней.",
      "ro": "Giorgia — geantă bowling structurată din piele granulată, disponibilă bicolor sau monocoloră. Închidere cu fermoar, compartiment spațios cu buzunar, accesorii aurii.\n\nSiluetă elegantă pentru oraș. Livrare în 7–14 zile.",
      "en": "Giorgia — structured pebbled leather bowling bag in two-tone and solid colorways. Zip-top closure, roomy compartment with a slip pocket and gold hardware.\n\nPolished city silhouette. Delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-kiss-lock-pouch-bag-light-blue": {
    "title": {
      "ru": "Paloma — сумка с фермуаром",
      "ro": "Paloma — geantă cu fermuar",
      "en": "Paloma — kiss-lock bag"
    },
    "description": {
      "ru": "Paloma — структурная сумка с рамочным замком. Модель выполнена из фактурной кожи и создана для города, встреч и повседневных образов с акцентом на силуэт. Собранная форма и щёлкающая застёжка придают аксессуару характер.\n\nБольше объёма для ежедневных вещей — телефон, кошелёк, ключи и косметика. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Paloma — geantă structurată cu încuietoare tip cadru. Model din piele texturată, creat pentru oraș, întâlniri și ținute de zi cu zi cu accent pe siluetă. Forma bine definită și închiderea tip cadru îi dau personalitate.\n\nMai mult spațiu pentru lucrurile zilnice — telefon, portofel, chei și cosmetice. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Paloma — structured kiss-lock bag crafted from textured leather, designed for city days, meetings and everyday looks with a defined silhouette. The frame closure adds character without extra hardware.\n\nMore room for daily essentials — phone, wallet, keys and cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-rectangular-handbag": {
    "title": {
      "ru": "Aurea — прямоугольная сумка в руке",
      "ro": "Aurea — geantă",
      "en": "Aurea — handbag"
    },
    "description": {
      "ru": "Aurea — прямоугольная сумка в руке. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Aurea — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Aurea — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-satchel-bag": {
    "title": {
      "ru": "Halle — сумка-сэтчел",
      "ro": "Halle — geantă",
      "en": "Halle — handbag"
    },
    "description": {
      "ru": "Halle — сумка-сэтчел. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Halle — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Halle — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-handbag": {
    "title": {
      "ru": "Romilly — структурная сумка в руке",
      "ro": "Romilly — geantă",
      "en": "Romilly — handbag"
    },
    "description": {
      "ru": "Romilly — структурная сумка в руке. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Romilly — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Romilly — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-shopper-tote": {
    "title": {
      "ru": "Vespera — структурный шоппер-тоут",
      "ro": "Vespera — geantă tote",
      "en": "Vespera — tote bag"
    },
    "description": {
      "ru": "Vespera — структурный шоппер-тоут. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Vespera — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Vespera — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-tote-bag-with-pouch": {
    "title": {
      "ru": "Marielle — тоут с коcmетичкой",
      "ro": "Marielle — geantă tote",
      "en": "Marielle — tote bag"
    },
    "description": {
      "ru": "Marielle — тоут с коcmетичкой. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Marielle — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Marielle — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-tote-bag": {
    "title": {
      "ru": "Fiorenza — сумка-тоут",
      "ro": "Fiorenza — geantă tote",
      "en": "Fiorenza — tote bag"
    },
    "description": {
      "ru": "Fiorenza — сумка-тоут. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fiorenza — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fiorenza — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-flap-shoulder-bag-black": {
    "title": {
      "ru": "Colette — сумка на плечо с клапаном на замке",
      "ro": "Colette — geantă de umăr cu clapetă și încuietoare",
      "en": "Colette — turn-lock flap shoulder bag"
    },
    "description": {
      "ru": "Colette — сумка на плечо с клапаном на замке. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны собранный силуэт и удобный доступ к вещам. Конвертный клапан и золотая фурнитура выглядят аккуратно и не перегружают образ.\n\nПлечевой ремень для комфортной носки. Внутри — контрастная красная подкладка и место для телефона, кошелька, ключей и косметики. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Colette — geantă de umăr cu clapetă și încuietoare rotativă. Model din piele texturată, creat pentru zile active în oraș, întâlniri și ținute în care contează o siluetă bine definită. Clapeta tip plic și finisajele aurii rămân elegante fără exces.\n\nCurea de umăr pentru purtare comodă. Interior cu căptușeală roșie contrastantă, suficient pentru telefon, portofel, chei și cosmetice. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Colette — turn-lock flap shoulder bag crafted from textured leather, designed for city days, meetings and outfits where a polished silhouette matters. The envelope flap and gold hardware feel refined without looking heavy.\n\nShoulder strap for comfortable wear. Inside, a contrasting red lining offers room for a phone, wallet, keys and cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-flap-shoulder-tote-bag": {
    "title": {
      "ru": "Loretta — тоут с клапаном на замке",
      "ro": "Loretta — geantă tote",
      "en": "Loretta — tote bag"
    },
    "description": {
      "ru": "Loretta — тоут с клапаном на замке. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Loretta — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Loretta — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-placket-tote-with-pouch": {
    "title": {
      "ru": "Cressida — тоут с планкой на замке",
      "ro": "Cressida — geantă tote",
      "en": "Cressida — tote bag"
    },
    "description": {
      "ru": "Cressida — тоут с планкой на замке. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Cressida — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Cressida — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-top-handle-bag": {
    "title": {
      "ru": "Palmira — сумка с поворотным замком",
      "ro": "Palmira — geantă",
      "en": "Palmira — handbag"
    },
    "description": {
      "ru": "Palmira — сумка с поворотным замком. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Palmira — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Palmira — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-zip-hobo-bag": {
    "title": {
      "ru": "Amabel — сумка хобо на молнии",
      "ro": "Amabel — geantă",
      "en": "Amabel — handbag"
    },
    "description": {
      "ru": "Amabel — сумка хобо на молнии. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Amabel — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Amabel — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-compact-baguette-bag": {
    "title": {
      "ru": "Ottilie — гладкий компактный багет",
      "ro": "Ottilie — geantă",
      "en": "Ottilie — handbag"
    },
    "description": {
      "ru": "Ottilie — гладкий компактный багет. Модель выполнена из гладкой кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Ottilie — geantă este o geantă din piele netedă, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Ottilie — handbag is a handbag crafted from smooth leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-contrast-trim-flap-shoulder-bag": {
    "title": {
      "ru": "Perlette — сумка на плечо с клапаном",
      "ro": "Perlette — geantă de umăr",
      "en": "Perlette — shoulder bag"
    },
    "description": {
      "ru": "Perlette — сумка на плечо с клапаном. Модель выполнена из гладкой кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПрактичная магнитная фиксация. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Perlette — geantă de umăr este o geantă de umăr din piele netedă, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFixare magnetică practică. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Perlette — shoulder bag is a shoulder bag crafted from smooth leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPractical magnetic fastening. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-crescent-hobo-bag": {
    "title": {
      "ru": "Rosalind — гладкая хобо полумесяцем",
      "ro": "Rosalind — geantă",
      "en": "Rosalind — handbag"
    },
    "description": {
      "ru": "Rosalind — гладкая хобо полумесяцем. Модель выполнена из гладкой кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Rosalind — geantă este o geantă din piele netedă, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Rosalind — handbag is a handbag crafted from smooth leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-suede-wing-tote-bag": {
    "title": {
      "ru": "Severine — сумка-тоут из замши",
      "ro": "Severine — shopper din piele întoarsă",
      "en": "Severine — suede tote bag"
    },
    "description": {
      "ru": "Severine — сумка-тоут из замши с трапециевидным силуэтом и расклешёнными боками. Тонкие кожаные плечевые ремни с декоративными концами и магнитная застёжка — характерные детали модели.\n\nПросторное внутреннее отделение с контрастной подкладкой и косметичка в комплекте делают сумку удобной для повседневной носки. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Severine — shopper din piele întoarsă, cu siluetă trapezoidală și laterale evazate. Curelele subțiri din piele, cu capete decorative, și închiderea magnetică sunt detaliile distinctive ale modelului.\n\nInteriorul spațios, cu căptușeală contrastantă, și un pouch inclus în set o fac potrivită pentru purtarea zilnică. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Severine — suede tote with a trapezoid silhouette and flared sides. Slim leather shoulder straps with decorative hanging ends and a magnetic closure are the signature details.\n\nA roomy interior with contrast lining and a matching pouch make it easy for everyday wear. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-ring-handle-structured-bag": {
    "title": {
      "ru": "Callista — сумка с кольцевой ручкой",
      "ro": "Callista — geantă cu mâner circular",
      "en": "Callista — ring-handle structured bag"
    },
    "description": {
      "ru": "Callista — структурная сумка из зернистой кожи с архитектурным силуэтом и кольцевой ручкой. Центральная треугольная панель и боковая молния — характерные детали модели.\n\nСъёмный плечевой ремень позволяет носить сумку в руке или через плечо. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Callista — geantă structurată din piele granulată, cu siluetă arhitecturală și mâner circular. Panoul central triunghiular și fermoarul lateral sunt detaliile distinctive ale modelului.\n\nCureaua detașabilă de umăr permite purtarea în mână sau pe umăr. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Callista — pebbled leather structured bag with an architectural silhouette and a ring handle. The central triangular panel and side zip are the signature details.\n\nA detachable shoulder strap lets you carry it by hand or on the shoulder. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-woven-suede-flap-clutch-bag": {
    "title": {
      "ru": "Damiana — плетёный клатч из замши",
      "ro": "Damiana — clutch împletit din piele întoarsă",
      "en": "Damiana — woven suede flap clutch"
    },
    "description": {
      "ru": "Damiana — клатч из плетёной замши с диагональным переплетением и клапаном на магнитной кнопке. Тонкий ремешок с декоративными узлами — характерная деталь модели.\n\nПодходит для вечера и повседневных выходов: внутри помещаются телефон, карты и косметика. Модель доступна под заказ: срок доставки 7–14 рабочих дней.",
      "ro": "Damiana — clutch din piele întoarsă împletită, cu împletitură diagonală și clapetă cu capsa magnetică. Curea subțire cu noduri decorative este detaliul distinctiv al modelului.\n\nPotrivit pentru seară și ieșiri zilnice: interiorul încăpe telefon, carduri și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile lucrătoare.",
      "en": "Damiana — woven suede clutch with a diagonal weave and a magnetic flap closure. A slim strap with decorative knots is the signature detail.\n\nWorks for evenings and everyday outings — the interior fits a phone, cards and cosmetics. Available on pre-order, with delivery in 7–14 business days."
    }
  },
  "womens-smooth-leather-metal-ring-crescent-hobo-bag": {
    "title": {
      "ru": "Mirabel — сумка-полумесяц с металлическим кольцом",
      "ro": "Mirabel — geantă semilună cu inel metalic",
      "en": "Mirabel — metal-ring crescent hobo bag"
    },
    "description": {
      "ru": "Mirabel — сумка-полумесяц из гладкой кожи с округлым силуэтом и встроенным плечевым ремнём. Серебристое декоративное кольцо у нижнего края — характерная деталь модели.\n\nМягкий силуэт без каркаса и одно отделение через верхний проём подходят для повседневного минимума. Модель доступна под заказ: срок доставки 7–14 рабочих дней.",
      "ro": "Mirabel — geantă semilună din piele netedă, cu siluetă rotunjită și curea de umăr integrată. Inelul decorativ argintiu de la baza genții este detaliul distinctiv al modelului.\n\nSilueta moale, fără structură rigidă, și un singur compartiment prin deschiderea de sus o fac potrivită pentru esențialele zilnice. Modelul este disponibil la comandă: livrare în 7–14 zile lucrătoare.",
      "en": "Mirabel — smooth leather crescent bag with a rounded silhouette and an integrated shoulder strap. The silver decorative ring at the base is the signature detail.\n\nThe soft, unstructured shape and single compartment through the top opening work for everyday essentials. Available on pre-order, with delivery in 7–14 business days."
    }
  },
  "womens-woven-leather-turn-lock-clutch-bag": {
    "title": {
      "ru": "Annabel — плетёная сумка с замком-вертушкой",
      "ro": "Annabel — geantă împletită cu incuietoare rotativă",
      "en": "Annabel — woven leather turn-lock clutch"
    },
    "description": {
      "ru": "Annabel — горизонтальная сумка из плетёной кожи с диагональным переплетением и клапаном на замке-вертушке. Плоская верхняя ручка и съёмный плечевой ремень — характерные детали модели.\n\nВытянутый силуэт подходит для вечера и повседневных выходов: внутри помещаются телефон, карты и косметика. Модель доступна под заказ: срок доставки 7–14 рабочих дней.",
      "ro": "Annabel — geantă orizontală din piele împletită, cu împletitură diagonală și clapetă cu incuietoare rotativă. Mânerul plat de sus și curea detașabilă de umăr sunt detaliile distinctive ale modelului.\n\nSilueta alungită este potrivită pentru seară și ieșiri zilnice: interiorul încăpe telefon, carduri și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile lucrătoare.",
      "en": "Annabel — horizontal woven leather bag with a diagonal weave and a turn-lock flap closure. A flat top handle and detachable shoulder strap are the signature details.\n\nThe elongated silhouette works for evenings and everyday outings — the interior fits a phone, cards and cosmetics. Available on pre-order, with delivery in 7–14 business days."
    }
  },
  "womens-soft-leather-draped-flap-bag": {
    "title": {
      "ru": "Solaine — сумка с драпированным клапаном",
      "ro": "Solaine — geantă de umăr",
      "en": "Solaine — shoulder bag"
    },
    "description": {
      "ru": "Solaine — сумка с драпированным клапаном. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Solaine — geantă de umăr este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Solaine — shoulder bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-tote-shopper-bag": {
    "title": {
      "ru": "Adalina — сумка-шоппер",
      "ro": "Adalina — geantă tote",
      "en": "Adalina — tote bag"
    },
    "description": {
      "ru": "Adalina — сумка-шоппер. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Adalina — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Adalina — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-drawstring-bucket-bag": {
    "title": {
      "ru": "Elowen — сумка-мешок с плетёным основанием",
      "ro": "Elowen — geantă bucket",
      "en": "Elowen — bucket bag"
    },
    "description": {
      "ru": "Elowen — сумка-мешок с плетёным основанием. Модель выполнена из плетёной фактуры с кожаными деталями и создана для летних образов, прогулок и расслабленного smart casual. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nМягкое закрытие на шнурке. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Elowen — geantă bucket este o geantă bucket din textură împletită cu detalii din piele, creată pentru ținute de vară, plimbări și smart casual relaxat. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere lejeră cu șnur. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Elowen — bucket bag is a bucket bag crafted from a woven texture with leather details, designed for summer looks, walks and relaxed smart casual styling. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRelaxed drawstring closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-leather-link-handle-hobo-bag": {
    "title": {
      "ru": "Fantine — хобо с плетёным основанием",
      "ro": "Fantine — geantă",
      "en": "Fantine — handbag"
    },
    "description": {
      "ru": "Fantine — хобо с плетёным основанием. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fantine — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fantine — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-open-top-structured-bag-with-pouch": {
    "title": {
      "ru": "Garance — структурная сумка с плетёным основанием",
      "ro": "Garance — geantă tote",
      "en": "Garance — tote bag"
    },
    "description": {
      "ru": "Garance — структурная сумка с плетёным основанием. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Garance — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Garance — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-round-bucket-bag": {
    "title": {
      "ru": "Herminie — круглая сумка-мешок",
      "ro": "Herminie — geantă bucket",
      "en": "Herminie — bucket bag"
    },
    "description": {
      "ru": "Herminie — круглая сумка-мешок. Модель выполнена из плетёной фактуры с кожаными деталями и создана для летних образов, прогулок и расслабленного smart casual. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nМягкий объём без лишней строгости. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Herminie — geantă bucket este o geantă bucket din textură împletită cu detalii din piele, creată pentru ținute de vară, plimbări și smart casual relaxat. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nVolum moale, fără rigiditate excesivă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Herminie — bucket bag is a bucket bag crafted from a woven texture with leather details, designed for summer looks, walks and relaxed smart casual styling. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSoft volume without excess structure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-turn-lock-top-handle-bag": {
    "title": {
      "ru": "Isolde — сумка с плетёным основанием и замком",
      "ro": "Isolde — geantă",
      "en": "Isolde — handbag"
    },
    "description": {
      "ru": "Isolde — сумка с плетёным основанием и замком. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Isolde — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Isolde — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-zip-top-compact-structured-bag": {
    "title": {
      "ru": "Jacinta — компактная структурная сумка на молнии",
      "ro": "Jacinta — geantă",
      "en": "Jacinta — handbag"
    },
    "description": {
      "ru": "Jacinta — компактная структурная сумка на молнии. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Jacinta — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Jacinta — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-zip-top-structured-bag": {
    "title": {
      "ru": "Kalina — структурная сумка на молнии",
      "ro": "Kalina — geantă",
      "en": "Kalina — handbag"
    },
    "description": {
      "ru": "Kalina — структурная сумка на молнии. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Kalina — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Kalina — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-buckle-handle-tote-bag": {
    "title": {
      "ru": "Lisette — тоут с пряжкой на ручке",
      "ro": "Lisette — geantă tote",
      "en": "Lisette — tote bag"
    },
    "description": {
      "ru": "Lisette — тоут с пряжкой на ручке. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Lisette — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Lisette — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-crescent-hobo-bag": {
    "title": {
      "ru": "Manon — плетёная хобо полумесяцем",
      "ro": "Manon — geantă",
      "en": "Manon — handbag"
    },
    "description": {
      "ru": "Manon — плетёная хобо полумесяцем. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Manon — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Manon — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-flap-top-handle-bag": {
    "title": {
      "ru": "Noriane — плетёная сумка с клапаном",
      "ro": "Noriane — geantă",
      "en": "Noriane — handbag"
    },
    "description": {
      "ru": "Noriane — плетёная сумка с клапаном. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобная застёжка на кнопку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Noriane — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere comodă cu capsă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Noriane — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nEasy snap closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag": {
    "title": {
      "ru": "Oriane — тоут с овальными ручками",
      "ro": "Oriane — geantă tote",
      "en": "Oriane — tote bag"
    },
    "description": {
      "ru": "Oriane — тоут с овальными ручками. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Oriane — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Oriane — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag-natural-tan": {
    "title": {
      "ru": "Celia — тоут с овальными ручками",
      "ro": "Celia — geantă tote cu mânere ovale",
      "en": "Celia — oval handle tote bag"
    },
    "description": {
      "ru": "Celia — тоут с овальными ручками и плетёной фактурой полотна. Лёгкий открытый силуэт подойдёт для повседневных выходов, прогулок и тёплого сезона.\n\nВнутри одно просторное отделение для телефона, кошелька, ключей и небольших аксессуаров. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Celia — geantă tote cu mânere ovale și textură împletită. Silueta lejeră, cu partea superioară deschisă, este potrivită pentru ținute de zi, plimbări și sezonul cald.\n\nInteriorul are un compartiment încăpător pentru telefon, portofel, chei și accesorii mici. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Celia — oval handle tote bag with a woven texture. The light open-top silhouette works for everyday outings, walks and warm-season styling.\n\nThe interior has one roomy compartment for a phone, wallet, keys and small accessories. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag-mokko": {
    "title": {
      "ru": "Roxane — тоут с овальными ручками",
      "ro": "Roxane — geantă tote cu mânere ovale",
      "en": "Roxane — oval handle tote bag"
    },
    "description": {
      "ru": "Roxane — тоут с овальными ручками и плетёной фактурой полотна. Лёгкий открытый силуэт подойдёт для повседневных выходов, прогулок и тёплого сезона.\n\nВнутри одно просторное отделение для телефона, кошелька, ключей и небольших аксессуаров. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Roxane — geantă tote cu mânere ovale și textură împletită. Silueta lejeră, cu partea superioară deschisă, este potrivită pentru ținute de zi, plimbări și sezonul cald.\n\nInteriorul are un compartiment încăpător pentru telefon, portofel, chei și accesorii mici. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Roxane — oval handle tote bag with a woven texture. The light open-top silhouette works for everyday outings, walks and warm-season styling.\n\nThe interior has one roomy compartment for a phone, wallet, keys and small accessories. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-panel-crystal-accent-structured-top-handle-bag": {
    "title": {
      "ru": "Pernelle — структурная сумка с декоративной вставкой",
      "ro": "Pernelle — geantă",
      "en": "Pernelle — handbag"
    },
    "description": {
      "ru": "Pernelle — структурная сумка с декоративной вставкой. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Pernelle — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Pernelle — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-panel-pebbled-leather-top-handle-bag": {
    "title": {
      "ru": "Aveline — сумка с плетёной панелью",
      "ro": "Aveline — geantă",
      "en": "Aveline — handbag"
    },
    "description": {
      "ru": "Aveline — сумка с плетёной панелью. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Aveline — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Aveline — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-spiral-panel-shoulder-tote-bag": {
    "title": {
      "ru": "Cendrine — тоут со спиральным плетением",
      "ro": "Cendrine — geantă tote",
      "en": "Cendrine — tote bag"
    },
    "description": {
      "ru": "Cendrine — тоут со спиральным плетением. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Cendrine — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Cendrine — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-triangular-shoulder-bag": {
    "title": {
      "ru": "Dorine — плетёная сумка треугольной формы",
      "ro": "Dorine — geantă de umăr",
      "en": "Dorine — shoulder bag"
    },
    "description": {
      "ru": "Dorine — плетёная сумка треугольной формы. Модель выполнена из плетёной фактуры с кожаными деталями и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Dorine — geantă de umăr este o geantă de umăr din textură împletită cu detalii din piele, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Dorine — shoulder bag is a shoulder bag crafted from a woven texture with leather details, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-zip-crossbody-bag": {
    "title": {
      "ru": "Gwenaelle — плетёная сумка кроссбоди",
      "ro": "Gwenaelle — geantă crossbody",
      "en": "Gwenaelle — crossbody bag"
    },
    "description": {
      "ru": "Gwenaelle — плетёная сумка кроссбоди. Модель выполнена из плетёной фактуры с кожаными деталями и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Gwenaelle — geantă crossbody este o geantă crossbody din textură împletită cu detalii din piele, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Gwenaelle — crossbody bag is a crossbody bag crafted from a woven texture with leather details, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "pelle-nova-wallet-cognac": {
    "title": {
      "ru": "Женский кошелёк Pelle Nova на молнии коньячного цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Женский кошелёк Pelle Nova на молнии коньячного цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "pelle-nova-cardholder-brown": {
    "title": {
      "ru": "Картхолдер Pelle Nova из натуральной кожи коричневого цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Картхолдер Pelle Nova из натуральной кожи коричневого цвета. Модель выполнена из натуральной кожи и создана для карт, документов и компактной организации в сумке. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nКомпактно помещается в сумку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Suport pentru carduri este un suport pentru carduri din piele naturală, creată pentru carduri, documente și organizare compactă în geantă. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncape ușor în geantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Card holder is a card holder crafted from natural leather, designed for cards, documents and compact organization inside a bag. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nFits easily into a bag. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-keyholder-cognac": {
    "title": {
      "ru": "Ключница Marrone из кожи коньячного цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Ключница Marrone из кожи коньячного цвета. Модель выполнена из натуральной кожи и создана для карт, документов и компактной организации в сумке. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобная застёжка на кнопку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Suport pentru carduri este un suport pentru carduri din piele naturală, creată pentru carduri, documente și organizare compactă în geantă. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere comodă cu capsă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Card holder is a card holder crafted from natural leather, designed for cards, documents and compact organization inside a bag. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nEasy snap closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-cosmetic-bag-beige": {
    "title": {
      "ru": "Коcmетичка SÓRA Atelier из мягкой кожи бежевого цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Коcmетичка SÓRA Atelier из мягкой кожи бежевого цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "pelle-nova-passport-cover-bordo": {
    "title": {
      "ru": "Обложка для паспорта Pelle Nova бордового цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Обложка для паспорта Pelle Nova бордового цвета. Модель выполнена из натуральной кожи и создана для карт, документов и компактной организации в сумке. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nКомпактно помещается в сумку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Suport pentru carduri este un suport pentru carduri din piele naturală, creată pentru carduri, documente și organizare compactă în geantă. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncape ușor în geantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Card holder is a card holder crafted from natural leather, designed for cards, documents and compact organization inside a bag. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nFits easily into a bag. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-bag-charm-cognac": {
    "title": {
      "ru": "Подвеска для сумки SÓRA Atelier из кожи коньячного цвета",
      "ro": "Accesoriu pentru geantă",
      "en": "Bag accessory"
    },
    "description": {
      "ru": "Подвеска для сумки SÓRA Atelier из кожи коньячного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nДобавляет сумке аккуратный акцент. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Accesoriu pentru geantă este un accesoriu pentru geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nAdaugă genții un accent rafinat. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Bag accessory is a bag accessory crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nAdds a refined accent to a bag. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-gift-set-black": {
    "title": {
      "ru": "Подарочный набор SÓRA Atelier: кошелёк и картхолдер чёрного цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Подарочный набор SÓRA Atelier: кошелёк и картхолдер чёрного цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПродуманная организация внутри. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nOrganizare interioară bine gândită. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nThoughtful interior organization. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-womens-wallet-rose": {
    "title": {
      "ru": "Женский кошелёк Marrone на кнопке пудрового цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Женский кошелёк Marrone на кнопке пудрового цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобная застёжка на кнопку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere comodă cu capsă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nEasy snap closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-full-grain-leather-zip-around-wallet": {
    "title": {
      "ru": "Francesca — кошелёк на молнии",
      "ro": "Francesca — portofel pentru femei",
      "en": "Francesca — women's wallet"
    },
    "description": {
      "ru": "Francesca — кошелёк на молнии. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Francesca — portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Francesca — women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-flap-leather-trifold-wallet": {
    "title": {
      "ru": "Federica — кошелёк на клапане",
      "ro": "Federica — portofel cu clapă",
      "en": "Federica — flap wallet"
    },
    "description": {
      "ru": "Federica — трёхсложный кошелёк с клапаном на кнопке. Внутри — отделения для карт и купюр, окно для документов, монетница на кнопке и карман на молнии. Зернистая кожа с винтажной фактурой.\n\nМодель есть в наличии: доставим за 1–3 дня.",
      "ro": "Federica — portofel tri-fold cu clapă și capsă. Interiorul are compartimente pentru carduri și bancnote, fereastră pentru acte, buzunar pentru monede cu capsă și buzunar cu fermoar. Piele granulată cu aspect vintage.\n\nModelul este în stoc: livrare în 1–3 zile.",
      "en": "Federica — tri-fold flap wallet with a snap closure. Inside you'll find card and note slots, an ID window, a snap coin pocket and a zip compartment. Pebbled leather with a vintage finish.\n\nThis style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-flap-trifold-wallet": {
    "title": {
      "ru": "Fabiana — плетёный кошелёк на клапане",
      "ro": "Fabiana — portofel împletit cu clapă",
      "en": "Fabiana — woven flap wallet"
    },
    "description": {
      "ru": "Fabiana — трёхсложный кошелёк с клапаном и плетением intrecciato. Внутри — отделения для карт и купюр, окно для документов, монетница на кнопке и карман на молнии.\n\nВыразительная фактура плетёной кожи делает аксессуар заметным даже в минималистичном образе. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fabiana — portofel tri-fold cu clapă și model intrecciato. Interiorul are compartimente pentru carduri și bancnote, fereastră pentru acte, buzunar pentru monede cu capsă și buzunar cu fermoar.\n\nTextura împletită face accesoriul remarcabil chiar și într-o ținută minimalistă. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fabiana — tri-fold flap wallet with an intrecciato weave. Inside you'll find card and note slots, an ID window, a snap coin pocket and a zip compartment.\n\nThe woven texture makes the piece stand out even in a minimal look. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-vintage-accordion-zip-wallet": {
    "title": {
      "ru": "Giulietta — кошелёк-гармошка на молнии",
      "ro": "Giulietta — portofel pentru femei",
      "en": "Giulietta — women's wallet"
    },
    "description": {
      "ru": "Giulietta — кошелёк-гармошка на молнии. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Giulietta — portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Giulietta — women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-leather-zip-around-wallet": {
    "title": {
      "ru": "Seraphina — плетёный кошелёк на молнии",
      "ro": "Seraphina — portofel împletit cu fermoar",
      "en": "Seraphina — woven zip-around wallet"
    },
    "description": {
      "ru": "Seraphina — плетёный кошелёк на молнии с фирменным переплетением intrecciato. Молния по периметру надёжно закрывает карты, купюры и мелочь; внутри — отделения для карт, окно для документов и монетница.\n\nВыразительная фактура плетёной кожи делает аксессуар заметным даже в минималистичном образе. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Seraphina — portofel împletit cu fermoar, cu model intrecciato distinctiv. Fermoarul pe contur închide în siguranță cardurile, bancnotele și monedele; interiorul are compartimente pentru carduri, fereastră pentru acte și buzunar pentru monede.\n\nTextura împletită a pielii face accesoriul remarcabil chiar și într-o ținută minimalistă. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Seraphina — woven zip-around wallet with a signature intrecciato weave. The perimeter zip keeps cards, notes and coins secure; inside you'll find card slots, an ID window and a zip coin pocket.\n\nThe woven leather texture makes the piece stand out even in a minimal look. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-leather-zip-snap-wallet": {
    "title": {
      "ru": "Flavia — плетёный кошелёк на молнии с кнопкой",
      "ro": "Flavia — portofel împletit cu fermoar și capsă",
      "en": "Flavia — woven zip snap wallet"
    },
    "description": {
      "ru": "Flavia — кошелёк с плетением intrecciato, молнией по периметру и ремешком на кнопке для дополнительной фиксации. Внутри — отделения для карт, окно для документов и монетница на молнии.\n\nВыразительная фактура плетёной кожи и насыщенный оттенок делают аксессуар заметным акцентом в образе. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Flavia — portofel împletit intrecciato, cu fermoar pe contur și curea cu capsă pentru fixare suplimentară. Interiorul are compartimente pentru carduri, fereastră pentru acte și buzunar pentru monede cu fermoar.\n\nTextura împletită și nuanța intensă fac accesoriul un accent remarcabil. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Flavia — intrecciato woven wallet with a perimeter zip and a snap strap for extra security. Inside you'll find card slots, an ID window and a zip coin pocket.\n\nThe woven texture and rich colour make it a standout everyday piece. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-bat-bag-charm": {
    "title": {
      "ru": "Bat — брелок для сумки La Via Firenze",
      "ro": "Bat — breloc La Via Firenze",
      "en": "Bat — La Via Firenze bag charm"
    },
    "description": {
      "ru": "Брелок La Via Firenze в форме летучей мыши из зернистой чёрной кожи с жёлтой кожаной маской. Кожаный шнур, золотая цепочка и миниатюрный ключ с гравировкой LA VIA — характерная подпись бренда.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze în formă de liliac din piele neagră granulată, cu mască galbenă din piele. Șnur din piele, lanț auriu și cheiță miniatură gravată LA VIA — semnătura distinctivă a brandului.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm shaped like a bat in pebbled black leather with a yellow leather mask. A leather cord, gold chain and miniature key engraved LA VIA — the brand's signature detail.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-flower-bag-charm": {
    "title": {
      "ru": "Flower — брелок для сумки La Via Firenze",
      "ro": "Flower — breloc La Via Firenze",
      "en": "Flower — La Via Firenze bag charm"
    },
    "description": {
      "ru": "Брелок La Via Firenze с многослойным цветком из чёрной, коньячной и белой кожи. Кремовый кожаный шнур с декоративным узлом, золотая цепочка и миниатюрный ключ с гравировкой LA VIA.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze cu floare stratificată din piele neagră, coniac și albă. Șnur din piele crem cu nod decorativ, lanț auriu și cheiță miniatură gravată LA VIA.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm with a layered flower in black, cognac and white leather. A cream leather cord with a decorative knot, gold chain and miniature key engraved LA VIA.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-cat-bag-charm": {
    "title": {
      "ru": "Cat — брелок для сумки La Via Firenze",
      "ro": "Cat — breloc La Via Firenze",
      "en": "Cat — La Via Firenze bag charm"
    },
    "description": {
      "ru": "Брелок La Via Firenze с мордочкой кота из чёрной и белой кожи, декоративным бантом из принтованного шёлка и золотой цепочкой с ключом LA VIA.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze cu cap de pisică din piele neagră și albă, fundă decorativă din mătase imprimată și lanț auriu cu cheia LA VIA.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm with a cat face in black and white leather, a decorative printed silk bow and a gold chain with an LA VIA key.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-bear-bag-charm": {
    "title": {
      "ru": "Bear — брелок для сумки La Via Firenze",
      "ro": "Bear — breloc La Via Firenze",
      "en": "Bear — La Via Firenze bag charm"
    },
    "description": {
      "ru": "Брелок La Via Firenze в форме медвежонка из коньячной кожи с тёмно-коричневыми акцентами на ушах и лапках. Золотая цепочка с кожаной вставкой и ключ с гравировкой LA VIA.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze în formă de ursuleț din piele coniac, cu accente maro închis pe urechi și labe. Lanț auriu cu insert din piele și cheie gravată LA VIA.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm shaped like a bear in cognac leather with dark brown accents on the ears and paws. A gold chain with a leather insert and an LA VIA engraved key.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "luma-pegasus-leather-bag-charm": {
    "title": {
      "ru": "Pegaso — кожаный брелок для сумки",
      "ro": "Pegaso — breloc din piele",
      "en": "Pegaso — leather bag charm"
    },
    "description": {
      "ru": "Кожаный брелок Pegaso в форме крылатого коня: объёмное тело, крыло, грива и хвост из полосок кожи, контрастная строчка по контуру. Петля на спине крепится на ручку или ремешок сумки.\n\nРучная отделка и насыщенные оттенки — заметный акцент к любой модели. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc Pegaso din piele în formă de cal înaripat: corp voluminos, aripă, coamă și coadă din fâșii de piele, cusătură contrastantă pe contur. Bucla de pe spate se prinde de mânerul sau cureaua genții.\n\nExecuție manuală și nuanțe intense — accent remarcabil pentru orice geantă. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Pegaso leather bag charm shaped like a winged horse: a padded body, wing, fringed mane and tail, and contrast stitching around the edges. The loop on the back slips over a bag handle or strap.\n\nHand-finished leather in rich colours — a standout accent for any bag. This style is in stock, with delivery in 1–3 days."
    }
  },
  "luma-dachshund-leather-bag-charm": {
    "title": {
      "ru": "Bassotto — кожаный брелок для сумки",
      "ro": "Bassotto — breloc din piele",
      "en": "Bassotto — leather bag charm"
    },
    "description": {
      "ru": "Кожаный брелок Bassotto в форме таксы: вытянутый силуэт, контрастные лапки и мордочка, глаз из белой и чёрной кожи, строчка по контуру. Петля на спине крепится на ручку или ремешок сумки.\n\nИгривый акцент для повседневных и вечерних образов. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc Bassotto din piele în formă de câine teckel: siluetă alungită, labe și bot contrastante, ochi din piele albă și neagră, cusătură pe contur. Bucla de pe spate se prinde de mânerul sau cureaua genții.\n\nAccent jucăuș pentru ținute de zi și de seară. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Bassotto leather bag charm shaped like a dachshund: an elongated silhouette, contrasting paws and muzzle, an eye in white and black leather, and perimeter stitching. The loop on the back slips over a bag handle or strap.\n\nA playful accent for everyday and evening looks. This style is in stock, with delivery in 1–3 days."
    }
  },
  "luma-silk-bow-bag-charm": {
    "title": {
      "ru": "Fiocco — шёлковый брелок-бант",
      "ro": "Fiocco — breloc fundă din mătase",
      "en": "Fiocco — silk bow bag charm"
    },
    "description": {
      "ru": "Шёлковый брелок-бант на карабине: принтованная лента заплетена у основания и завязана в объёмный бант с заострёнными концами. Золотой карабин крепится к ручке, ремню или молнии сумки.\n\nЛёгкий акцент, который меняет характер базовой модели. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc fundă din mătase cu carabină: panglica imprimată este împletită la bază și legată într-o fundă voluminoasă cu vârfuri ascuțite. Carabina aurie se prinde de mâner, curea sau fermoarul genții.\n\nAccent ușor care schimbă caracterul unei genți de bază. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fiocco silk bow bag charm on a carabiner clip: a printed ribbon is braided at the base and tied into a full bow with pointed tails. The gold carabiner attaches to a bag handle, strap or zip pull.\n\nA light accent that changes the character of a basic bag. This style is in stock, with delivery in 1–3 days."
    }
  },
  "luma-dachshund-mix-bag-charm": {
    "title": {
      "ru": "Mix — брелок-набор для сумки",
      "ro": "Mix — set breloc pentru geantă",
      "en": "Mix — bag charm set"
    },
    "description": {
      "ru": "Брелок-набор на кольце: кожаная такса, миниатюрная «шоколадка», плетёный шнур с узлом, кожаные ремешки и пружинящий шнур с карабином. Несколько элементов на одном кольце — сразу заметный акцент на сумке.\n\nИгривый микс фактур и материалов. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Set de brelocuri pe inel: teckel din piele, mini „tabletă de ciocolată”, frânghie împletită cu nod, curele din piele și cablu spiralat cu carabină. Mai multe elemente pe un singur inel — accent imediat pe geantă.\n\nMix jucăuș de texturi și materiale. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Bag charm set on a split ring: a leather dachshund, a miniature chocolate bar, a braided cord with a knot, leather ties and a coiled cord with a carabiner. Several elements on one ring — an instant accent on any bag.\n\nA playful mix of textures and materials. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-abstract-geometric-silk-scarf": {
    "title": {
      "ru": "Serenella — шёлковый платок",
      "ro": "Serenella — eșarfă din mătase",
      "en": "Serenella — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с абстрактным геометрическим принтом: терракотовые и коралловые формы, графичные круги, контрастные линии и акценты тёмно-синего и чёрного. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract geometric: forme terracotta și coral, cercuri grafice, linii contrastante și accente bleumarin și negre. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an abstract geometric print: terracotta and coral shapes, graphic circles, contrasting lines and deep navy and black accents. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Абстрактный геометрический принт", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu abstract geometric", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Abstract geometric print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-lavender-wave-silk-scarf": {
    "title": {
      "ru": "Marcelline — шёлковый платок",
      "ro": "Marcelline — eșarfă din mătase",
      "en": "Marcelline — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с абстрактным принтом на лавандовом фоне: волнистые лаймовые штрихи с контрастными тёмными акцентами. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract pe fundal lavandă: tușe ondulate lime cu accente închise contrastante. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an abstract print on a lavender ground: wavy lime brushstrokes with contrasting dark accents. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Лавандовый принт с волнистыми штрихами", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu lavandă cu tușe ondulate", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Lavender print with wavy brushstrokes", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-pastel-tie-dye-silk-scarf": {
    "title": {
      "ru": "Celestina — шёлковый платок",
      "ro": "Celestina — eșarfă din mătase",
      "en": "Celestina — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с мягким принтом в технике тай-дай: нежные розовые, мятные и лавандовые пятна, плавно переходящие друг в друга на светлом фоне. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu tie-dye delicat: pete roz, mentă și lavandă care se estompează una în alta pe un fundal deschis. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a soft tie-dye print: gentle pink, mint and lavender patches blending into each other on a light ground. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Пастельный тай-дай принт", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu tie-dye pastel", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Pastel tie-dye print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-aqua-wave-silk-scarf": {
    "title": {
      "ru": "Marina — шёлковый платок",
      "ro": "Marina — eșarfă din mătase",
      "en": "Marina — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с абстрактным принтом на аквамариновом фоне: волнистые лаймовые штрихи с контрастными тёмными акцентами, напоминающие движение воды. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract pe fundal aqua: tușe ondulate lime cu accente închise contrastante, ca mișcarea apei. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an abstract print on an aqua ground: wavy lime brushstrokes with contrasting dark accents, like moving water. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Аквамариновый принт с волнистыми штрихами", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu aqua cu tușe ondulate", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Aqua print with wavy brushstrokes", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-slate-geometric-silk-scarf": {
    "title": {
      "ru": "Costanza — шёлковый платок",
      "ro": "Costanza — eșarfă din mătase",
      "en": "Costanza — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с графичным абстрактным принтом: сланцево-синие и серые блоки, контрастные белые полосы, коричневые акценты и полукруглые формы. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract grafic: blocuri albastru-ardoziu și gri, dungi albe contrastante, accente maro și forme semicirculare. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a graphic abstract print: slate-blue and grey blocks, contrasting white stripes, brown accents and semicircular shapes. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Графичный геометрический принт", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu geometric grafic", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Graphic geometric print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-mustard-wave-silk-scarf": {
    "title": {
      "ru": "Doriana — шёлковый платок",
      "ro": "Doriana — eșarfă din mătase",
      "en": "Doriana — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с абстрактным принтом на кремовом фоне: волнистые горчично-жёлтые линии с живописной фактурой. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract pe fundal crem: linii ondulate galben-muștar cu textură picturală. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an abstract print on a cream ground: wavy mustard-yellow lines with a painterly texture. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Горчичный принт с волнистыми линиями", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu muștar cu linii ondulate", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Mustard print with wavy lines", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-rainbow-pastel-silk-scarf": {
    "title": {
      "ru": "Iride — шёлковый платок",
      "ro": "Iride — eșarfă din mătase",
      "en": "Iride — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с акварельным радужным принтом: нежные розовые, жёлтые, голубые и лавандовые пятна, плавно переходящие друг в друга. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu acuarelă curcubeu: pete delicate roz, galben, albastru și lavandă care se estompează una în alta. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a watercolor rainbow print: soft pink, yellow, blue and lavender patches blending into each other. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Акварельный радужный принт", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu acuarelă curcubeu", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Watercolor rainbow print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-heart-leopard-silk-scarf": {
    "title": {
      "ru": "Amorette — шёлковый платок",
      "ro": "Amorette — eșarfă din mătase",
      "en": "Amorette — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с игривым принтом «сердечный леопард»: стилизованные сердца в чёрно-серых тонах на кремовом фоне. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu jucăuș „leopard inimi”: inimi stilizate în tonuri negru-gri pe fundal crem. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a playful heart-leopard print: stylised hearts in black and grey tones on a cream ground. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Принт «сердечный леопард»", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu leopard inimi", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Heart leopard print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-landscape-hills-silk-scarf": {
    "title": {
      "ru": "Colomba — шёлковый платок",
      "ro": "Colomba — eșarfă din mătase",
      "en": "Colomba — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с абстрактным пейзажным принтом: волнистые полосы зелёных, охристых и терракотовых оттенков, разделённые графичными чёрными контурами. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract peisagistic: benzi ondulate în nuanțe de verde, ocru și teracotă, separate de contururi negre grafice. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an abstract landscape print: wavy bands of green, ochre and terracotta tones separated by graphic black outlines. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Пейзажный принт с волнистыми линиями", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu peisagistic cu linii ondulate", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Landscape print with wavy lines", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-grey-stripe-silk-scarf": {
    "title": {
      "ru": "Nebbia — шёлковый платок",
      "ro": "Nebbia — eșarfă din mătase",
      "en": "Nebbia — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с фактурным принтом в полоску: мягкий серый тон с вертикальными полосами и лёгкой морщинистой фактурой. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu texturat în dungi: ton gri moale cu dungi verticale și o ușoară textură plisată. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a textured stripe print: soft grey tone with vertical stripes and a light crinkled texture. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Фактурный принт в полоску", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu texturat în dungi", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Textured stripe print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-mint-abstract-silk-scarf": {
    "title": {
      "ru": "Clarissa — шёлковый платок",
      "ro": "Clarissa — eșarfă din mătase",
      "en": "Clarissa — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с абстрактным принтом на мятном фоне: органические формы в тёмно-зелёных, чёрных и бежевых тонах, круговой мотив и фактурные акценты. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract pe fundal mentă: forme organice în tonuri verde închis, negru și bej, motiv circular și accente texturate. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an abstract print on a mint ground: organic shapes in dark green, black and beige tones, a circular motif and textured accents. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Абстрактный принт на мятном фоне", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu abstract pe fundal mentă", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Abstract print on mint ground", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-dusty-blue-abstract-silk-scarf": {
    "title": {
      "ru": "Azzurra — шёлковый платок",
      "ro": "Azzurra — eșarfă din mătase",
      "en": "Azzurra — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с художественным абстрактным принтом на пыльно-голубом фоне: оливково-зелёные формы, бежевые акценты, круговой мотив и тёмно-коричневые штрихи. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract artistic pe fundal albastru prăfuit: forme verde măsliniu, accente bej, motiv circular și tușe maro închis. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an artistic abstract print on a dusty blue ground: olive-green shapes, beige accents, a circular motif and deep brown brushstrokes. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Абстрактный принт на пыльно-голубом фоне", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu abstract pe fundal albastru prăfuit", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Abstract print on dusty blue ground", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-lavender-ink-silk-scarf": {
    "title": {
      "ru": "Lavinia — шёлковый платок",
      "ro": "Lavinia — eșarfă din mătase",
      "en": "Lavinia — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с акварельным принтом: мягкие лавандовые, фиолетовые и шалфейно-зелёные пятна с чёрными каплями чернил и фактурными штрихами. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu acuarelă: pete moi lavandă, violet și verde salvie cu picături negre de cerneală și tușe texturate. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a watercolor print: soft lavender, purple and sage-green patches with black ink drops and textured brushstrokes. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Акварельный принт с каплями чернил", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu acuarelă cu picături de cerneală", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Watercolor print with ink drops", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-colorful-brushstroke-silk-scarf": {
    "title": {
      "ru": "Artemisia — шёлковый платок",
      "ro": "Artemisia — eșarfă din mătase",
      "en": "Artemisia — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с живописным абстрактным принтом: смелые мазки тёмно-синего, жёлтого, лаймового и малинового на светлом фоне. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract pictural: tușe îndrăznețe bleumarin, galben, lime și magenta pe fundal deschis. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a painterly abstract print: bold strokes of deep navy, yellow, lime and magenta on a light ground. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Живописный принт с цветными мазками", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu pictural cu tușe colorate", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Painterly print with colorful brushstrokes", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-cherry-print-silk-scarf": {
    "title": {
      "ru": "Rosetta — шёлковый платок",
      "ro": "Rosetta — eșarfă din mătase",
      "en": "Rosetta — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с игривым принтом: пары красных вишен с зелёными листьями на пыльно-голубом фоне. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu jucăuș: perechi de cireșe roșii cu frunze verzi pe fundal albastru prăfuit. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a playful print: pairs of red cherries with green leaves on a dusty blue ground. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Принт с вишнями", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu cu cireșe", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Cherry print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-green-geometric-silk-scarf": {
    "title": {
      "ru": "Verdiana — шёлковый платок",
      "ro": "Verdiana — eșarfă din mătase",
      "en": "Verdiana — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с графичным абстрактным принтом на зелёном фоне: органические формы, полоски, круговые мотивы и контрастные тёмно-синие акценты. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract grafic pe fundal verde: forme organice, dungi, motive circulare și accente bleumarin contrastante. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a graphic abstract print on a green ground: organic shapes, stripes, circular motifs and contrasting deep navy accents. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Графичный геометрический принт", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu geometric grafic", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Graphic geometric print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-red-floral-silk-scarf": {
    "title": {
      "ru": "Fiorina — шёлковый платок",
      "ro": "Fiorina — eșarfă din mătase",
      "en": "Fiorina — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с художественным цветочным принтом: крупные розовые цветы с чёрными контурами и мелкие линейные мотивы на насыщенном красном фоне. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu floral artistic: flori mari roz cu contururi negre și motive liniare mici pe fundal roșu intens. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with an artistic floral print: large pink flowers with black outlines and small line motifs on a rich red ground. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Цветочный принт на красном фоне", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu floral pe fundal roșu", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Floral print on red ground", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-watercolor-circles-silk-scarf": {
    "title": {
      "ru": "Cerelia — шёлковый платок",
      "ro": "Cerelia — eșarfă din mătase",
      "en": "Cerelia — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с акварельным принтом: перекрывающиеся круги розовых, фиолетовых, зелёных и голубых оттенков на светлом фоне. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu acuarelă: cercuri suprapuse în nuanțe de roz, violet, verde și albastru pe fundal deschis. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a watercolor print: overlapping circles in pink, purple, green and blue tones on a light ground. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Акварельный принт с кругами", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu acuarelă cu cercuri", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Watercolor print with circles", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-blue-multicolor-brushstroke-silk-scarf": {
    "title": {
      "ru": "Teodora — шёлковый платок",
      "ro": "Teodora — eșarfă din mătase",
      "en": "Teodora — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с живописным абстрактным принтом на синем фоне: многоцветные мазки жёлтого, зелёного, розового и тёмно-синего с фактурной tie-dye отделкой. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu abstract pictural pe fundal albastru: tușe multicolore galben, verde, roz și bleumarin închis cu finisaj tie-dye texturat. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a painterly abstract print on a blue ground: multicolor strokes of yellow, green, pink and deep navy with a textured tie-dye finish. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Многоцветные мазки на синем фоне", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Tușe multicolore pe fundal albastru", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Multicolor brushstrokes on blue ground", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-whale-print-silk-scarf": {
    "title": {
      "ru": "Delphina — шёлковый платок",
      "ro": "Delphina — eșarfă din mătase",
      "en": "Delphina — silk scarf"
    },
    "description": {
      "ru": "Квадратный шёлковый платок с игривым принтом: стилизованные киты в синих и голубых тонах на нейтральном таupe-фоне. Лёгкая ткань с мягким блеском держит форму и красиво драпируется — на шее, на сумке или как акцент на плечах.\n\nТонкая ручная отделка по краю делает платок заметным аксессуаром сезона.",
      "ro": "Eșarfă pătrată din mătase cu imprimeu jucăuș: balene stilizate în tonuri albastre și cyan pe fundal taupe neutru. Țesătura ușoară, cu luciu discret, își păstrează forma și cade frumos — la gât, pe geantă sau pe umeri.\n\nFinisarea fină pe margine face din această eșarfă un accesoriu remarcabil al sezonului.",
      "en": "Square silk scarf with a playful print: stylised whales in blue and cyan tones on a neutral taupe ground. The lightweight fabric has a soft sheen, holds its shape and drapes beautifully — around the neck, on a bag or over the shoulders.\n\nFine edge finishing makes this scarf a standout seasonal accessory."
    },
    "highlights": {
      "ru": ["Чистый шёлк", "Принт с китами", "Квадратный формат 90 × 90 см", "Ручная отделка по краю"],
      "ro": ["Mătase pură", "Imprimeu cu balene", "Format pătrat 90 × 90 cm", "Finisare manuală pe margine"],
      "en": ["Pure silk", "Whale print", "Square format 90 × 90 cm", "Hand-finished edge"]
    }
  },
  "womens-metallic-leather-bifold-cardholder-fuchsia": {
    "title": {
      "ru": "Rosalia — картхолдер",
      "ro": "Rosalia — portcard",
      "en": "Rosalia — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи с металлическим фуксиевым покрытием: яркий блеск и выразительная фактура без лишнего объёма. Складная конструкция раскрывается на четыре вертикальных слота для карт — по два с каждой стороны.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри подчёркивают итальянское происхождение. Помещается в карман сумки или куртки и хорошо сочетается с вечерними образами.",
      "ro": "Portcard compact din piele granulată cu finisaj metalic fuxia: strălucire intensă și textură expresivă, fără volum inutil. Construcție pliabilă cu patru sloturi verticale pentru carduri — câte două pe fiecare parte.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior confirmă originea italiană. Se potrivește în buzunarul genții sau al jachetei și completează ținute de seară.",
      "en": "Compact card holder in grained leather with a metallic fuchsia finish: vivid shine and expressive texture without extra bulk. The bifold design opens to four vertical card slots — two on each side.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside underline the Italian origin. Fits in a bag or jacket pocket and pairs well with evening looks."
    },
    "highlights": {
      "ru": ["Металлическая кожа", "Складная конструкция", "4 слота для карт", "Made in Italy"],
      "ro": ["Piele metalizată", "Construcție pliabilă", "4 sloturi pentru carduri", "Made in Italy"],
      "en": ["Metallic leather", "Bifold design", "4 card slots", "Made in Italy"]
    }
  },
  "womens-metallic-leather-bifold-cardholder-electric-blue": {
    "title": {
      "ru": "Azzurina — картхолдер",
      "ro": "Azzurina — portcard",
      "en": "Azzurina — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи с металлическим электрик-синим покрытием: насыщенный оттенок и зеркальный блеск на каждом изгибе. Складная конструкция раскрывается на четыре вертикальных слота для карт — по два с каждой стороны.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри подчёркивают итальянское происхождение. Помещается в карман сумки или куртки и добавляет акцент даже к спокойному повседневному образу.",
      "ro": "Portcard compact din piele granulată cu finisaj metalic albastru electric: nuanță intensă și luciu oglindit la fiecare pli. Construcție pliabilă cu patru sloturi verticale pentru carduri — câte două pe fiecare parte.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior confirmă originea italiană. Se potrivește în buzunarul genții sau al jachetei și adaugă un accent chiar și ținutelor de zi cu zi.",
      "en": "Compact card holder in grained leather with a metallic electric-blue finish: rich colour and mirror-like shine at every fold. The bifold design opens to four vertical card slots — two on each side.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside underline the Italian origin. Fits in a bag or jacket pocket and adds a pop even to understated everyday outfits."
    },
    "highlights": {
      "ru": ["Металлическая кожа", "Складная конструкция", "4 слота для карт", "Made in Italy"],
      "ro": ["Piele metalizată", "Construcție pliabilă", "4 sloturi pentru carduri", "Made in Italy"],
      "en": ["Metallic leather", "Bifold design", "4 card slots", "Made in Italy"]
    }
  },
  "womens-metallic-leather-bifold-cardholder-teal": {
    "title": {
      "ru": "Turchese — картхолдер",
      "ro": "Turchese — portcard",
      "en": "Turchese — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи с металлическим бирюзовым покрытием: свежий оттенок и мягкий перламутровый блеск на рельефе зерна. Складная конструкция раскрывается на четыре вертикальных слота для карт — по два с каждой стороны.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри подчёркивают итальянское происхождение. Помещается в карман сумки или куртки и хорошо смотрится как самостоятельный акцент.",
      "ro": "Portcard compact din piele granulată cu finisaj metalic turcoaz: nuanță proaspătă și luciu perlat pe reliefurile grain-ului. Construcție pliabilă cu patru sloturi verticale pentru carduri — câte două pe fiecare parte.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior confirmă originea italiană. Se potrivește în buzunarul genții sau al jachetei și funcționează ca accent de sine stătător.",
      "en": "Compact card holder in grained leather with a metallic teal finish: a fresh hue and soft pearlescent shine across the grain. The bifold design opens to four vertical card slots — two on each side.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside underline the Italian origin. Fits in a bag or jacket pocket and works as a stand-alone accent piece."
    },
    "highlights": {
      "ru": ["Металлическая кожа", "Складная конструкция", "4 слота для карт", "Made in Italy"],
      "ro": ["Piele metalizată", "Construcție pliabilă", "4 sloturi pentru carduri", "Made in Italy"],
      "en": ["Metallic leather", "Bifold design", "4 card slots", "Made in Italy"]
    }
  },
  "womens-pebbled-leather-bifold-cardholder-white": {
    "title": {
      "ru": "Bianca — картхолдер",
      "ro": "Bianca — portcard",
      "en": "Bianca — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из белой зернистой кожи: чистый минималистичный силуэт без лишних деталей. Складная конструкция раскрывается на несколько вертикальных слотов для карт с обеих сторон.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри подчёркивают итальянское происхождение. Лаконичный аксессуар для повседневного кармана или сумки.",
      "ro": "Portcard compact din piele granulată albă: siluetă minimalistă, curată, fără detalii inutile. Construcție pliabilă cu mai multe sloturi verticale pentru carduri pe ambele părți.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior confirmă originea italiană. Accesoriu discret pentru buzunarul zilnic sau geantă.",
      "en": "Compact card holder in white pebbled leather: a clean, minimalist silhouette with no extra details. The bifold design opens to several vertical card slots on both sides.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside underline the Italian origin. A understated everyday pocket or bag essential."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Складная конструкция", "Отделения для карт с обеих сторон", "Made in Italy"],
      "ro": ["Piele granulată", "Construcție pliabilă", "Compartimente pentru carduri pe ambele părți", "Made in Italy"],
      "en": ["Pebbled leather", "Bifold design", "Card slots on both sides", "Made in Italy"]
    }
  },
  "womens-pebbled-leather-bifold-cardholder-chartreuse": {
    "title": {
      "ru": "Limona — картхолдер",
      "ro": "Limona — portcard",
      "en": "Limona — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи насыщенного лаймово-шартрезового оттенка: яркий акцент без лишнего объёма. Складная конструкция с отделениями для карт с обеих сторон.\n\nТональная строчка по контуру, аккуратная окраска торцов и тиснение «Genuine Leather / Made in Italy» внутри. Смелый цвет для тех, кто любит заметные детали в повседневном образе.",
      "ro": "Portcard compact din piele granulată chartreuse lime: accent intens fără volum inutil. Construcție pliabilă cu compartimente pentru carduri pe ambele părți.\n\nCusătură tonală pe contur, margini fin finisate și imprimare „Genuine Leather / Made in Italy” în interior. Culoare îndrăzneață pentru cei care apreciază detaliile vizibile în ținutele de zi cu zi.",
      "en": "Compact card holder in vivid lime-chartreuse pebbled leather: a bold accent without extra bulk. The bifold design with card compartments on both sides.\n\nTonal edge stitching, clean edge paint and “Genuine Leather / Made in Italy” stamping inside. A confident colour for anyone who likes standout details in everyday outfits."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Складная конструкция", "Отделения для карт с обеих сторон", "Made in Italy"],
      "ro": ["Piele granulată", "Construcție pliabilă", "Compartimente pentru carduri pe ambele părți", "Made in Italy"],
      "en": ["Pebbled leather", "Bifold design", "Card slots on both sides", "Made in Italy"]
    }
  },
  "womens-metallic-leather-bifold-cardholder-emerald": {
    "title": {
      "ru": "Smeralda — картхолдер",
      "ro": "Smeralda — portcard",
      "en": "Smeralda — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи с металлическим изумрудным покрытием: насыщенный зелёный оттенок и зеркальный блеск на каждом изгибе. Складная конструкция раскрывается на несколько слотов для карт с обеих сторон.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри подчёркивают итальянское происхождение.",
      "ro": "Portcard compact din piele granulată cu finisaj metalic smarald: nuanță verde intensă și luciu oglindit la fiecare pli. Construcție pliabilă cu mai multe sloturi pentru carduri pe ambele părți.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior confirmă originea italiană.",
      "en": "Compact card holder in grained leather with a metallic emerald finish: rich green colour and mirror-like shine at every fold. The bifold design opens to several card slots on both sides.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside underline the Italian origin."
    },
    "highlights": {
      "ru": ["Металлическая кожа", "Складная конструкция", "Отделения для карт с обеих сторон", "Made in Italy"],
      "ro": ["Piele metalizată", "Construcție pliabilă", "Compartimente pentru carduri pe ambele părți", "Made in Italy"],
      "en": ["Metallic leather", "Bifold design", "Card slots on both sides", "Made in Italy"]
    }
  },
  "womens-pebbled-leather-bifold-cardholder-dark-brown": {
    "title": {
      "ru": "Bruna — картхолдер",
      "ro": "Bruna — portcard",
      "en": "Bruna — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи глубокого шоколадно-коричневого оттенка: насыщенный тон и выразительная фактура зерна. Складная конструкция с отделениями для карт с обеих сторон — по три слота на каждой панели.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри. Универсальный тёмный аксессуар на каждый день.",
      "ro": "Portcard compact din piele granulată maro închis, tip ciocolată: nuanță intensă și textură grain expresivă. Construcție pliabilă cu compartimente pentru carduri pe ambele părți — câte trei sloturi pe fiecare panou.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior. Accesoriu întunecat, versatil, pentru fiecare zi.",
      "en": "Compact card holder in deep chocolate-brown pebbled leather: a rich hue and expressive grain texture. The bifold design with card compartments on both sides — three slots on each panel.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside. A versatile dark everyday accessory."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Складная конструкция", "Отделения для карт с обеих сторон", "Made in Italy"],
      "ro": ["Piele granulată", "Construcție pliabilă", "Compartimente pentru carduri pe ambele părți", "Made in Italy"],
      "en": ["Pebbled leather", "Bifold design", "Card slots on both sides", "Made in Italy"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-sage": {
    "title": {
      "ru": "Olivetta — картхолдер",
      "ro": "Olivetta — portcard",
      "en": "Olivetta — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи приглушённого оливково-шалфейного оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Удобный формат, когда нужны 4–6 карт под рукой и не хочется носить полноразмерный кошелёк.",
      "ro": "Portcard compact din piele granulată verde măsliniu-salvie: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Format practic când ai nevoie de 4–6 carduri la îndemână, fără un portofel complet.",
      "en": "Compact card holder in muted olive-sage pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A practical format when you need 4–6 cards at hand without a full-size wallet."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele granulată", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Pebbled leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-wallet-sage": {
    "title": {
      "ru": "Salvia — кошелёк",
      "ro": "Salvia — portofel",
      "en": "Salvia — wallet"
    },
    "description": {
      "ru": "Компактный кошелёк из зернистой кожи приглушённого оливково-шалфейного оттенка: вертикальный формат, кожаный ремешок с кнопкой и продуманная внутренняя организация. Внутри — отделение на молнии, слоты для карт, прозрачные окна для документов и защита RFID.\n\nТональная строчка по контуру и маркировка RFID на подкладке. Спокойный природный оттенок для повседневного кармана.",
      "ro": "Portofel compact din piele granulată verde măsliniu-salvie: format vertical, curea din piele cu capse și organizare interioară atentă. În interior — compartiment cu fermoar, sloturi pentru carduri, ferestre transparente pentru documente și protecție RFID.\n\nCusătură tonală pe contur și marcaj RFID pe căptușeală. Nuanță naturală, calmă, pentru buzunarul de zi cu zi.",
      "en": "Compact wallet in muted olive-sage pebbled leather: a vertical format, leather snap strap and a well-organised interior. Inside — a zip compartment, card slots, clear document windows and RFID protection.\n\nTonal edge stitching and RFID marking on the lining. A calm natural hue for an everyday pocket."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Ремешок с кнопкой", "Отделение на молнии", "Защита RFID"],
      "ro": ["Piele granulată", "Curea cu capse", "Compartiment cu fermoar", "Protecție RFID"],
      "en": ["Pebbled leather", "Snap strap", "Zip compartment", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-grey": {
    "title": {
      "ru": "Cenere — картхолдер",
      "ro": "Cenere — portcard",
      "en": "Cenere — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи светло-серого оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — шесть слотов для карт с обеих сторон и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Спокойный нейтральный тон для повседневного кармана.",
      "ro": "Portcard compact din piele granulată gri deschis: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — șase sloturi pentru carduri pe ambele părți și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Ton neutru, calm, pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in light grey pebbled leather: vertical slots on the front and a leather snap strap that secures your cards. Inside — six card slots on both sides and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A calm neutral tone for an everyday pocket."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele granulată", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Pebbled leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-red": {
    "title": {
      "ru": "Rubina — картхолдер",
      "ro": "Rubina — portcard",
      "en": "Rubina — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи насыщенного красного оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Яркий акцентный оттенок для повседневного кармана.",
      "ro": "Portcard compact din piele granulată roșu intens: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Nuanță accent, vie, pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in rich red pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A vivid accent hue for an everyday pocket."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele granulată", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Pebbled leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-cream": {
    "title": {
      "ru": "Avorio — картхолдер",
      "ro": "Avorio — portcard",
      "en": "Avorio — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи нежного кремово-бежевого оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Спокойный нейтральный тон для повседневного кармана.",
      "ro": "Portcard compact din piele granulată bej-crem delicat: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Ton neutru, calm, pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in soft cream-beige pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A calm neutral tone for an everyday pocket."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele granulată", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Pebbled leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-black": {
    "title": {
      "ru": "Notte — картхолдер",
      "ro": "Notte — portcard",
      "en": "Notte — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой чёрной кожи: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Классический чёрный аксессуар для повседневного кармана.",
      "ro": "Portcard compact din piele granulată neagră: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Accesoriu clasic negru pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in black pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A classic black accessory for an everyday pocket."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele granulată", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Pebbled leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-wallet-red": {
    "title": {
      "ru": "Cremisi — кошелёк",
      "ro": "Cremisi — portofel",
      "en": "Cremisi — wallet"
    },
    "description": {
      "ru": "Компактный кошелёк из зернистой кожи насыщенного красного оттенка: вертикальный формат, кожаный ремешок с кнопкой и продуманная внутренняя организация. Внутри — отделение на молнии, слоты для карт, прозрачные окна для документов и защита RFID.\n\nТональная строчка по контуру и маркировка RFID на подкладке. Яркий акцентный оттенок для повседневного кармана.",
      "ro": "Portofel compact din piele granulată roșu intens: format vertical, curea din piele cu capse și organizare interioară atentă. În interior — compartiment cu fermoar, sloturi pentru carduri, ferestre transparente pentru documente și protecție RFID.\n\nCusătură tonală pe contur și marcaj RFID pe căptușeală. Nuanță accent, vie, pentru buzunarul de zi cu zi.",
      "en": "Compact wallet in rich red pebbled leather: a vertical format, leather snap strap and a well-organised interior. Inside — a zip compartment, card slots, clear document windows and RFID protection.\n\nTonal edge stitching and RFID marking on the lining. A vivid accent hue for an everyday pocket."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Ремешок с кнопкой", "Отделение на молнии", "Защита RFID"],
      "ro": ["Piele granulată", "Curea cu capse", "Compartiment cu fermoar", "Protecție RFID"],
      "en": ["Pebbled leather", "Snap strap", "Zip compartment", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-beige": {
    "title": {
      "ru": "Perla — кошелёк",
      "ro": "Perla — portofel",
      "en": "Perla — wallet"
    },
    "description": {
      "ru": "Компактный кошелёк из зернистой кожи нежного бежевого оттенка: вертикальный формат, кожаный ремешок с кнопкой и продуманная внутренняя организация. Внутри — отделение на молнии, слоты для карт и прозрачные окна для документов, а также защита RFID.\n\nТональная строчка по контуру и маркировка RFID на подкладке. Спокойный нейтральный цвет, который легко сочетается с сумками любых оттенков.",
      "ro": "Portofel compact din piele granulată bej delicat: format vertical, curea din piele cu capse și organizare interioară atentă. În interior — compartiment cu fermoar, sloturi pentru carduri și ferestre transparente pentru documente, plus protecție RFID.\n\nCusătură tonală pe contur și marcaj RFID pe căptușeală. Culoare neutră, calmă, ușor de asortat cu genți în orice nuanță.",
      "en": "Compact wallet in soft beige pebbled leather: a vertical format, leather snap strap and a well-organised interior. Inside — a zip compartment, card slots and clear document windows, plus RFID protection.\n\nTonal edge stitching and RFID marking on the lining. A calm neutral colour that pairs easily with bags in any shade."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Ремешок с кнопкой", "Отделение на молнии", "Защита RFID"],
      "ro": ["Piele granulată", "Curea cu capse", "Compartiment cu fermoar", "Protecție RFID"],
      "en": ["Pebbled leather", "Snap strap", "Zip compartment", "RFID protection"]
    }
  },
  "womens-pebbled-leather-trifold-rfid-cardholder-black": {
    "title": {
      "ru": "Nera — картхолдер",
      "ro": "Nera — portcard",
      "en": "Nera — card holder"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой чёрной кожи: трёхслойная складная конструкция с клапаном и застёжками на кнопках. Внутри — девять слотов для карт и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Классический чёрный аксессуар, который подходит к любому образу.",
      "ro": "Portcard compact din piele granulată neagră: construcție pliabilă cu trei panouri, clapă și capse. În interior — nouă sloturi pentru carduri și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Accesoriu clasic negru, potrivit oricărei ținute.",
      "en": "Compact card holder in black pebbled leather: a tri-fold design with a flap and snap closures. Inside — nine card slots and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A classic black accessory that suits any outfit."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Трёхслойная конструкция", "Застёжки на кнопках", "Защита RFID"],
      "ro": ["Piele granulată", "Construcție cu trei panouri", "Capse", "Protecție RFID"],
      "en": ["Pebbled leather", "Tri-fold design", "Snap closures", "RFID protection"]
    }
  },
  "womens-pebbled-leather-heart-shaped-handbag": {
    "title": {
      "ru": "Rosalba — сумка в форме сердца",
      "ro": "Rosalba — geantă în formă de inimă",
      "en": "Rosalba — heart-shaped handbag"
    },
    "description": {
      "ru": "Сумка в форме сердца из зернистой кожи — узнаваемый силуэт, который добавляет характер даже к простому образу.\n\nЗолотая молния идёт по верхней линии сердца, а съёмный ремень позволяет носить модель в руке или через плечо. Внутри — красная подкладка и аккордеонные перегородки.",
      "ro": "Geantă în formă de inimă din piele granulată — o siluetă ușor de recunoscut, care adaugă personalitate chiar și unei ținute simple.\n\nFermoarul auriu urmează linia superioară a inimii, iar cureaua detașabilă permite purtarea în mână sau pe umăr. Interiorul are căptușeală roșie și compartimente tip acordeon.",
      "en": "A heart-shaped bag in pebbled leather — a distinctive silhouette that adds character even to a simple outfit.\n\nA gold zip follows the top curve of the heart, and a detachable strap lets you carry it by hand or crossbody. Inside — a red leather lining with accordion dividers."
    },
    "highlights": {
      "ru": ["Зернистая кожа", "Силуэт в форме сердца", "Короткая ручка и съёмный ремень", "Застёжка на молнии с золотой фурнитурой"],
      "ro": ["Piele granulată", "Siluetă în formă de inimă", "Mâner scurt și curea detașabilă", "Fermoar cu accesorii aurii"],
      "en": ["Pebbled leather", "Heart-shaped silhouette", "Short handle and detachable strap", "Zip closure with gold hardware"]
    }
  }
};

function resolveProductSlug(productOrTitle: Product | string | undefined): string | undefined {
  return typeof productOrTitle === "object" ? productOrTitle.slug : undefined;
}

function resolveProductTitle(productOrTitle: Product | string | undefined): string | undefined {
  return typeof productOrTitle === "object" ? productOrTitle.title : productOrTitle;
}

function getProductCopy(productOrTitle: Product | string | undefined): ProductLocalizedCopy | undefined {
  const slug = resolveProductSlug(productOrTitle);
  return slug ? productCopyBySlug[slug] : undefined;
}

export function localizeProductTitle(
  productOrTitle: Product | string | undefined,
  locale: Locale = defaultLocale,
): string {
  const title = resolveProductTitle(productOrTitle);
  if (!title) return "";
  const copy = getProductCopy(productOrTitle)?.title;
  if (copy?.[locale]) return copy[locale]!;
  if (locale === "ru") return title;
  return productTitles[title]?.[locale] ?? title;
}

export function localizeStaticText(value: string | undefined, locale: Locale = defaultLocale): string {
  if (!value) return "";
  if (locale === "ru") return value;

  const mapped =
    lookupSpecTranslation(value, locale, [text, specLabels, specValues, colors]) ??
    localizeMeasurement(value, locale);

  return mapped ?? value;
}

export function localizeColorName(color: ProductColor | string | undefined, locale: Locale = defaultLocale): string {
  const value = typeof color === "string" ? color : color?.name;
  if (!value) return "";
  return colors[value]?.[locale] ?? value;
}

export function localizeProductDescription(product: Product, locale: Locale = defaultLocale): string {
  const localized = productCopyBySlug[product.slug]?.description?.[locale];
  if (localized) return localized;
  if (locale === "ru" || !/[А-Яа-яЁё]/.test(product.description)) {
    return product.description;
  }
  const material = localizeStaticText(product.material, locale);
  if (locale === "ro") {
    return `${localizeProductTitle(product, locale)} este o piesă atent selectată pentru garderoba de zi cu zi, cu accent pe forma elegantă, materiale de calitate și detalii practice.

Modelul este realizat din ${material} și este potrivit pentru ținute casual, de afaceri sau de seară. După plasarea comenzii, echipa SÓRA confirmă disponibilitatea, culoarea aleasă și termenul de livrare.`;
  }
  return `${localizeProductTitle(product, locale)} is a carefully selected piece for an everyday wardrobe, focused on an elegant shape, quality materials and practical details.

The model is made from ${material} and works well for casual, business or evening looks. After you place an order, the SÓRA team confirms availability, selected color and delivery timing.`;
}

export function localizeProductHighlights(product: Product, locale: Locale = defaultLocale): string[] {
  const localized = productCopyBySlug[product.slug]?.highlights?.[locale];
  if (localized?.length) return localized;
  return (product.highlights ?? []).map((item) => localizeStaticText(item, locale));
}

export function localizeProductSpec(
  spec: { label: string; value: string },
  locale: Locale = defaultLocale,
): { label: string; value: string } {
  return {
    label: localizeStaticText(spec.label, locale),
    value: localizeStaticText(spec.value, locale),
  };
}

const hiddenProductSpecLabels = new Set([
  "Пол",
  "Плетение",
  "Конструкция",
  "Фактура",
  "Сезон",
]);

export function getVisibleProductSpecs(
  specs: { label: string; value: string }[] | undefined,
): { label: string; value: string }[] {
  return (specs ?? []).filter((spec) => !hiddenProductSpecLabels.has(spec.label));
}

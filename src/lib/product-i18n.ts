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
 * Product display titles are the invented name only (e.g. "Amelie").
 * Descriptive type/shape text lives in descriptions, not in title.
 */
const productTitles: Record<string, Partial<Record<Locale, string>>> = {
  "Mirelle": { ro: "Mirelle", en: "Mirelle" },
  "Adriana": { ro: "Adriana", en: "Adriana" },
  "Fiorella": { ro: "Fiorella", en: "Fiorella" },
  "Ondine": { ro: "Ondine", en: "Ondine" },
  "Marbella": { ro: "Marbella", en: "Marbella" },
  "Positano": { ro: "Positano", en: "Positano" },
  "Capri": { ro: "Capri", en: "Capri" },
  "Ortigia": { ro: "Ortigia", en: "Ortigia" },
  "Perla": { ro: "Perla", en: "Perla" },
  "Talia": { ro: "Talia", en: "Talia" },
  "Vittoria": { ro: "Vittoria", en: "Vittoria" },
  "Romina": { ro: "Romina", en: "Romina" },
  "Amara": { ro: "Amara", en: "Amara" },
  "Liora": { ro: "Liora", en: "Liora" },
  "Serena": { ro: "Serena", en: "Serena" },
  "Camelia": { ro: "Camelia", en: "Camelia" },
  "Selene": { ro: "Selene", en: "Selene" },
  "Faustine": { ro: "Faustine", en: "Faustine" },
  "Marisol": { ro: "Marisol", en: "Marisol" },
  "Provence": { ro: "Provence", en: "Provence" },
  "Taormina": { ro: "Taormina", en: "Taormina" },
  "Cuore": { ro: "Cuore", en: "Cuore" },
  "Ravello": { ro: "Ravello", en: "Ravello" },
  "Elodie": { ro: "Elodie", en: "Elodie" },
  "Corinne": { ro: "Corinne", en: "Corinne" },
  "Luna": { ro: "Luna", en: "Luna" },
  "Valentina": { ro: "Valentina", en: "Valentina" },
  "Coralie": { ro: "Coralie", en: "Coralie" },
  "Beatrice": { ro: "Beatrice", en: "Beatrice" },
  "Milena": { ro: "Milena", en: "Milena" },
  "Adele": { ro: "Adele", en: "Adele" },
  "Genevieve": { ro: "Genevieve", en: "Genevieve" },
  "Capucine": { ro: "Capucine", en: "Capucine" },
  "Violaine": { ro: "Violaine", en: "Violaine" },
  "Claudine": { ro: "Claudine", en: "Claudine" },
  "Fabienne": { ro: "Fabienne", en: "Fabienne" },
  "Nerina": { ro: "Nerina", en: "Nerina" },
  "Solenne": { ro: "Solenne", en: "Solenne" },
  "Ottavia": { ro: "Ottavia", en: "Ottavia" },
  "Anouk": { ro: "Anouk", en: "Anouk" },
  "Sabina": { ro: "Sabina", en: "Sabina" },
  "Iris": { ro: "Iris", en: "Iris" },
  "Cosima": { ro: "Cosima", en: "Cosima" },
  "Delphine": { ro: "Delphine", en: "Delphine" },
  "Estelle": { ro: "Estelle", en: "Estelle" },
  "Renata": { ro: "Renata", en: "Renata" },
  "Flora": { ro: "Flora", en: "Flora" },
  "Verona": { ro: "Verona", en: "Verona" },
  "Alba": { ro: "Alba", en: "Alba" },
  "Tosca": { ro: "Tosca", en: "Tosca" },
  "Bianca": { ro: "Bianca", en: "Bianca" },
  "Camille": { ro: "Camille", en: "Camille" },
  "Marcella": { ro: "Marcella", en: "Marcella" },
  "Isadora": { ro: "Isadora", en: "Isadora" },
  "Chiara": { ro: "Chiara", en: "Chiara" },
  "Alessia": { ro: "Alessia", en: "Alessia" },
  "Martina": { ro: "Martina", en: "Martina" },
  "Simona": { ro: "Simona", en: "Simona" },
  "Elise": { ro: "Elise", en: "Elise" },
  "Noemi": { ro: "Noemi", en: "Noemi" },
  "Ilaria": { ro: "Ilaria", en: "Ilaria" },
  "Silvana": { ro: "Silvana", en: "Silvana" },
  "Antonella": { ro: "Antonella", en: "Antonella" },
  "Graziella": { ro: "Graziella", en: "Graziella" },
  "Marguerite": { ro: "Marguerite", en: "Marguerite" },
  "Emmeline": { ro: "Emmeline", en: "Emmeline" },
  "Josephine": { ro: "Josephine", en: "Josephine" },
  "Seraphine": { ro: "Seraphine", en: "Seraphine" },
  "Cortina": { ro: "Cortina", en: "Cortina" },
  "Volterra": { ro: "Volterra", en: "Volterra" },
  "Ischia": { ro: "Ischia", en: "Ischia" },
  "Procida": { ro: "Procida", en: "Procida" },
  "Sperlonga": { ro: "Sperlonga", en: "Sperlonga" },
  "Violette": { ro: "Violette", en: "Violette" },
  "Avignon": { ro: "Avignon", en: "Avignon" },
  "Honfleur": { ro: "Honfleur", en: "Honfleur" },
  "Deauville": { ro: "Deauville", en: "Deauville" },
  "Annecy": { ro: "Annecy", en: "Annecy" },
  "Giverny": { ro: "Giverny", en: "Giverny" },
  "Biarritz": { ro: "Biarritz", en: "Biarritz" },
  "Trieste": { ro: "Trieste", en: "Trieste" },
  "Sienna": { ro: "Sienna", en: "Sienna" },
  "Colette": { ro: "Colette", en: "Colette" },
  "Lucerne": { ro: "Lucerne", en: "Lucerne" },
  "Amelie": { ro: "Amelie", en: "Amelie" },
  "Claire": { ro: "Claire", en: "Claire" },
  "Paloma": { ro: "Paloma", en: "Paloma" },
  "Leonie": { ro: "Leonie", en: "Leonie" },
  "Giuliana": { ro: "Giuliana", en: "Giuliana" },
  "Giada": { ro: "Giada", en: "Giada" },
  "Filippa": { ro: "Filippa", en: "Filippa" },
  "Luciana": { ro: "Luciana", en: "Luciana" },
  "Ines": { ro: "Ines", en: "Ines" },
  "Paola": { ro: "Paola", en: "Paola" },
  "Greta": { ro: "Greta", en: "Greta" },
  "Georgina": { ro: "Georgina", en: "Georgina" },
  "Francesca": { ro: "Francesca", en: "Francesca" },
  "Federica": { ro: "Federica", en: "Federica" },
  "Fabiana": { ro: "Fabiana", en: "Fabiana" },
  "Giulietta": { ro: "Giulietta", en: "Giulietta" },
  "Seraphina": { ro: "Seraphina", en: "Seraphina" },
  "Flavia": { ro: "Flavia", en: "Flavia" },
  "Nerissa": { ro: "Nerissa", en: "Nerissa" },
  "Fabrizia": { ro: "Fabrizia", en: "Fabrizia" },
  "Lucrezia": { ro: "Lucrezia", en: "Lucrezia" },
  "Ginevra": { ro: "Ginevra", en: "Ginevra" },
  "Allegra": { ro: "Allegra", en: "Allegra" },
  "Bettina": { ro: "Bettina", en: "Bettina" },
  "Perrine": { ro: "Perrine", en: "Perrine" },
  "Anaelle": { ro: "Anaelle", en: "Anaelle" },
  "Marcelle": { ro: "Marcelle", en: "Marcelle" },
  "Ninette": { ro: "Ninette", en: "Ninette" },
  "Thea": { ro: "Thea", en: "Thea" },
  "Colline": { ro: "Colline", en: "Colline" },
  "Elara": { ro: "Elara", en: "Elara" },
  "Maelle": { ro: "Maelle", en: "Maelle" },
  "Livia": { ro: "Livia", en: "Livia" },
  "Cassia": { ro: "Cassia", en: "Cassia" },
  "Fiamma": { ro: "Fiamma", en: "Fiamma" },
  "Gioia": { ro: "Gioia", en: "Gioia" },
  "Giorgia": { ro: "Giorgia", en: "Giorgia" },
  "Aurea": { ro: "Aurea", en: "Aurea" },
  "Halle": { ro: "Halle", en: "Halle" },
  "Romilly": { ro: "Romilly", en: "Romilly" },
  "Vespera": { ro: "Vespera", en: "Vespera" },
  "Marielle": { ro: "Marielle", en: "Marielle" },
  "Fiorenza": { ro: "Fiorenza", en: "Fiorenza" },
  "Loretta": { ro: "Loretta", en: "Loretta" },
  "Cressida": { ro: "Cressida", en: "Cressida" },
  "Palmira": { ro: "Palmira", en: "Palmira" },
  "Rosalba": { ro: "Rosalba", en: "Rosalba" },
  "Margot": { ro: "Margot", en: "Margot" },
  "Amabel": { ro: "Amabel", en: "Amabel" },
  "Ottilie": { ro: "Ottilie", en: "Ottilie" },
  "Perlette": { ro: "Perlette", en: "Perlette" },
  "Rosalind": { ro: "Rosalind", en: "Rosalind" },
  "Odile": { ro: "Odile", en: "Odile" },
  "Solaine": { ro: "Solaine", en: "Solaine" },
  "Adalina": { ro: "Adalina", en: "Adalina" },
  "Elowen": { ro: "Elowen", en: "Elowen" },
  "Fantine": { ro: "Fantine", en: "Fantine" },
  "Garance": { ro: "Garance", en: "Garance" },
  "Herminie": { ro: "Herminie", en: "Herminie" },
  "Isolde": { ro: "Isolde", en: "Isolde" },
  "Jacinta": { ro: "Jacinta", en: "Jacinta" },
  "Kalina": { ro: "Kalina", en: "Kalina" },
  "Lisette": { ro: "Lisette", en: "Lisette" },
  "Manon": { ro: "Manon", en: "Manon" },
  "Noriane": { ro: "Noriane", en: "Noriane" },
  "Oriane": { ro: "Oriane", en: "Oriane" },
  "Celia": { ro: "Celia", en: "Celia" },
  "Pernelle": { ro: "Pernelle", en: "Pernelle" },
  "Aveline": { ro: "Aveline", en: "Aveline" },
  "Cendrine": { ro: "Cendrine", en: "Cendrine" },
  "Dorine": { ro: "Dorine", en: "Dorine" },
  "Gwenaelle": { ro: "Gwenaelle", en: "Gwenaelle" },
  "Helena": { ro: "Helena", en: "Helena" },
  "Celeste": { ro: "Celeste", en: "Celeste" },
  "Vivienne": { ro: "Vivienne", en: "Vivienne" },
  "Nadine": { ro: "Nadine", en: "Nadine" },
  "Suzette": { ro: "Suzette", en: "Suzette" },
  "Rosalia": { ro: "Rosalia", en: "Rosalia" },
  "Azzurina": { ro: "Azzurina", en: "Azzurina" },
  "Turchese": { ro: "Turchese", en: "Turchese" },
  "Limona": { ro: "Limona", en: "Limona" },
  "Smeralda": { ro: "Smeralda", en: "Smeralda" },
  "Bruna": { ro: "Bruna", en: "Bruna" },
  "Olivetta": { ro: "Olivetta", en: "Olivetta" },
  "Salvia": { ro: "Salvia", en: "Salvia" },
  "Cenere": { ro: "Cenere", en: "Cenere" },
  "Rubina": { ro: "Rubina", en: "Rubina" },
  "Avorio": { ro: "Avorio", en: "Avorio" },
  "Notte": { ro: "Notte", en: "Notte" },
  "Cremisi": { ro: "Cremisi", en: "Cremisi" },
  "Nera": { ro: "Nera", en: "Nera" },
  "Brielle": { ro: "Brielle", en: "Brielle" },
  "Camea": { ro: "Camea", en: "Camea" },
  "Noelle": { ro: "Noelle", en: "Noelle" },
  "Amalia": { ro: "Amalia", en: "Amalia" },
  "Zelie": { ro: "Zelie", en: "Zelie" },
  "Bat": { ro: "Bat", en: "Bat" },
  "Flower": { ro: "Flower", en: "Flower" },
  "Cat": { ro: "Cat", en: "Cat" },
  "Bear": { ro: "Bear", en: "Bear" },
  "Pegaso": { ro: "Pegaso", en: "Pegaso" },
  "Bassotto": { ro: "Bassotto", en: "Bassotto" },
  "Fiocco": { ro: "Fiocco", en: "Fiocco" },
  "Mix": { ro: "Mix", en: "Mix" },
  "Serenella": { ro: "Serenella", en: "Serenella" },
  "Marcelline": { ro: "Marcelline", en: "Marcelline" },
  "Celestina": { ro: "Celestina", en: "Celestina" },
  "Marina": { ro: "Marina", en: "Marina" },
  "Costanza": { ro: "Costanza", en: "Costanza" },
  "Doriana": { ro: "Doriana", en: "Doriana" },
  "Iride": { ro: "Iride", en: "Iride" },
  "Amorette": { ro: "Amorette", en: "Amorette" },
  "Colomba": { ro: "Colomba", en: "Colomba" },
  "Nebbia": { ro: "Nebbia", en: "Nebbia" },
  "Clarissa": { ro: "Clarissa", en: "Clarissa" },
  "Azzurra": { ro: "Azzurra", en: "Azzurra" },
  "Lavinia": { ro: "Lavinia", en: "Lavinia" },
  "Artemisia": { ro: "Artemisia", en: "Artemisia" },
  "Rosetta": { ro: "Rosetta", en: "Rosetta" },
  "Verdiana": { ro: "Verdiana", en: "Verdiana" },
  "Fiorina": { ro: "Fiorina", en: "Fiorina" },
  "Cerelia": { ro: "Cerelia", en: "Cerelia" },
  "Teodora": { ro: "Teodora", en: "Teodora" },
  "Delphina": { ro: "Delphina", en: "Delphina" },
  "Aimee": { ro: "Aimee", en: "Aimee" },
  "Rosalie": { ro: "Rosalie", en: "Rosalie" },
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
      "ru": "Кожаная сумка Kelly на плечо из натуральной кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Geantă de umăr din piele, stil Kelly din piele naturală — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Premium Leather Kelly Shoulder Bag in natural leather — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "woven-leather-shopper-tote-black": {
    "title": {
      "ru": "Ondine",
      "ro": "Ondine",
      "en": "Ondine"
    },
    "description": {
      "ru": "Ondine — плетёная сумка-шоппер из плетёной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nЗакрытие на кожаном шнурке. Внутри — место для телефона, кошелька, ключей и косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Ondine — shopper împletit din piele, creat pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta moale și textura împletită se integrează ușor în garderoba de zi cu zi.\n\nÎnchidere cu șnur din piele. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Ondine — woven leather shopper bag designed for work, city errands and days when you need to carry more. The soft silhouette and woven texture integrate easily into an everyday wardrobe.\n\nLeather drawstring closure. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-woven-beach-tote-bag-natural-black": {
    "title": {
      "ru": "Capri",
      "ro": "Capri",
      "en": "Capri"
    },
    "description": {
      "ru": "Capri — плетёная пляжная сумка-тоут с кожаными ручками, золотой фурнитурой и полукруглым силуэтом — для курорта, города и путешествий.\n\nПросторное отделение с внутренним карманом на молнии вмещает телефон, кошелёк, косметику и документы. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Capri — geantă tote de plajă împletită, cu mânere din piele, accesorii aurii și siluetă semicirculară — pentru stațiune, oraș și călătorii.\n\nCompartimentul încăpător, cu buzunar interior cu fermoar, încăpe telefon, portofel, cosmetice și documente. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Capri — woven beach tote with leather handles, gold hardware and a semi-circular silhouette — for holidays, city days and travel.\n\nThe roomy interior with a zip pocket fits a phone, wallet, cosmetics and documents. Available to order, delivery in 7–14 days."
    }
  },
  "milano-cage-tote-bag-black-red": {
    "title": {
      "ru": "Ortigia",
      "ro": "Ortigia",
      "en": "Ortigia"
    },
    "description": {
      "ru": "Ortigia — тоут с каркасным силуэтом из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Ortigia — geantă tote cu siluetă tip cage din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Ortigia — cage-frame tote bag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "classic-leather-tote-bag-black": {
    "title": {
      "ru": "Claudine",
      "ro": "Claudine",
      "en": "Claudine"
    },
    "description": {
      "ru": "Claudine — классическая кожаная сумка-тоут с поворотным замком, двойными ручками и строгим силуэтом — для работы, деловых встреч и повседневной носки.\n\nПросторное отделение вмещает документы, планшет, кошелёк и повседневные мелочи. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Claudine — geantă tote clasică din piele, cu încuietoare rotativă, mânere duble și siluetă strictă — pentru birou, întâlniri de afaceri și purtare zilnică.\n\nCompartimentul încăpător încăpe documente, tabletă, portofel și accesorii zilnice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Claudine — classic leather tote with a turn-lock closure, double handles and a structured silhouette — for work, business meetings and everyday wear.\n\nThe roomy interior fits documents, a tablet, a wallet and everyday essentials. Available to order, delivery in 7–14 days."
    }
  },
  "classic-leather-bowling-bag-black": {
    "title": {
      "ru": "Romina",
      "ro": "Romina",
      "en": "Romina"
    },
    "description": {
      "ru": "Romina — сумка-боулинг из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Romina — geantă bowling din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Romina — bowling bag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-pink": {
    "title": {
      "ru": "Amara",
      "ro": "Amara",
      "en": "Amara"
    },
    "description": {
      "ru": "Amara — сумка-хобо из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Amara — geantă hobo din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Amara — hobo bag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-taupe": {
    "title": {
      "ru": "Liora",
      "ro": "Liora",
      "en": "Liora"
    },
    "description": {
      "ru": "Liora — сумка-хобо из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Liora — geantă hobo din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta moale și finisajele aurii rămân elegante fără exces.\n\nÎnchidere magnetică cu detaliu decorativ tip încuietoare. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Liora — hobo bag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The soft silhouette and gold hardware feel polished without looking heavy.\n\nMagnetic closure with a decorative lock detail. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-smooth-black": {
    "title": {
      "ru": "Serena",
      "ro": "Serena",
      "en": "Serena"
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
      "ru": "Структурная кожаная сумка с верхней ручкой из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Geantă structurată din piele cu mâner superior din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Structured Leather Top Handle Bag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "premium-fan-straw-handbag-natural-cognac": {
    "title": {
      "ru": "Соломенная сумка веерной формы",
      "ro": "Geantă din paie în formă de evantai",
      "en": "Premium Fan Straw Handbag"
    },
    "description": {
      "ru": "Соломенная сумка веерной формы из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Geantă din paie în formă de evantai din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Premium Fan Straw Handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "elegant-leather-crossbody-bag-beige": {
    "title": {
      "ru": "Coralie",
      "ro": "Coralie",
      "en": "Coralie"
    },
    "description": {
      "ru": "Coralie — кожаная сумка кроссбоди из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Coralie — geantă crossbody din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Coralie — leather crossbody bag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "elegant-leather-tote-bag-black": {
    "title": {
      "ru": "Violaine",
      "ro": "Violaine",
      "en": "Violaine"
    },
    "description": {
      "ru": "Violaine — кожаная сумка-тоут из кожи и замши с архитектурным силуэтом, двойными ручками и съёмным ремнём — для работы, города и поездок.\n\nПросторное отделение вмещает документы, кошелёк, косметику и повседневные мелочи. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Violaine — geantă tote din piele și piele întoarsă, cu siluetă arhitecturală, mânere duble și curea detașabilă — pentru birou, oraș și călătorii.\n\nCompartimentul încăpător încăpe documente, portofel, cosmetice și accesorii zilnice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Violaine — leather and suede tote with an architectural silhouette, double handles and a detachable strap — for work, city days and travel.\n\nThe roomy interior fits documents, a wallet, cosmetics and everyday essentials. Available to order, delivery in 7–14 days."
    }
  },
  "pouch-bag-black-onyx": {
    "title": {
      "ru": "Capucine",
      "ro": "Capucine",
      "en": "Capucine"
    },
    "description": {
      "ru": "Capucine — сумка-пауч из телячьей кожи с мягкими драпированными линиями и золотистой фурнитурой на ручке — для повседневных и вечерних образов.\n\nЗастёжка на молнии, вместительное отделение внутри. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Capucine — geantă pouch din piele de vițel, cu linii drapate moi și finisaje aurii pe mâner — pentru ținute de zi și de seară.\n\nFermoar sigur, compartiment interior încăpător. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Capucine — calf leather pouch bag with soft draped lines and gold hardware on the handle — for day-to-evening looks.\n\nZip closure and a roomy interior. Available to order, delivery in 7–14 days."
    }
  },
  "structured-leather-tote-bag-burgundy": {
    "title": {
      "ru": "Beatrice",
      "ro": "Beatrice",
      "en": "Beatrice"
    },
    "description": {
      "ru": "Beatrice — структурированная сумка-тоут из натуральной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Beatrice — geantă tote structurată din piele naturală — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Beatrice — structured tote bag in natural leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "the-essential-shoulder-bag-tan-cognac": {
    "title": {
      "ru": "Adele",
      "ro": "Adele",
      "en": "Adele"
    },
    "description": {
      "ru": "Adele — базовая сумка на плечо из натуральной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Adele — geantă de umăr esențială din piele naturală — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Adele — essential shoulder bag in natural leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "aurelia-soft-hobo-cognac": {
    "title": {
      "ru": "Мягкая сумка-хобо Aurelia из зернистой кожи коньячного цвета",
      "ro": "Aurelia",
      "en": "Aurelia"
    },
    "description": {
      "ru": "Мягкая сумка-хобо Aurelia из зернистой кожи коньячного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Aurelia — geantă hobo moale din piele granulată cognac din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Aurelia — soft cognac pebbled-leather hobo in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "aurelia-baguette-black": {
    "title": {
      "ru": "Сумка-багет Aurelia на короткой ручке из гладкой кожи чёрного цвета",
      "ro": "Aurelia",
      "en": "Aurelia"
    },
    "description": {
      "ru": "Сумка-багет Aurelia на короткой ручке из гладкой кожи чёрного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Aurelia — baghetă neagră din piele netedă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Aurelia — black smooth-leather baguette in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "vionetta-structured-bag-beige": {
    "title": {
      "ru": "Структурная сумка Vionetta с крупной пряжкой из кожи бежевого цвета",
      "ro": "Vionetta",
      "en": "Vionetta"
    },
    "description": {
      "ru": "Структурная сумка Vionetta с крупной пряжкой из кожи бежевого цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Vionetta — geantă structurată bej cu cataramă expresivă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Vionetta — structured beige leather bag with statement buckle in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "vionetta-mini-crossbody-rose": {
    "title": {
      "ru": "Мини-сумка Vionetta через плечо на цепочке пудрового цвета",
      "ro": "Vionetta",
      "en": "Vionetta"
    },
    "description": {
      "ru": "Мини-сумка Vionetta через плечо на цепочке пудрового цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Vionetta — mini crossbody pudrată pe lanț din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Vionetta — mini powder-rose chain crossbody in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "sora-tote-sand": {
    "title": {
      "ru": "Большой шопер SÓRA Atelier из плотной кожи песочного цвета",
      "ro": "SÓRA Atelier",
      "en": "SÓRA Atelier"
    },
    "description": {
      "ru": "Большой шопер SÓRA Atelier из плотной кожи песочного цвета из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "SÓRA Atelier — tote mare din piele densă nisipie din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "SÓRA Atelier — large sand leather tote in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "sora-backpack-black": {
    "title": {
      "ru": "Женский рюкзак SÓRA Atelier из мягкой кожи чёрного цвета",
      "ro": "SÓRA Atelier",
      "en": "SÓRA Atelier"
    },
    "description": {
      "ru": "Женский рюкзак SÓRA Atelier из мягкой кожи чёрного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "SÓRA Atelier — rucsac negru din piele moale din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "SÓRA Atelier — soft black leather backpack in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "castello-briefcase-brown": {
    "title": {
      "ru": "Деловой портфель Castello из гладкой кожи коричневого цвета",
      "ro": "Деловой Briefcase Castello",
      "en": "Деловой Briefcase Castello"
    },
    "description": {
      "ru": "Деловой портфель Castello из гладкой кожи коричневого цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Деловой Briefcase Castello din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Деловой Briefcase Castello in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "marrone-crossbody-cognac": {
    "title": {
      "ru": "Сумка через плечо Marrone с двумя карманами коньячного цвета",
      "ro": "Geantă de umăr",
      "en": "Shoulder bag"
    },
    "description": {
      "ru": "Сумка через плечо Marrone с двумя карманами коньячного цвета из фактурной кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУдобно носить на плече. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Geantă de umăr din piele texturată — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Shoulder bag in textured leather — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "marrone-clutch-bordo": {
    "title": {
      "ru": "Клатч Marrone на цепочке из гладкой кожи бордового цвета",
      "ro": "Clutch",
      "en": "Clutch"
    },
    "description": {
      "ru": "Клатч Marrone на цепочке из гладкой кожи бордового цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Clutch din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Clutch in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "aurelia-travel-bag-brown": {
    "title": {
      "ru": "Дорожная сумка Aurelia из плотной кожи коричневого цвета",
      "ro": "Дорожная сумка Aurelia",
      "en": "Дорожная сумка Aurelia"
    },
    "description": {
      "ru": "Дорожная сумка Aurelia из плотной кожи коричневого цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Дорожная сумка Aurelia din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Дорожная сумка Aurelia in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "sora-belt-bag-black": {
    "title": {
      "ru": "Поясная сумка SÓRA Atelier из гладкой кожи чёрного цвета",
      "ro": "Geantă crossbody",
      "en": "Crossbody bag"
    },
    "description": {
      "ru": "Поясная сумка SÓRA Atelier из гладкой кожи чёрного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Geantă crossbody din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Crossbody bag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "vionetta-bucket-green": {
    "title": {
      "ru": "Сумка-мешок Vionetta на затяжке из кожи зелёного цвета",
      "ro": "Сумка-мешок Vionetta на затяжке",
      "en": "Сумка-мешок Vionetta на затяжке"
    },
    "description": {
      "ru": "Сумка-мешок Vionetta на затяжке из кожи зелёного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Сумка-мешок Vionetta на затяжке din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Сумка-мешок Vionetta на затяжке in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "aurelia-big-shopper-grey": {
    "title": {
      "ru": "Большая сумка Aurelia с двумя ручками серого цвета",
      "ro": "Aurelia",
      "en": "Aurelia"
    },
    "description": {
      "ru": "Большая сумка Aurelia с двумя ручками серого цвета из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Aurelia — tote mare gri cu două mânere din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Aurelia — large grey double-handle tote in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "marrone-crossbody-navy": {
    "title": {
      "ru": "Небольшая сумка через плечо Marrone синего цвета",
      "ro": "Geantă de umăr",
      "en": "Shoulder bag"
    },
    "description": {
      "ru": "Небольшая сумка через плечо Marrone синего цвета из натуральной кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУдобно носить на плече. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Geantă de umăr din piele naturală — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Shoulder bag in natural leather — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-turn-lock-strap-tote-bag": {
    "title": {
      "ru": "Greta",
      "ro": "Greta",
      "en": "Greta"
    },
    "description": {
      "ru": "Greta — сумка-тоут с замком из натуральной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Greta — geantă tote din piele naturală — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Greta — tote bag in natural leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-compact-woven-panel-metallic-top-handle-bag": {
    "title": {
      "ru": "Nerissa",
      "ro": "Nerissa",
      "en": "Nerissa"
    },
    "description": {
      "ru": "Nerissa — сумка на короткой ручке из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Nerissa — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Nerissa — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-duo-mini-tote-bag": {
    "title": {
      "ru": "Fabrizia",
      "ro": "Fabrizia",
      "en": "Fabrizia"
    },
    "description": {
      "ru": "Fabrizia — мини-тоут из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Fabrizia — geantă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Fabrizia — handbag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-hobo-shoulder-bag": {
    "title": {
      "ru": "Lucrezia",
      "ro": "Lucrezia",
      "en": "Lucrezia"
    },
    "description": {
      "ru": "Lucrezia — сумка хобо на плечо из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Lucrezia — geantă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Lucrezia — handbag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-knitted-openwork-panel-tote-bag": {
    "title": {
      "ru": "Ginevra",
      "ro": "Ginevra",
      "en": "Ginevra"
    },
    "description": {
      "ru": "Ginevra — тоут из вязаного полотна из натуральной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Ginevra — geantă tote din piele naturală — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Ginevra — tote bag in natural leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-leather-tote-shoulder-bag": {
    "title": {
      "ru": "Allegra",
      "ro": "Allegra",
      "en": "Allegra"
    },
    "description": {
      "ru": "Allegra — сумка-тоут на плечо из натуральной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Allegra — geantă tote din piele naturală — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Allegra — tote bag in natural leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-luna-soft-hobo-bag": {
    "title": {
      "ru": "Luna",
      "ro": "Luna",
      "en": "Luna"
    },
    "description": {
      "ru": "Luna — мягкая сумка хобо из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Luna — geantă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Luna — handbag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-accordion-buckle-shoulder-bag": {
    "title": {
      "ru": "Bettina",
      "ro": "Bettina",
      "en": "Bettina"
    },
    "description": {
      "ru": "Bettina — сумка на плечо с пряжкой из фактурной кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУдобно носить на плече. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Bettina — geantă de umăr cu cataramă din piele texturată — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Bettina — buckle shoulder bag in textured leather — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-baguette-bag": {
    "title": {
      "ru": "Perrine",
      "ro": "Perrine",
      "en": "Perrine"
    },
    "description": {
      "ru": "Perrine — багет на плечо из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Perrine — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Perrine — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-compact-baguette-bag": {
    "title": {
      "ru": "Anaelle",
      "ro": "Anaelle",
      "en": "Anaelle"
    },
    "description": {
      "ru": "Anaelle — компактный багет из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Anaelle — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Anaelle — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-contrast-trim-structured-top-handle-bag": {
    "title": {
      "ru": "Ninette",
      "ro": "Ninette",
      "en": "Ninette"
    },
    "description": {
      "ru": "Ninette — структурная сумка с контрастной окантовкой из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Ninette — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Ninette — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-contrast-trim-turn-lock-structured-top-handle-bag": {
    "title": {
      "ru": "Thea",
      "ro": "Thea",
      "en": "Thea"
    },
    "description": {
      "ru": "Thea — структурная сумка с поворотным замком из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Thea — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Thea — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-crescent-hobo-bag": {
    "title": {
      "ru": "Colline",
      "ro": "Colline",
      "en": "Colline"
    },
    "description": {
      "ru": "Colline — сумка хобо полумесяцем из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Colline — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Colline — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-drawstring-tote-bag": {
    "title": {
      "ru": "Maelle",
      "ro": "Maelle",
      "en": "Maelle"
    },
    "description": {
      "ru": "Maelle — тоут на завязках из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Maelle — geantă tote din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Maelle — tote bag in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-half-moon-shoulder-bag": {
    "title": {
      "ru": "Livia",
      "ro": "Livia",
      "en": "Livia"
    },
    "description": {
      "ru": "Livia — сумка полумесяц на плечо из фактурной кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУдобно носить на плече. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Livia — geantă de umăr din piele texturată — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Livia — shoulder bag in textured leather — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-kiss-lock-pouch-bag-ivory": {
    "title": {
      "ru": "Cassia",
      "ro": "Cassia",
      "en": "Cassia"
    },
    "description": {
      "ru": "Cassia — компактный клатч с рамочным замком из фактурной кожи с мягкой драпировкой — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Cassia — clutch compact cu încuietoare tip cadru. Model din piele texturată cu drapaj moale, creat pentru seară, evenimente și ieșiri minimaliste. Silueta rămâne elegantă fără să pară voluminoasă.\n\nFormat compact pentru ieșiri. Interiorul este gândit pentru telefon, carduri, ruj și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Cassia — compact kiss-lock clutch crafted from textured leather with a soft draped finish, designed for evenings, events and minimal outings. The silhouette feels polished without looking bulky.\n\nCompact format for going out. The interior fits a phone, cards, lipstick and small essentials. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pleated-leather-frame-clutch": {
    "title": {
      "ru": "Fiamma",
      "ro": "Fiamma",
      "en": "Fiamma"
    },
    "description": {
      "ru": "Fiamma — мягкий клатч с вертикальной драпировкой и геометричной металлической рамкой-ручкой. Магнитная застёжка, просторное отделение и съёмный регулируемый плечевой ремень.\n\nНосить в руке за рамку или через плечо на ремне. Доставка 7–14 дней.",
      "ro": "Fiamma — clutch moale cu drapaj vertical și mâner-cadru metalic geometric. Închidere magnetică, compartiment spațios și curea de umăr detașabilă, reglabilă.\n\nSe poate purta în mână sau pe umăr. Livrare în 7–14 zile.",
      "en": "Fiamma — soft clutch with vertical draping and a geometric metal frame handle. Magnetic closure, a roomy single compartment and a detachable adjustable shoulder strap.\n\nCarry by the frame or wear crossbody on the strap. Delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-side-drawstring-shoulder-bag": {
    "title": {
      "ru": "Gioia",
      "ro": "Gioia",
      "en": "Gioia"
    },
    "description": {
      "ru": "Gioia — сумка на плечо из зернистой кожи с тонкими ремнями и декоративными боковыми завязками с золотыми наконечниками. Верх на молнии, одно просторное отделение.\n\nУдлинённый силуэт для города. Доставка 7–14 дней.",
      "ro": "Gioia — geantă de umăr din piele granulată, cu curele subțiri și șnururi decorative laterale cu capete aurii. Închidere cu fermoar, un compartiment spațios.\n\nSiluetă alungită pentru oraș. Livrare în 7–14 zile.",
      "en": "Gioia — pebbled leather shoulder bag with thin straps and decorative side drawstrings finished with gold tips. Zip-top closure and a roomy single compartment.\n\nElongated city silhouette. Delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-two-tone-bowling-bag": {
    "title": {
      "ru": "Giorgia",
      "ro": "Giorgia",
      "en": "Giorgia"
    },
    "description": {
      "ru": "Giorgia — структурная боулинг-сумка из зернистой кожи. Доступна в двухцветном сочетании taupe и однотонных оттенках. Верх на молнии, просторное отделение с карманом, золотая фурнитура.\n\nСобранный силуэт для города. Доставка 7–14 дней.",
      "ro": "Giorgia — geantă bowling structurată din piele granulată, disponibilă bicolor sau monocoloră. Închidere cu fermoar, compartiment spațios cu buzunar, accesorii aurii.\n\nSiluetă elegantă pentru oraș. Livrare în 7–14 zile.",
      "en": "Giorgia — structured pebbled leather bowling bag in two-tone and solid colorways. Zip-top closure, roomy compartment with a slip pocket and gold hardware.\n\nPolished city silhouette. Delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-kiss-lock-pouch-bag-light-blue": {
    "title": {
      "ru": "Paloma",
      "ro": "Paloma",
      "en": "Paloma"
    },
    "description": {
      "ru": "Paloma — структурная сумка с рамочным замком из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Paloma — geantă structurată cu încuietoare tip cadru. Model din piele texturată, creat pentru oraș, întâlniri și ținute de zi cu zi cu accent pe siluetă. Forma bine definită și închiderea tip cadru îi dau personalitate.\n\nMai mult spațiu pentru lucrurile zilnice — telefon, portofel, chei și cosmetice. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Paloma — structured kiss-lock bag crafted from textured leather, designed for city days, meetings and everyday looks with a defined silhouette. The frame closure adds character without extra hardware.\n\nMore room for daily essentials — phone, wallet, keys and cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-rectangular-handbag": {
    "title": {
      "ru": "Aurea",
      "ro": "Aurea",
      "en": "Aurea"
    },
    "description": {
      "ru": "Aurea — прямоугольная сумка в руке из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Aurea — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Aurea — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-satchel-bag": {
    "title": {
      "ru": "Halle",
      "ro": "Halle",
      "en": "Halle"
    },
    "description": {
      "ru": "Halle — сумка-сэтчел из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Halle — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Halle — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-handbag": {
    "title": {
      "ru": "Romilly",
      "ro": "Romilly",
      "en": "Romilly"
    },
    "description": {
      "ru": "Romilly — структурная сумка в руке из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Romilly — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Romilly — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-shopper-tote": {
    "title": {
      "ru": "Vespera",
      "ro": "Vespera",
      "en": "Vespera"
    },
    "description": {
      "ru": "Vespera — структурный шоппер-тоут из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Vespera — geantă tote din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Vespera — tote bag in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-tote-bag-with-pouch": {
    "title": {
      "ru": "Marielle",
      "ro": "Marielle",
      "en": "Marielle"
    },
    "description": {
      "ru": "Marielle — тоут с коcmетичкой из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Marielle — geantă tote din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Marielle — tote bag in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-tote-bag": {
    "title": {
      "ru": "Fiorenza",
      "ro": "Fiorenza",
      "en": "Fiorenza"
    },
    "description": {
      "ru": "Fiorenza — сумка-тоут из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Fiorenza — geantă tote din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Fiorenza — tote bag in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-flap-shoulder-bag-black": {
    "title": {
      "ru": "Colette",
      "ro": "Colette",
      "en": "Colette"
    },
    "description": {
      "ru": "Colette — сумка на плечо с клапаном на замке из фактурной кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Colette — geantă de umăr cu clapetă și încuietoare rotativă. Model din piele texturată, creat pentru zile active în oraș, întâlniri și ținute în care contează o siluetă bine definită. Clapeta tip plic și finisajele aurii rămân elegante fără exces.\n\nCurea de umăr pentru purtare comodă. Interior cu căptușeală roșie contrastantă, suficient pentru telefon, portofel, chei și cosmetice. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Colette — turn-lock flap shoulder bag crafted from textured leather, designed for city days, meetings and outfits where a polished silhouette matters. The envelope flap and gold hardware feel refined without looking heavy.\n\nShoulder strap for comfortable wear. Inside, a contrasting red lining offers room for a phone, wallet, keys and cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-flap-shoulder-tote-bag": {
    "title": {
      "ru": "Loretta",
      "ro": "Loretta",
      "en": "Loretta"
    },
    "description": {
      "ru": "Loretta — тоут с клапаном на замке из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Loretta — geantă tote din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Loretta — tote bag in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-placket-tote-with-pouch": {
    "title": {
      "ru": "Cressida",
      "ro": "Cressida",
      "en": "Cressida"
    },
    "description": {
      "ru": "Cressida — тоут с планкой на замке из фактурной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Cressida — geantă tote din piele texturată — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Cressida — tote bag in textured leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-top-handle-bag": {
    "title": {
      "ru": "Palmira",
      "ro": "Palmira",
      "en": "Palmira"
    },
    "description": {
      "ru": "Palmira — сумка с поворотным замком из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Palmira — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Palmira — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-zip-hobo-bag": {
    "title": {
      "ru": "Amabel",
      "ro": "Amabel",
      "en": "Amabel"
    },
    "description": {
      "ru": "Amabel — сумка хобо на молнии из фактурной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Amabel — geantă din piele texturată — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Amabel — handbag in textured leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-compact-baguette-bag": {
    "title": {
      "ru": "Ottilie",
      "ro": "Ottilie",
      "en": "Ottilie"
    },
    "description": {
      "ru": "Ottilie — гладкий компактный багет из гладкой кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Ottilie — geantă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Ottilie — handbag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-contrast-trim-flap-shoulder-bag": {
    "title": {
      "ru": "Perlette",
      "ro": "Perlette",
      "en": "Perlette"
    },
    "description": {
      "ru": "Perlette — сумка на плечо с клапаном из гладкой кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Perlette — geantă de umăr din piele naturală — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Perlette — shoulder bag in natural leather — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-crescent-hobo-bag": {
    "title": {
      "ru": "Rosalind",
      "ro": "Rosalind",
      "en": "Rosalind"
    },
    "description": {
      "ru": "Rosalind — гладкая хобо полумесяцем из гладкой кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Rosalind — geantă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Rosalind — handbag in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-suede-wing-tote-bag": {
    "title": {
      "ru": "Severine",
      "ro": "Severine",
      "en": "Severine"
    },
    "description": {
      "ru": "Severine — сумка-тоут из замши с трапециевидным силуэтом и расклешёнными боками. Тонкие кожаные плечевые ремни с декоративными концами и магнитная застёжка — характерные детали модели.\n\nПросторное внутреннее отделение с контрастной подкладкой и косметичка в комплекте делают сумку удобной для повседневной носки. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Severine — shopper din piele întoarsă, cu siluetă trapezoidală și laterale evazate. Curelele subțiri din piele, cu capete decorative, și închiderea magnetică sunt detaliile distinctive ale modelului.\n\nInteriorul spațios, cu căptușeală contrastantă, și un pouch inclus în set o fac potrivită pentru purtarea zilnică. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Severine — suede tote with a trapezoid silhouette and flared sides. Slim leather shoulder straps with decorative hanging ends and a magnetic closure are the signature details.\n\nA roomy interior with contrast lining and a matching pouch make it easy for everyday wear. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-ring-handle-structured-bag": {
    "title": {
      "ru": "Callista",
      "ro": "Callista",
      "en": "Callista"
    },
    "description": {
      "ru": "Callista — структурная сумка из зернистой кожи с архитектурным силуэтом и кольцевой ручкой. Центральная треугольная панель и боковая молния — характерные детали модели.\n\nСъёмный плечевой ремень позволяет носить сумку в руке или через плечо. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Callista — geantă structurată din piele granulată, cu siluetă arhitecturală și mâner circular. Panoul central triunghiular și fermoarul lateral sunt detaliile distinctive ale modelului.\n\nCureaua detașabilă de umăr permite purtarea în mână sau pe umăr. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Callista — pebbled leather structured bag with an architectural silhouette and a ring handle. The central triangular panel and side zip are the signature details.\n\nA detachable shoulder strap lets you carry it by hand or on the shoulder. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-woven-suede-flap-clutch-bag": {
    "title": {
      "ru": "Damiana",
      "ro": "Damiana",
      "en": "Damiana"
    },
    "description": {
      "ru": "Damiana — клатч из плетёной замши с диагональным переплетением и клапаном на магнитной кнопке. Тонкий ремешок с декоративными узлами — характерная деталь модели.\n\nПодходит для вечера и повседневных выходов: внутри помещаются телефон, карты и косметика. Модель доступна под заказ: срок доставки 7–14 рабочих дней.",
      "ro": "Damiana — clutch din piele întoarsă împletită, cu împletitură diagonală și clapetă cu capsa magnetică. Curea subțire cu noduri decorative este detaliul distinctiv al modelului.\n\nPotrivit pentru seară și ieșiri zilnice: interiorul încăpe telefon, carduri și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile lucrătoare.",
      "en": "Damiana — woven suede clutch with a diagonal weave and a magnetic flap closure. A slim strap with decorative knots is the signature detail.\n\nWorks for evenings and everyday outings — the interior fits a phone, cards and cosmetics. Available on pre-order, with delivery in 7–14 business days."
    }
  },
  "womens-smooth-leather-metal-ring-crescent-hobo-bag": {
    "title": {
      "ru": "Mirabel",
      "ro": "Mirabel",
      "en": "Mirabel"
    },
    "description": {
      "ru": "Mirabel — сумка-полумесяц из гладкой кожи с округлым силуэтом и встроенным плечевым ремнём. Серебристое декоративное кольцо у нижнего края — характерная деталь модели.\n\nМягкий силуэт без каркаса и одно отделение через верхний проём подходят для повседневного минимума. Модель доступна под заказ: срок доставки 7–14 рабочих дней.",
      "ro": "Mirabel — geantă semilună din piele netedă, cu siluetă rotunjită și curea de umăr integrată. Inelul decorativ argintiu de la baza genții este detaliul distinctiv al modelului.\n\nSilueta moale, fără structură rigidă, și un singur compartiment prin deschiderea de sus o fac potrivită pentru esențialele zilnice. Modelul este disponibil la comandă: livrare în 7–14 zile lucrătoare.",
      "en": "Mirabel — smooth leather crescent bag with a rounded silhouette and an integrated shoulder strap. The silver decorative ring at the base is the signature detail.\n\nThe soft, unstructured shape and single compartment through the top opening work for everyday essentials. Available on pre-order, with delivery in 7–14 business days."
    }
  },
  "womens-woven-leather-turn-lock-clutch-bag": {
    "title": {
      "ru": "Annabel",
      "ro": "Annabel",
      "en": "Annabel"
    },
    "description": {
      "ru": "Annabel — горизонтальная сумка из плетёной кожи с диагональным переплетением и клапаном на замке-вертушке. Плоская верхняя ручка и съёмный плечевой ремень — характерные детали модели.\n\nВытянутый силуэт подходит для вечера и повседневных выходов: внутри помещаются телефон, карты и косметика. Модель доступна под заказ: срок доставки 7–14 рабочих дней.",
      "ro": "Annabel — geantă orizontală din piele împletită, cu împletitură diagonală și clapetă cu incuietoare rotativă. Mânerul plat de sus și curea detașabilă de umăr sunt detaliile distinctive ale modelului.\n\nSilueta alungită este potrivită pentru seară și ieșiri zilnice: interiorul încăpe telefon, carduri și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile lucrătoare.",
      "en": "Annabel — horizontal woven leather bag with a diagonal weave and a turn-lock flap closure. A flat top handle and detachable shoulder strap are the signature details.\n\nThe elongated silhouette works for evenings and everyday outings — the interior fits a phone, cards and cosmetics. Available on pre-order, with delivery in 7–14 business days."
    }
  },
  "womens-soft-leather-draped-flap-bag": {
    "title": {
      "ru": "Solaine",
      "ro": "Solaine",
      "en": "Solaine"
    },
    "description": {
      "ru": "Solaine — сумка с драпированным клапаном из натуральной кожи — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУдобно носить на плече. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Solaine — geantă de umăr din piele naturală — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Solaine — shoulder bag in natural leather — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-tote-shopper-bag": {
    "title": {
      "ru": "Adalina",
      "ro": "Adalina",
      "en": "Adalina"
    },
    "description": {
      "ru": "Adalina — сумка-шоппер из натуральной кожи — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Adalina — geantă tote din piele naturală — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Adalina — tote bag in natural leather — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-base-drawstring-bucket-bag": {
    "title": {
      "ru": "Elowen",
      "ro": "Elowen",
      "en": "Elowen"
    },
    "description": {
      "ru": "Elowen — сумка-мешок с плетёным основанием из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Elowen — geantă bucket din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Elowen — bucket bag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-base-leather-link-handle-hobo-bag": {
    "title": {
      "ru": "Fantine",
      "ro": "Fantine",
      "en": "Fantine"
    },
    "description": {
      "ru": "Fantine — хобо с плетёным основанием из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Fantine — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Fantine — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-base-open-top-structured-bag-with-pouch": {
    "title": {
      "ru": "Garance",
      "ro": "Garance",
      "en": "Garance"
    },
    "description": {
      "ru": "Garance — структурная сумка с плетёным основанием из плетёной фактуры с кожаными деталями — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Garance — geantă tote din textură împletită cu detalii din piele — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Garance — tote bag in a woven texture with leather details — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-base-round-bucket-bag": {
    "title": {
      "ru": "Herminie",
      "ro": "Herminie",
      "en": "Herminie"
    },
    "description": {
      "ru": "Herminie — круглая сумка-мешок из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Herminie — geantă bucket din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Herminie — bucket bag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-base-turn-lock-top-handle-bag": {
    "title": {
      "ru": "Isolde",
      "ro": "Isolde",
      "en": "Isolde"
    },
    "description": {
      "ru": "Isolde — сумка с плетёным основанием и замком из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nАккуратный поворотный замок. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Isolde — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Isolde — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-base-zip-top-compact-structured-bag": {
    "title": {
      "ru": "Jacinta",
      "ro": "Jacinta",
      "en": "Jacinta"
    },
    "description": {
      "ru": "Jacinta — компактная структурная сумка на молнии из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Jacinta — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Jacinta — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-base-zip-top-structured-bag": {
    "title": {
      "ru": "Kalina",
      "ro": "Kalina",
      "en": "Kalina"
    },
    "description": {
      "ru": "Kalina — структурная сумка на молнии из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Kalina — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Kalina — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-buckle-handle-tote-bag": {
    "title": {
      "ru": "Lisette",
      "ro": "Lisette",
      "en": "Lisette"
    },
    "description": {
      "ru": "Lisette — тоут с пряжкой на ручке из плетёной фактуры с кожаными деталями — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Lisette — geantă tote din textură împletită cu detalii din piele — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Lisette — tote bag in a woven texture with leather details — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-crescent-hobo-bag": {
    "title": {
      "ru": "Manon",
      "ro": "Manon",
      "en": "Manon"
    },
    "description": {
      "ru": "Manon — плетёная хобо полумесяцем из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Manon — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Manon — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-flap-top-handle-bag": {
    "title": {
      "ru": "Noriane",
      "ro": "Noriane",
      "en": "Noriane"
    },
    "description": {
      "ru": "Noriane — плетёная сумка с клапаном из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Noriane — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Noriane — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag": {
    "title": {
      "ru": "Oriane",
      "ro": "Oriane",
      "en": "Oriane"
    },
    "description": {
      "ru": "Oriane — тоут с овальными ручками из плетёной фактуры с кожаными деталями — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Oriane — geantă tote din textură împletită cu detalii din piele — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Oriane — tote bag in a woven texture with leather details — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag-natural-tan": {
    "title": {
      "ru": "Celia",
      "ro": "Celia",
      "en": "Celia"
    },
    "description": {
      "ru": "Celia — тоут с овальными ручками и плетёной фактурой полотна. Лёгкий открытый силуэт подойдёт для повседневных выходов, прогулок и тёплого сезона.\n\nВнутри одно просторное отделение для телефона, кошелька, ключей и небольших аксессуаров. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Celia — geantă tote cu mânere ovale și textură împletită. Silueta lejeră, cu partea superioară deschisă, este potrivită pentru ținute de zi, plimbări și sezonul cald.\n\nInteriorul are un compartiment încăpător pentru telefon, portofel, chei și accesorii mici. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Celia — oval handle tote bag with a woven texture. The light open-top silhouette works for everyday outings, walks and warm-season styling.\n\nThe interior has one roomy compartment for a phone, wallet, keys and small accessories. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag-mokko": {
    "title": {
      "ru": "Roxane",
      "ro": "Roxane",
      "en": "Roxane"
    },
    "description": {
      "ru": "Roxane — тоут с овальными ручками и плетёной фактурой полотна. Лёгкий открытый силуэт подойдёт для повседневных выходов, прогулок и тёплого сезона.\n\nВнутри одно просторное отделение для телефона, кошелька, ключей и небольших аксессуаров. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Roxane — geantă tote cu mânere ovale și textură împletită. Silueta lejeră, cu partea superioară deschisă, este potrivită pentru ținute de zi, plimbări și sezonul cald.\n\nInteriorul are un compartiment încăpător pentru telefon, portofel, chei și accesorii mici. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Roxane — oval handle tote bag with a woven texture. The light open-top silhouette works for everyday outings, walks and warm-season styling.\n\nThe interior has one roomy compartment for a phone, wallet, keys and small accessories. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-panel-crystal-accent-structured-top-handle-bag": {
    "title": {
      "ru": "Pernelle",
      "ro": "Pernelle",
      "en": "Pernelle"
    },
    "description": {
      "ru": "Pernelle — структурная сумка с декоративной вставкой из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Pernelle — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Pernelle — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-panel-pebbled-leather-top-handle-bag": {
    "title": {
      "ru": "Aveline",
      "ro": "Aveline",
      "en": "Aveline"
    },
    "description": {
      "ru": "Aveline — сумка с плетёной панелью из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУниверсальный городской силуэт. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Aveline — geantă din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nSiluetă versatilă pentru oraș. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Aveline — handbag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nA versatile city-ready shape. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-spiral-panel-shoulder-tote-bag": {
    "title": {
      "ru": "Cendrine",
      "ro": "Cendrine",
      "en": "Cendrine"
    },
    "description": {
      "ru": "Cendrine — тоут со спиральным плетением из плетёной фактуры с кожаными деталями — для работы, поездок по городу и дней, когда нужно взять с собой больше обычного. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВместительный формат на каждый день. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Cendrine — geantă tote din textură împletită cu detalii din piele — pentru birou, deplasări în oraș și zilele în care ai nevoie să duci mai multe. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Cendrine — tote bag in a woven texture with leather details — for work, city errands and days when you need to carry more. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-triangular-shoulder-bag": {
    "title": {
      "ru": "Dorine",
      "ro": "Dorine",
      "en": "Dorine"
    },
    "description": {
      "ru": "Dorine — плетёная сумка треугольной формы из плетёной фактуры с кожаными деталями — для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nУдобно носить на плече. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Dorine — geantă de umăr din textură împletită cu detalii din piele — pentru ziua în oraș, întâlniri și ținute care cer libertate de mișcare. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Dorine — shoulder bag in a woven texture with leather details — for city days, meetings and looks that need easy movement. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-zip-crossbody-bag": {
    "title": {
      "ru": "Gwenaelle",
      "ro": "Gwenaelle",
      "en": "Gwenaelle"
    },
    "description": {
      "ru": "Gwenaelle — плетёная сумка кроссбоди из плетёной фактуры с кожаными деталями — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Gwenaelle — geantă crossbody din textură împletită cu detalii din piele — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Gwenaelle — crossbody bag in a woven texture with leather details — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "pelle-nova-wallet-cognac": {
    "title": {
      "ru": "Женский кошелёк Pelle Nova на молнии коньячного цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Женский кошелёк Pelle Nova на молнии коньячного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Portofel pentru femei din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Women's wallet in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "pelle-nova-cardholder-brown": {
    "title": {
      "ru": "Картхолдер Pelle Nova из натуральной кожи коричневого цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Картхолдер Pelle Nova из натуральной кожи коричневого цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Suport pentru carduri din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Card holder in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "marrone-keyholder-cognac": {
    "title": {
      "ru": "Ключница Marrone из кожи коньячного цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Ключница Marrone из кожи коньячного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Suport pentru carduri din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Card holder in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "sora-cosmetic-bag-beige": {
    "title": {
      "ru": "Коcmетичка SÓRA Atelier из мягкой кожи бежевого цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Коcmетичка SÓRA Atelier из мягкой кожи бежевого цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Portofel pentru femei din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Women's wallet in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "pelle-nova-passport-cover-bordo": {
    "title": {
      "ru": "Обложка для паспорта Pelle Nova бордового цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Обложка для паспорта Pelle Nova бордового цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Suport pentru carduri din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Card holder in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "sora-bag-charm-cognac": {
    "title": {
      "ru": "Подвеска для сумки SÓRA Atelier из кожи коньячного цвета",
      "ro": "Accesoriu pentru geantă",
      "en": "Bag accessory"
    },
    "description": {
      "ru": "Подвеска для сумки SÓRA Atelier из кожи коньячного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Accesoriu pentru geantă din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Bag accessory in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "sora-gift-set-black": {
    "title": {
      "ru": "Подарочный набор SÓRA Atelier: кошелёк и картхолдер чёрного цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Подарочный набор SÓRA Atelier: кошелёк и картхолдер чёрного цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Portofel pentru femei din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Women's wallet in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "marrone-womens-wallet-rose": {
    "title": {
      "ru": "Женский кошелёк Marrone на кнопке пудрового цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Женский кошелёк Marrone на кнопке пудрового цвета из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nВнутри — место для телефона, кошелька, ключей и небольшой косметики. Доступна под заказ: доставка 7–14 дней.",
      "ro": "Portofel pentru femei din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nInteriorul este gândit pentru esențiale: telefon, portofel, chei și mici accesorii. Disponibil la comandă: livrare 7–14 zile.",
      "en": "Women's wallet in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nThe interior is made for daily essentials — phone, wallet, keys and small cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "womens-full-grain-leather-zip-around-wallet": {
    "title": {
      "ru": "Francesca",
      "ro": "Francesca",
      "en": "Francesca"
    },
    "description": {
      "ru": "Francesca — кошелёк на молнии из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Francesca — portofel pentru femei din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Francesca — women's wallet in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-flap-leather-trifold-wallet": {
    "title": {
      "ru": "Federica",
      "ro": "Federica",
      "en": "Federica"
    },
    "description": {
      "ru": "Federica — трёхсложный кошелёк с клапаном на кнопке. Внутри — отделения для карт и купюр, окно для документов, монетница на кнопке и карман на молнии. Зернистая кожа с винтажной фактурой.\n\nМодель есть в наличии: доставим за 1–3 дня.",
      "ro": "Federica — portofel tri-fold cu clapă și capsă. Interiorul are compartimente pentru carduri și bancnote, fereastră pentru acte, buzunar pentru monede cu capsă și buzunar cu fermoar. Piele granulată cu aspect vintage.\n\nModelul este în stoc: livrare în 1–3 zile.",
      "en": "Federica — tri-fold flap wallet with a snap closure. Inside you'll find card and note slots, an ID window, a snap coin pocket and a zip compartment. Pebbled leather with a vintage finish.\n\nThis style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-flap-trifold-wallet": {
    "title": {
      "ru": "Fabiana",
      "ro": "Fabiana",
      "en": "Fabiana"
    },
    "description": {
      "ru": "Fabiana — трёхсложный кошелёк с клапаном и плетением intrecciato. Внутри — отделения для карт и купюр, окно для документов, монетница на кнопке и карман на молнии.\n\nВыразительная фактура плетёной кожи делает аксессуар заметным даже в минималистичном образе. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fabiana — portofel tri-fold cu clapă și model intrecciato. Interiorul are compartimente pentru carduri și bancnote, fereastră pentru acte, buzunar pentru monede cu capsă și buzunar cu fermoar.\n\nTextura împletită face accesoriul remarcabil chiar și într-o ținută minimalistă. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fabiana — tri-fold flap wallet with an intrecciato weave. Inside you'll find card and note slots, an ID window, a snap coin pocket and a zip compartment.\n\nThe woven texture makes the piece stand out even in a minimal look. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-vintage-accordion-zip-wallet": {
    "title": {
      "ru": "Giulietta",
      "ro": "Giulietta",
      "en": "Giulietta"
    },
    "description": {
      "ru": "Giulietta — кошелёк-гармошка на молнии из натуральной кожи — для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт остаётся собранным и лёгким в повседневной носке.\n\nНадёжная застёжка на молнии. Внутри — место для телефона, кошелька, ключей и небольшой косметики. В наличии: доставка 1–3 дня.",
      "ro": "Giulietta — portofel pentru femei din piele naturală — pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă și ușor de purtat zi de zi.\n\nÎnchidere sigură cu fermoar. Interiorul încăpe telefon, portofel, chei și mici accesorii. În stoc: livrare în 1–3 zile.",
      "en": "Giulietta — women's wallet in natural leather — for everyday wear, the office and relaxed evenings. The silhouette stays polished and easy to wear with everyday looks.\n\nSecure zip closure. The interior fits a phone, wallet, keys and small cosmetics. In stock, delivery in 1–3 days."
    }
  },
  "womens-woven-leather-zip-around-wallet": {
    "title": {
      "ru": "Seraphina",
      "ro": "Seraphina",
      "en": "Seraphina"
    },
    "description": {
      "ru": "Seraphina — плетёный кошелёк на молнии с фирменным переплетением intrecciato. Молния по периметру надёжно закрывает карты, купюры и мелочь; внутри — отделения для карт, окно для документов и монетница.\n\nВыразительная фактура плетёной кожи делает аксессуар заметным даже в минималистичном образе. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Seraphina — portofel împletit cu fermoar, cu model intrecciato distinctiv. Fermoarul pe contur închide în siguranță cardurile, bancnotele și monedele; interiorul are compartimente pentru carduri, fereastră pentru acte și buzunar pentru monede.\n\nTextura împletită a pielii face accesoriul remarcabil chiar și într-o ținută minimalistă. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Seraphina — woven zip-around wallet with a signature intrecciato weave. The perimeter zip keeps cards, notes and coins secure; inside you'll find card slots, an ID window and a zip coin pocket.\n\nThe woven leather texture makes the piece stand out even in a minimal look. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-leather-zip-snap-wallet": {
    "title": {
      "ru": "Flavia",
      "ro": "Flavia",
      "en": "Flavia"
    },
    "description": {
      "ru": "Flavia — кошелёк с плетением intrecciato, молнией по периметру и ремешком на кнопке для дополнительной фиксации. Внутри — отделения для карт, окно для документов и монетница на молнии.\n\nВыразительная фактура плетёной кожи и насыщенный оттенок делают аксессуар заметным акцентом в образе. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Flavia — portofel împletit intrecciato, cu fermoar pe contur și curea cu capsă pentru fixare suplimentară. Interiorul are compartimente pentru carduri, fereastră pentru acte și buzunar pentru monede cu fermoar.\n\nTextura împletită și nuanța intensă fac accesoriul un accent remarcabil. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Flavia — intrecciato woven wallet with a perimeter zip and a snap strap for extra security. Inside you'll find card slots, an ID window and a zip coin pocket.\n\nThe woven texture and rich colour make it a standout everyday piece. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-bat-bag-charm": {
    "title": {
      "ru": "Bat",
      "ro": "Bat",
      "en": "Bat"
    },
    "description": {
      "ru": "Брелок La Via Firenze в форме летучей мыши из зернистой чёрной кожи с жёлтой кожаной маской. Кожаный шнур, золотая цепочка и миниатюрный ключ с гравировкой LA VIA — характерная подпись бренда.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze în formă de liliac din piele neagră granulată, cu mască galbenă din piele. Șnur din piele, lanț auriu și cheiță miniatură gravată LA VIA — semnătura distinctivă a brandului.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm shaped like a bat in pebbled black leather with a yellow leather mask. A leather cord, gold chain and miniature key engraved LA VIA — the brand's signature detail.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-flower-bag-charm": {
    "title": {
      "ru": "Flower",
      "ro": "Flower",
      "en": "Flower"
    },
    "description": {
      "ru": "Брелок La Via Firenze с многослойным цветком из чёрной, коньячной и белой кожи. Кремовый кожаный шнур с декоративным узлом, золотая цепочка и миниатюрный ключ с гравировкой LA VIA.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze cu floare stratificată din piele neagră, coniac și albă. Șnur din piele crem cu nod decorativ, lanț auriu și cheiță miniatură gravată LA VIA.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm with a layered flower in black, cognac and white leather. A cream leather cord with a decorative knot, gold chain and miniature key engraved LA VIA.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-cat-bag-charm": {
    "title": {
      "ru": "Cat",
      "ro": "Cat",
      "en": "Cat"
    },
    "description": {
      "ru": "Брелок La Via Firenze с мордочкой кота из чёрной и белой кожи, декоративным бантом из принтованного шёлка и золотой цепочкой с ключом LA VIA.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze cu cap de pisică din piele neagră și albă, fundă decorativă din mătase imprimată și lanț auriu cu cheia LA VIA.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm with a cat face in black and white leather, a decorative printed silk bow and a gold chain with an LA VIA key.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "la-via-firenze-bear-bag-charm": {
    "title": {
      "ru": "Bear",
      "ro": "Bear",
      "en": "Bear"
    },
    "description": {
      "ru": "Брелок La Via Firenze в форме медвежонка из коньячной кожи с тёмно-коричневыми акцентами на ушах и лапках. Золотая цепочка с кожаной вставкой и ключ с гравировкой LA VIA.\n\nКрепится на карабин к ручке или ремню сумки. Поставляется на фирменной карточке Made in Italy. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc La Via Firenze în formă de ursuleț din piele coniac, cu accente maro închis pe urechi și labe. Lanț auriu cu insert din piele și cheie gravată LA VIA.\n\nSe prinde cu carabină de mânerul sau cureaua genții. Livrat pe cardul de brand Made in Italy. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "La Via Firenze bag charm shaped like a bear in cognac leather with dark brown accents on the ears and paws. A gold chain with a leather insert and an LA VIA engraved key.\n\nClips onto a bag handle or strap with a carabiner. Comes on a Made in Italy brand card. This style is in stock, with delivery in 1–3 days."
    }
  },
  "sora-pegasus-leather-bag-charm": {
    "title": {
      "ru": "Pegaso",
      "ro": "Pegaso",
      "en": "Pegaso"
    },
    "description": {
      "ru": "Кожаный брелок Pegaso в форме крылатого коня: объёмное тело, крыло, грива и хвост из полосок кожи, контрастная строчка по контуру. Петля на спине крепится на ручку или ремешок сумки.\n\nРучная отделка и насыщенные оттенки — заметный акцент к любой модели. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc Pegaso din piele în formă de cal înaripat: corp voluminos, aripă, coamă și coadă din fâșii de piele, cusătură contrastantă pe contur. Bucla de pe spate se prinde de mânerul sau cureaua genții.\n\nExecuție manuală și nuanțe intense — accent remarcabil pentru orice geantă. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Pegaso leather bag charm shaped like a winged horse: a padded body, wing, fringed mane and tail, and contrast stitching around the edges. The loop on the back slips over a bag handle or strap.\n\nHand-finished leather in rich colours — a standout accent for any bag. This style is in stock, with delivery in 1–3 days."
    }
  },
  "sora-dachshund-leather-bag-charm": {
    "title": {
      "ru": "Bassotto",
      "ro": "Bassotto",
      "en": "Bassotto"
    },
    "description": {
      "ru": "Кожаный брелок Bassotto в форме таксы: вытянутый силуэт, контрастные лапки и мордочка, глаз из белой и чёрной кожи, строчка по контуру. Петля на спине крепится на ручку или ремешок сумки.\n\nИгривый акцент для повседневных и вечерних образов. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc Bassotto din piele în formă de câine teckel: siluetă alungită, labe și bot contrastante, ochi din piele albă și neagră, cusătură pe contur. Bucla de pe spate se prinde de mânerul sau cureaua genții.\n\nAccent jucăuș pentru ținute de zi și de seară. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Bassotto leather bag charm shaped like a dachshund: an elongated silhouette, contrasting paws and muzzle, an eye in white and black leather, and perimeter stitching. The loop on the back slips over a bag handle or strap.\n\nA playful accent for everyday and evening looks. This style is in stock, with delivery in 1–3 days."
    }
  },
  "sora-silk-bow-bag-charm": {
    "title": {
      "ru": "Fiocco",
      "ro": "Fiocco",
      "en": "Fiocco"
    },
    "description": {
      "ru": "Шёлковый брелок-бант на карабине: принтованная лента заплетена у основания и завязана в объёмный бант с заострёнными концами. Золотой карабин крепится к ручке, ремню или молнии сумки.\n\nЛёгкий акцент, который меняет характер базовой модели. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Breloc fundă din mătase cu carabină: panglica imprimată este împletită la bază și legată într-o fundă voluminoasă cu vârfuri ascuțite. Carabina aurie se prinde de mâner, curea sau fermoarul genții.\n\nAccent ușor care schimbă caracterul unei genți de bază. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fiocco silk bow bag charm on a carabiner clip: a printed ribbon is braided at the base and tied into a full bow with pointed tails. The gold carabiner attaches to a bag handle, strap or zip pull.\n\nA light accent that changes the character of a basic bag. This style is in stock, with delivery in 1–3 days."
    }
  },
  "sora-dachshund-mix-bag-charm": {
    "title": {
      "ru": "Mix",
      "ro": "Mix",
      "en": "Mix"
    },
    "description": {
      "ru": "Брелок-набор на кольце: кожаная такса, миниатюрная «шоколадка», плетёный шнур с узлом, кожаные ремешки и пружинящий шнур с карабином. Несколько элементов на одном кольце — сразу заметный акцент на сумке.\n\nИгривый микс фактур и материалов. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Set de brelocuri pe inel: teckel din piele, mini „tabletă de ciocolată”, frânghie împletită cu nod, curele din piele și cablu spiralat cu carabină. Mai multe elemente pe un singur inel — accent imediat pe geantă.\n\nMix jucăuș de texturi și materiale. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Bag charm set on a split ring: a leather dachshund, a miniature chocolate bar, a braided cord with a knot, leather ties and a coiled cord with a carabiner. Several elements on one ring — an instant accent on any bag.\n\nA playful mix of textures and materials. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-abstract-geometric-silk-scarf": {
    "title": {
      "ru": "Serenella",
      "ro": "Serenella",
      "en": "Serenella"
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
      "ru": "Marcelline",
      "ro": "Marcelline",
      "en": "Marcelline"
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
      "ru": "Celestina",
      "ro": "Celestina",
      "en": "Celestina"
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
      "ru": "Marina",
      "ro": "Marina",
      "en": "Marina"
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
      "ru": "Costanza",
      "ro": "Costanza",
      "en": "Costanza"
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
      "ru": "Doriana",
      "ro": "Doriana",
      "en": "Doriana"
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
      "ru": "Iride",
      "ro": "Iride",
      "en": "Iride"
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
      "ru": "Amorette",
      "ro": "Amorette",
      "en": "Amorette"
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
      "ru": "Colomba",
      "ro": "Colomba",
      "en": "Colomba"
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
      "ru": "Nebbia",
      "ro": "Nebbia",
      "en": "Nebbia"
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
      "ru": "Clarissa",
      "ro": "Clarissa",
      "en": "Clarissa"
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
      "ru": "Azzurra",
      "ro": "Azzurra",
      "en": "Azzurra"
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
      "ru": "Lavinia",
      "ro": "Lavinia",
      "en": "Lavinia"
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
      "ru": "Artemisia",
      "ro": "Artemisia",
      "en": "Artemisia"
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
      "ru": "Rosetta",
      "ro": "Rosetta",
      "en": "Rosetta"
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
      "ru": "Verdiana",
      "ro": "Verdiana",
      "en": "Verdiana"
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
      "ru": "Fiorina",
      "ro": "Fiorina",
      "en": "Fiorina"
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
      "ru": "Cerelia",
      "ro": "Cerelia",
      "en": "Cerelia"
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
      "ru": "Teodora",
      "ro": "Teodora",
      "en": "Teodora"
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
      "ru": "Delphina",
      "ro": "Delphina",
      "en": "Delphina"
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
      "ru": "Rosalia",
      "ro": "Rosalia",
      "en": "Rosalia"
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
      "ru": "Azzurina",
      "ro": "Azzurina",
      "en": "Azzurina"
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
      "ru": "Turchese",
      "ro": "Turchese",
      "en": "Turchese"
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
      "ru": "Bianca",
      "ro": "Bianca",
      "en": "Bianca"
    },
    "description": {
      "ru": "Компактный картхолдер из белой зернистой кожи: чистый минималистичный силуэт без лишних деталей. Складная конструкция раскрывается на несколько вертикальных слотов для карт с обеих сторон.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри подчёркивают итальянское происхождение. Лаконичный аксессуар для повседневного кармана или сумки.",
      "ro": "Portcard compact din piele granulată albă: siluetă minimalistă, curată, fără detalii inutile. Construcție pliabilă cu mai multe sloturi verticale pentru carduri pe ambele părți.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior confirmă originea italiană. Accesoriu discret pentru buzunarul zilnic sau geantă.",
      "en": "Compact card holder in white pebbled leather: a clean, minimalist silhouette with no extra details. The bifold design opens to several vertical card slots on both sides.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside underline the Italian origin. A understated everyday pocket or bag essential."
    },
    "highlights": {
      "ru": ["Кожа", "Складная конструкция", "Отделения для карт с обеих сторон", "Made in Italy"],
      "ro": ["Piele", "Construcție pliabilă", "Compartimente pentru carduri pe ambele părți", "Made in Italy"],
      "en": ["Leather", "Bifold design", "Card slots on both sides", "Made in Italy"]
    }
  },
  "womens-pebbled-leather-bifold-cardholder-chartreuse": {
    "title": {
      "ru": "Limona",
      "ro": "Limona",
      "en": "Limona"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи насыщенного лаймово-шартрезового оттенка: яркий акцент без лишнего объёма. Складная конструкция с отделениями для карт с обеих сторон.\n\nТональная строчка по контуру, аккуратная окраска торцов и тиснение «Genuine Leather / Made in Italy» внутри. Смелый цвет для тех, кто любит заметные детали в повседневном образе.",
      "ro": "Portcard compact din piele granulată chartreuse lime: accent intens fără volum inutil. Construcție pliabilă cu compartimente pentru carduri pe ambele părți.\n\nCusătură tonală pe contur, margini fin finisate și imprimare „Genuine Leather / Made in Italy” în interior. Culoare îndrăzneață pentru cei care apreciază detaliile vizibile în ținutele de zi cu zi.",
      "en": "Compact card holder in vivid lime-chartreuse pebbled leather: a bold accent without extra bulk. The bifold design with card compartments on both sides.\n\nTonal edge stitching, clean edge paint and “Genuine Leather / Made in Italy” stamping inside. A confident colour for anyone who likes standout details in everyday outfits."
    },
    "highlights": {
      "ru": ["Кожа", "Складная конструкция", "Отделения для карт с обеих сторон", "Made in Italy"],
      "ro": ["Piele", "Construcție pliabilă", "Compartimente pentru carduri pe ambele părți", "Made in Italy"],
      "en": ["Leather", "Bifold design", "Card slots on both sides", "Made in Italy"]
    }
  },
  "womens-metallic-leather-bifold-cardholder-emerald": {
    "title": {
      "ru": "Smeralda",
      "ro": "Smeralda",
      "en": "Smeralda"
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
      "ru": "Bruna",
      "ro": "Bruna",
      "en": "Bruna"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи глубокого шоколадно-коричневого оттенка: насыщенный тон и выразительная фактура зерна. Складная конструкция с отделениями для карт с обеих сторон — по три слота на каждой панели.\n\nТональная строчка по контуру, аккуратная окраска торцов и золотое тиснение «Genuine Leather / Made in Italy» внутри. Универсальный тёмный аксессуар на каждый день.",
      "ro": "Portcard compact din piele granulată maro închis, tip ciocolată: nuanță intensă și textură grain expresivă. Construcție pliabilă cu compartimente pentru carduri pe ambele părți — câte trei sloturi pe fiecare panou.\n\nCusătură tonală pe contur, margini fin finisate și imprimare aurie „Genuine Leather / Made in Italy” în interior. Accesoriu întunecat, versatil, pentru fiecare zi.",
      "en": "Compact card holder in deep chocolate-brown pebbled leather: a rich hue and expressive grain texture. The bifold design with card compartments on both sides — three slots on each panel.\n\nTonal edge stitching, clean edge paint and gold-foil “Genuine Leather / Made in Italy” stamping inside. A versatile dark everyday accessory."
    },
    "highlights": {
      "ru": ["Кожа", "Складная конструкция", "Отделения для карт с обеих сторон", "Made in Italy"],
      "ro": ["Piele", "Construcție pliabilă", "Compartimente pentru carduri pe ambele părți", "Made in Italy"],
      "en": ["Leather", "Bifold design", "Card slots on both sides", "Made in Italy"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-sage": {
    "title": {
      "ru": "Olivetta",
      "ro": "Olivetta",
      "en": "Olivetta"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи приглушённого оливково-шалфейного оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Удобный формат, когда нужны 4–6 карт под рукой и не хочется носить полноразмерный кошелёк.",
      "ro": "Portcard compact din piele granulată verde măsliniu-salvie: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Format practic când ai nevoie de 4–6 carduri la îndemână, fără un portofel complet.",
      "en": "Compact card holder in muted olive-sage pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A practical format when you need 4–6 cards at hand without a full-size wallet."
    },
    "highlights": {
      "ru": ["Кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-wallet-sage": {
    "title": {
      "ru": "Salvia",
      "ro": "Salvia",
      "en": "Salvia"
    },
    "description": {
      "ru": "Компактный кошелёк из зернистой кожи приглушённого оливково-шалфейного оттенка: вертикальный формат, кожаный ремешок с кнопкой и продуманная внутренняя организация. Внутри — отделение на молнии, слоты для карт, прозрачные окна для документов и защита RFID.\n\nТональная строчка по контуру и маркировка RFID на подкладке. Спокойный природный оттенок для повседневного кармана.",
      "ro": "Portofel compact din piele granulată verde măsliniu-salvie: format vertical, curea din piele cu capse și organizare interioară atentă. În interior — compartiment cu fermoar, sloturi pentru carduri, ferestre transparente pentru documente și protecție RFID.\n\nCusătură tonală pe contur și marcaj RFID pe căptușeală. Nuanță naturală, calmă, pentru buzunarul de zi cu zi.",
      "en": "Compact wallet in muted olive-sage pebbled leather: a vertical format, leather snap strap and a well-organised interior. Inside — a zip compartment, card slots, clear document windows and RFID protection.\n\nTonal edge stitching and RFID marking on the lining. A calm natural hue for an everyday pocket."
    },
    "highlights": {
      "ru": ["Кожа", "Ремешок с кнопкой", "Отделение на молнии", "Защита RFID"],
      "ro": ["Piele", "Curea cu capse", "Compartiment cu fermoar", "Protecție RFID"],
      "en": ["Leather", "Snap strap", "Zip compartment", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-grey": {
    "title": {
      "ru": "Cenere",
      "ro": "Cenere",
      "en": "Cenere"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи светло-серого оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — шесть слотов для карт с обеих сторон и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Спокойный нейтральный тон для повседневного кармана.",
      "ro": "Portcard compact din piele granulată gri deschis: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — șase sloturi pentru carduri pe ambele părți și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Ton neutru, calm, pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in light grey pebbled leather: vertical slots on the front and a leather snap strap that secures your cards. Inside — six card slots on both sides and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A calm neutral tone for an everyday pocket."
    },
    "highlights": {
      "ru": ["Кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-red": {
    "title": {
      "ru": "Rubina",
      "ro": "Rubina",
      "en": "Rubina"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи насыщенного красного оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Яркий акцентный оттенок для повседневного кармана.",
      "ro": "Portcard compact din piele granulată roșu intens: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Nuanță accent, vie, pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in rich red pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A vivid accent hue for an everyday pocket."
    },
    "highlights": {
      "ru": ["Кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-cream": {
    "title": {
      "ru": "Avorio",
      "ro": "Avorio",
      "en": "Avorio"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой кожи нежного кремово-бежевого оттенка: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Спокойный нейтральный тон для повседневного кармана.",
      "ro": "Portcard compact din piele granulată bej-crem delicat: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Ton neutru, calm, pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in soft cream-beige pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A calm neutral tone for an everyday pocket."
    },
    "highlights": {
      "ru": ["Кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-black": {
    "title": {
      "ru": "Notte",
      "ro": "Notte",
      "en": "Notte"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой чёрной кожи: вертикальные слоты на лицевой стороне и кожаный ремешок с кнопкой, который фиксирует карты. Внутри — дополнительные отделения и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Классический чёрный аксессуар для повседневного кармана.",
      "ro": "Portcard compact din piele granulată neagră: sloturi verticale pe față și curea din piele cu capse care fixează cardurile. În interior — compartimente suplimentare și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Accesoriu clasic negru pentru buzunarul de zi cu zi.",
      "en": "Compact card holder in black pebbled leather: vertical slots on the front and a leather strap with a snap that secures your cards. Inside — additional compartments and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A classic black accessory for an everyday pocket."
    },
    "highlights": {
      "ru": ["Кожа", "Слоты для карт на лицевой стороне", "Ремешок с кнопкой", "Защита RFID"],
      "ro": ["Piele", "Sloturi pentru carduri pe față", "Curea cu capse", "Protecție RFID"],
      "en": ["Leather", "Front card slots", "Snap strap", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-wallet-red": {
    "title": {
      "ru": "Cremisi",
      "ro": "Cremisi",
      "en": "Cremisi"
    },
    "description": {
      "ru": "Компактный кошелёк из зернистой кожи насыщенного красного оттенка: вертикальный формат, кожаный ремешок с кнопкой и продуманная внутренняя организация. Внутри — отделение на молнии, слоты для карт, прозрачные окна для документов и защита RFID.\n\nТональная строчка по контуру и маркировка RFID на подкладке. Яркий акцентный оттенок для повседневного кармана.",
      "ro": "Portofel compact din piele granulată roșu intens: format vertical, curea din piele cu capse și organizare interioară atentă. În interior — compartiment cu fermoar, sloturi pentru carduri, ferestre transparente pentru documente și protecție RFID.\n\nCusătură tonală pe contur și marcaj RFID pe căptușeală. Nuanță accent, vie, pentru buzunarul de zi cu zi.",
      "en": "Compact wallet in rich red pebbled leather: a vertical format, leather snap strap and a well-organised interior. Inside — a zip compartment, card slots, clear document windows and RFID protection.\n\nTonal edge stitching and RFID marking on the lining. A vivid accent hue for an everyday pocket."
    },
    "highlights": {
      "ru": ["Кожа", "Ремешок с кнопкой", "Отделение на молнии", "Защита RFID"],
      "ro": ["Piele", "Curea cu capse", "Compartiment cu fermoar", "Protecție RFID"],
      "en": ["Leather", "Snap strap", "Zip compartment", "RFID protection"]
    }
  },
  "womens-pebbled-leather-snap-strap-rfid-cardholder-beige": {
    "title": {
      "ru": "Perla",
      "ro": "Perla",
      "en": "Perla"
    },
    "description": {
      "ru": "Компактный кошелёк из зернистой кожи нежного бежевого оттенка: вертикальный формат, кожаный ремешок с кнопкой и продуманная внутренняя организация. Внутри — отделение на молнии, слоты для карт и прозрачные окна для документов, а также защита RFID.\n\nТональная строчка по контуру и маркировка RFID на подкладке. Спокойный нейтральный цвет, который легко сочетается с сумками любых оттенков.",
      "ro": "Portofel compact din piele granulată bej delicat: format vertical, curea din piele cu capse și organizare interioară atentă. În interior — compartiment cu fermoar, sloturi pentru carduri și ferestre transparente pentru documente, plus protecție RFID.\n\nCusătură tonală pe contur și marcaj RFID pe căptușeală. Culoare neutră, calmă, ușor de asortat cu genți în orice nuanță.",
      "en": "Compact wallet in soft beige pebbled leather: a vertical format, leather snap strap and a well-organised interior. Inside — a zip compartment, card slots and clear document windows, plus RFID protection.\n\nTonal edge stitching and RFID marking on the lining. A calm neutral colour that pairs easily with bags in any shade."
    },
    "highlights": {
      "ru": ["Кожа", "Ремешок с кнопкой", "Отделение на молнии", "Защита RFID"],
      "ro": ["Piele", "Curea cu capse", "Compartiment cu fermoar", "Protecție RFID"],
      "en": ["Leather", "Snap strap", "Zip compartment", "RFID protection"]
    }
  },
  "womens-pebbled-leather-trifold-rfid-cardholder-black": {
    "title": {
      "ru": "Nera",
      "ro": "Nera",
      "en": "Nera"
    },
    "description": {
      "ru": "Компактный картхолдер из зернистой чёрной кожи: трёхслойная складная конструкция с клапаном и застёжками на кнопках. Внутри — девять слотов для карт и защита RFID.\n\nТональная строчка по контуру, тиснение «Genuine Leather / Vera Pelle» и маркировка RFID на подкладке. Классический чёрный аксессуар, который подходит к любому образу.",
      "ro": "Portcard compact din piele granulată neagră: construcție pliabilă cu trei panouri, clapă și capse. În interior — nouă sloturi pentru carduri și protecție RFID.\n\nCusătură tonală pe contur, imprimare „Genuine Leather / Vera Pelle” și marcaj RFID pe căptușeală. Accesoriu clasic negru, potrivit oricărei ținute.",
      "en": "Compact card holder in black pebbled leather: a tri-fold design with a flap and snap closures. Inside — nine card slots and RFID protection.\n\nTonal edge stitching, “Genuine Leather / Vera Pelle” embossing and RFID marking on the lining. A classic black accessory that suits any outfit."
    },
    "highlights": {
      "ru": ["Кожа", "Трёхслойная конструкция", "Застёжки на кнопках", "Защита RFID"],
      "ro": ["Piele", "Construcție cu trei panouri", "Capse", "Protecție RFID"],
      "en": ["Leather", "Tri-fold design", "Snap closures", "RFID protection"]
    }
  },
  "womens-pebbled-leather-heart-shaped-handbag": {
    "title": {
      "ru": "Rosalba",
      "ro": "Rosalba",
      "en": "Rosalba"
    },
    "description": {
      "ru": "Сумка в форме сердца из зернистой кожи — узнаваемый силуэт, который добавляет характер даже к простому образу.\n\nЗолотая молния идёт по верхней линии сердца, а съёмный ремень позволяет носить модель в руке или через плечо. Внутри — красная подкладка и аккордеонные перегородки.",
      "ro": "Geantă în formă de inimă din piele granulată — o siluetă ușor de recunoscut, care adaugă personalitate chiar și unei ținute simple.\n\nFermoarul auriu urmează linia superioară a inimii, iar cureaua detașabilă permite purtarea în mână sau pe umăr. Interiorul are căptușeală roșie și compartimente tip acordeon.",
      "en": "A heart-shaped bag in pebbled leather — a distinctive silhouette that adds character even to a simple outfit.\n\nA gold zip follows the top curve of the heart, and a detachable strap lets you carry it by hand or crossbody. Inside — a red leather lining with accordion dividers."
    },
    "highlights": {
      "ru": ["Кожа", "Силуэт в форме сердца", "Короткая ручка и съёмный ремень", "Застёжка на молнии с золотой фурнитурой"],
      "ro": ["Piele", "Siluetă în formă de inimă", "Mâner scurt și curea detașabilă", "Fermoar cu accesorii aurii"],
      "en": ["Leather", "Heart-shaped silhouette", "Short handle and detachable strap", "Zip closure with gold hardware"]
    }
  },
  "womens-pebbled-leather-wing-flap-tote-bag": {
    title: {
      ru: "Solange",
      ro: "Solange",
      en: "Solange",
    },
    description: {
      ru: "Solange — сумка-тоут трапециевидной формы с расклешёнными боками и укороченным клапаном, застёгнутым потайным магнитом. Силуэт выглядит собранно и структурно, при этом остаётся лёгким на плече.\n\nПередний карман на молнии добавляет практичности, а плотная зернистая кожа держит форму бортов даже при полной загрузке. Внутри — просторное отделение для повседневных вещей.",
      ro: "Solange — geantă tote trapezoidală, cu laterale evazate și clapă scurtă pe magnet ascuns. Silueta rămâne structurată, dar ușoară pe umăr.\n\nBuzunarul frontal cu fermoar adaugă practicitate, iar pielea granulată densă păstrează forma lateralelelor chiar și la încărcare maximă. Interior încăpător pentru esențialele zilei.",
      en: "Solange — a trapezoid tote with flared sides and a short flap secured by a hidden magnet. The silhouette stays structured yet light on the shoulder.\n\nA front zip pocket adds practicality, and dense pebbled leather holds the side panels even when fully packed. Inside — a roomy compartment for everyday essentials.",
    },
    highlights: {
      ru: ["Кожа", "Трапециевидный силуэт с расклешёнными боками", "Клапан на потайном магните", "Передний карман на молнии", "Двойные скруглённые ручки"],
      ro: ["Piele", "Siluetă trapezoidală cu laterale evazate", "Clapă pe magnet ascuns", "Buzunar frontal cu fermoar", "Mânere duble rotunjite"],
      en: ["Leather", "Trapezoid silhouette with flared sides", "Hidden-magnet flap", "Front zip pocket", "Double rounded handles"],
    },
  },
  "womens-pebbled-leather-wing-turn-lock-tote-bag": {
    title: {
      ru: "Georgina",
      ro: "Georgina",
      en: "Georgina",
    },
    description: {
      ru: "Тоут трапециевидной формы с расклешёнными боками: широкий верх и собранный центр держат силуэт архитектурным даже без наполнения. Зернистая кожа и золотистая фурнитура — спокойная, но заметная комбинация.\n\nПланка с поворотным замком фиксирует верх, внутри — отделение с центральной перегородкой на молнии и карман на молнии у стенки. В комплекте съёмный плечевой ремень.",
      ro: "Tote trapezoidală cu laterale evazate: partea de sus largă și centrul strâns păstrează silueta arhitecturală chiar și goală. Piele granulată și feronerie aurie — o combinație calmă, dar vizibilă.\n\nBara cu încuietoare rotativă fixează partea de sus; în interior — compartiment cu separator central pe fermoar și buzunar pe perete. Include curea de umăr detașabilă.",
      en: "A trapezoid tote with flared sides: a wide top and gathered center keep the silhouette architectural even when empty. Pebbled leather and gold-tone hardware make a calm but noticeable combination.\n\nA turn-lock bar secures the top; inside — a compartment with a central zip divider and a wall zip pocket. Includes a detachable shoulder strap.",
    },
    highlights: {
      ru: ["Кожа", "Расклешённые боковые панели", "Поворотный замок на передней планке", "Съёмный плечевой ремень"],
      ro: ["Piele", "Panouri laterale evazate", "Încuietoare rotativă pe bara frontală", "Curea de umăr detașabilă"],
      en: ["Leather", "Flared side panels", "Turn lock on the front bar", "Detachable shoulder strap"],
    },
  },
  "womens-pebbled-leather-turn-lock-top-handle-bag-white": {
    title: {
      ru: "Margot",
      ro: "Margot",
      en: "Margot",
    },
    description: {
      ru: "Сумка на короткой ручке с поворотным замком на клапане — щёлкающая застёжка, которая быстро открывается одной рукой.\n\nАккуратные пропорции подходят и для офиса, и для города.",
      ro: "Geantă cu mâner scurt și încuietoare rotativă pe clapă — o închidere care se deschide rapid cu o singură mână.\n\nProporțiile echilibrate potrivesc biroului și orașului.",
      en: "A short-handle bag with a turn lock on the flap — a click closure that opens quickly with one hand.\n\nBalanced proportions work for both the office and the city.",
    },
    highlights: {
      ru: ["Кожа", "Поворотный замок на клапане", "Короткая ручка", "Одно отделение"],
      ro: ["Piele", "Încuietoare rotativă pe clapă", "Mâner scurt", "Un compartiment"],
      en: ["Leather", "Turn lock on the flap", "Short handle", "Single compartment"],
    },
  },
  "womens-pebbled-leather-envelope-turn-lock-chain-bag": {
    title: {
      ru: "Marcelle",
      ro: "Marcelle",
      en: "Marcelle",
    },
    description: {
      ru: "Компактная структурная сумка с конвертным клапаном и поворотным замком: зернистая кожа, золотистая цепочка и собранный прямоугольный силуэт.\n\nВнутри — два отделения с чёрной подкладкой и контрастной строчкой по краю. Подходит для вечера и для городских выходов, когда нужен аккуратный акцент без лишнего объёма.",
      ro: "Geantă compactă structurată cu clapă tip plic și încuietoare rotativă: piele granulată, lanț auriu și siluetă rectangulară strânsă.\n\nÎn interior — două compartimente cu căptușeală neagră și cusătură contrastantă pe margine. Potrivită pentru seară și ieșiri în oraș, când vrei un accent clar fără volum în plus.",
      en: "A compact structured bag with an envelope flap and turn lock: pebbled leather, a gold-tone chain and a clean rectangular silhouette.\n\nInside — two compartments with black lining and contrast edge stitching. Suited to evenings and city outings when you want a precise accent without extra volume.",
    },
    highlights: {
      ru: ["Кожа", "Конвертный клапан на поворотном замке", "Золотистая цепочка", "Два отделения внутри"],
      ro: ["Piele", "Clapă tip plic cu încuietoare rotativă", "Lanț auriu", "Două compartimente interioare"],
      en: ["Leather", "Envelope flap with turn lock", "Gold-tone chain", "Two interior compartments"],
    },
  },
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

const imageAltSuffixes: Record<string, Partial<Record<Locale, string>>> = {
  "вид спереди": { ro: "vedere frontală", en: "front view" },
  "под углом": { ro: "vedere din unghi", en: "angled view" },
  "внутри": { ro: "interior", en: "interior" },
  "вид сверху": { ro: "vedere de sus", en: "top view" },
  "внутренний мешок": { ro: "sac interior", en: "inner pouch" },
  "альтернативный вид": { ro: "vedere alternativă", en: "alternate view" },
  "карточка товара": { ro: "card produs", en: "product card" },
};

/** Localize RU view suffixes in product image alts; keep product/color name prefix. */
export function localizeProductImageAlt(alt: string | undefined, locale: Locale = defaultLocale): string {
  if (!alt) return "";
  if (locale === "ru") return alt;

  const separator = " — ";
  const idx = alt.lastIndexOf(separator);
  if (idx === -1) return localizeStaticText(alt, locale);

  const prefix = alt.slice(0, idx);
  const suffix = alt.slice(idx + separator.length).trim();
  const localizedSuffix = imageAltSuffixes[suffix]?.[locale] ?? localizeStaticText(suffix, locale);
  return `${prefix}${separator}${localizedSuffix}`;
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

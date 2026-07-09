# Shopify Dawn — Materials & Care

Файлы для импорта в тему Dawn:

1. Скопируйте `sections/sora-materials-care.liquid` → `sections/` темы
2. Скопируйте `templates/page.sora-care.json` → `templates/` темы
3. Загрузите в **Assets** темы (или Content → Files + image picker в редакторе):
   - `raffia_texture_closeup.webp`
   - `white_intrecciato_leather_macro.webp`
   - `blue_white_silk_scarf.webp`
   - `minimal_flatlay_sandstone.webp`
4. В Admin: **Online Store → Pages → Add page**
   - Title: Materials and care
   - Theme template: `sora-care`
   - Handle: `materials-care` → URL `/pages/materials-care`

Header/footer темы не меняются — шаблон содержит только секцию `sora-materials-care`.

На сайте Next.js (sorabags.md) страница уже живёт по адресу `/info/materialy-i-uhod`.

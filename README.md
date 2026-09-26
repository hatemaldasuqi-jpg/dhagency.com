# DH Agency Website V3 — SEO Ready

نسخة جاهزة للنشر على Vercel / GitHub مع تشطيب SEO أساسي للدومين الرسمي:
`https://dhagency.world`

## تمت إضافة
- Canonical URL للدومين الرسمي بدون www
- Meta description محسّن
- Open Graph + Twitter Card
- صورة مشاركة 1200×630
- Favicon + Apple Touch Icon + Web App Icons
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- Organization structured data (JSON-LD)

## Google Search Console
أنشئ Domain property باسم `dhagency.world`. Google سيعطيك TXT verification record؛ أضفه في cPanel → Zone Editor واتركه موجودًا بعد التحقق. بعد نجاح التحقق، أرسل:
`https://dhagency.world/sitemap.xml`
من قسم Sitemaps.

## Vercel Web Analytics
من Vercel افتح Analytics للمشروع واضغط Enable. لم أضع script ثابتًا داخل HTML لأن Vercel يولد مسار Analytics خاصًا بالمشروع؛ استخدم المسار الذي يعرضه Vercel بعد التفعيل للـ plain HTML site.

## النشر
استبدل ملفات الـRepository الحالية بمحتويات هذا المجلد ثم Commit/Push. Vercel سيعيد النشر تلقائيًا.

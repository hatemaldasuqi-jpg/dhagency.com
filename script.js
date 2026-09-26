const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); } });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const modal = document.getElementById('posterModal');
const modalImage = document.getElementById('modalImage');
document.querySelectorAll('.poster-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalImage.src = btn.dataset.img;
    modal.showModal();
  });
});
document.getElementById('closeModal')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', e => { if(e.target === modal) modal.close(); });

document.getElementById('year').textContent = new Date().getFullYear();

// CliQ checkout flow
const checkoutModal = document.getElementById('checkoutModal');
const checkoutFormStep = document.getElementById('checkoutFormStep');
const checkoutPayStep = document.getElementById('checkoutPayStep');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutPackage = document.getElementById('checkoutPackage');
const checkoutPrice = document.getElementById('checkoutPrice');
const payPrice = document.getElementById('payPrice');
const orderIdEl = document.getElementById('orderId');
const toast = document.getElementById('copyToast');
let selectedPackage = { name: 'DH MINI', price: '35' };
let currentOrderId = '';

function makeOrderId(){
  const stamp = Date.now().toString().slice(-5);
  const rand = Math.floor(10 + Math.random() * 90);
  return `DH-${stamp}${rand}`;
}
function showCheckoutStep(step){
  checkoutFormStep?.classList.toggle('active', step === 'form');
  checkoutPayStep?.classList.toggle('active', step === 'pay');
}
function showCopyToast(){
  if(!toast) return;
  toast.classList.add('show');
  clearTimeout(window.__dhToastTimer);
  window.__dhToastTimer = setTimeout(() => toast.classList.remove('show'), 1500);
}
async function copyText(text){
  try { await navigator.clipboard.writeText(text); showCopyToast(); }
  catch(err){
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); showCopyToast();
  }
}
function buildOrderText(){
  const name = document.getElementById('customerName')?.value.trim() || '';
  const phone = document.getElementById('customerPhone')?.value.trim() || '';
  const project = document.getElementById('projectName')?.value.trim() || '';
  return `طلب DH Agency\nرقم الطلب: ${currentOrderId}\nالباقة: ${selectedPackage.name}\nالمبلغ: ${selectedPackage.price} JD\nالاسم: ${name}\nرقم الهاتف: ${phone}\nالمشروع: ${project}\nطريقة الدفع: CliQ — DHAG\nتم التحويل، وسأرسل إثبات الدفع.`;
}

document.querySelectorAll('.subscribe-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedPackage = { name: btn.dataset.package, price: btn.dataset.price };
    checkoutPackage.textContent = selectedPackage.name;
    checkoutPrice.textContent = selectedPackage.price;
    payPrice.textContent = selectedPackage.price;
    currentOrderId = '';
    showCheckoutStep('form');
    checkoutModal?.showModal();
  });
});

document.getElementById('closeCheckout')?.addEventListener('click', () => checkoutModal.close());
checkoutModal?.addEventListener('click', e => { if(e.target === checkoutModal) checkoutModal.close(); });
document.getElementById('backCheckout')?.addEventListener('click', () => showCheckoutStep('form'));

checkoutForm?.addEventListener('submit', e => {
  e.preventDefault();
  currentOrderId = makeOrderId();
  orderIdEl.textContent = currentOrderId;
  payPrice.textContent = selectedPackage.price;
  showCheckoutStep('pay');
  updateContactLinks();
});

document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', () => copyText(btn.dataset.copy)));
document.getElementById('copyOrder')?.addEventListener('click', () => copyText(buildOrderText()));
function updateContactLinks(){
  const text = buildOrderText();
  const wa = document.getElementById('sendWhatsApp');
  const email = document.getElementById('sendEmail');
  if(wa) wa.href = `https://wa.me/962798663834?text=${encodeURIComponent(text)}`;
  if(email){
    const subject = `DH Agency - ${currentOrderId} - ${selectedPackage.name}`;
    email.href = `mailto:info@dhagency.world?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text + '\n\nيرجى إرفاق صورة إثبات التحويل قبل الإرسال.')}`;
  }
}

function getOrderData(){
  return {
    orderId: currentOrderId,
    packageName: selectedPackage.name,
    price: selectedPackage.price,
    name: document.getElementById('customerName')?.value.trim() || '',
    phone: document.getElementById('customerPhone')?.value.trim() || '',
    project: document.getElementById('projectName')?.value.trim() || '',
    createdAt: new Date().toISOString()
  };
}
function saveOrderForSuccess(){
  const data = getOrderData();
  try { sessionStorage.setItem('dhOrder', JSON.stringify(data)); } catch(e) {}
  const params = new URLSearchParams({order:data.orderId,pkg:data.packageName,price:data.price});
  window.location.href = `success.html?${params.toString()}`;
}
document.getElementById('confirmTransfer')?.addEventListener('click', saveOrderForSuccess);
document.getElementById('quickWhatsApp')?.addEventListener('click', () => {
  const text = buildOrderText();
  window.open(`https://wa.me/962798663834?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('sendWhatsApp')?.addEventListener('click', updateContactLinks);
document.getElementById('sendEmail')?.addEventListener('click', updateContactLinks);


// V21 — Light/Dark theme + Arabic/English language
const textTranslations = {
  "الخدمات":"Services",
  "أعمالنا":"Work",
  "الباقات":"Packages",
  "ليش DH؟":"Why DH?",
  "الأسئلة":"FAQ",
  "تواصل معنا":"Contact us",
  "نصنع حضورًا":"We build a presence",
  "يليق باسمك.":"worthy of your name.",
  "من الاستراتيجية والتصميم إلى الريلز والإعلانات — نبني محتوى واضح، راقٍ، ومدروس يخلي مشروعك يظهر بثقة.":"From strategy and design to reels and ads — we build clear, refined content that gives your brand a confident presence.",
  "شوف الباقات":"View packages",
  "01 / خدماتنا":"01 / SERVICES",
  "كل شيء تحتاجه صفحتك":"Everything your brand needs",
  "بدون زحمة.":"without the clutter.",
  "إدارة المحتوى":"Content Management",
  "خطة شهرية، كتابة، تصميم، نشر وجدولة بطريقة مرتبة ومتناسقة.":"Monthly planning, copywriting, design, publishing and scheduling — all organized and consistent.",
  "ريلز وهوية بصرية":"Reels & Visual Identity",
  "محتوى قصير وتصاميم تحمل نفس روح البراند وتظهره بشكل احترافي.":"Short-form content and designs that carry one consistent brand identity.",
  "إعلانات ونمو":"Ads & Growth",
  "إعداد الحملات، الاستهداف، التحسين والمتابعة بناءً على الأداء الحقيقي.":"Campaign setup, targeting, optimization and follow-up based on real performance.",
  "02 / أعمالنا":"02 / OUR WORK",
  "شغل مختار من براندات":"Selected work from brands",
  "اشتغلنا معها.":"we've worked with.",
  "Selected work by DH Agency — عرض مختصر من المشاريع التي عملنا عليها.":"Selected work by DH Agency — a snapshot of projects we have worked on.",
  "علامات ومشاريع":"Brands and projects",
  "عملنا معها.":"we've worked with.",
  "مجموعة من البراندات والمشاريع التي تعاون معها فريق DH Agency في السوشال ميديا، المحتوى، الحملات والويب.":"A selection of brands and projects DH Agency has supported across social media, content, campaigns and web.",
  "03 / الباقات":"03 / PACKAGES",
  "اختَر الباقة اللي تناسب":"Choose the package that fits",
  "مرحلة مشروعك.":"your current stage.",
  "بداية خفيفة":"A smart start",
  "للمشاريع الصغيرة اللي بدها محتوى مرتب بدون إدارة كاملة.":"For small businesses that need polished content without full account management.",
  "كتابة الكابشن":"Caption writing",
  "خطة محتوى مصغّرة":"Mini content plan",
  "اشترك الآن":"Subscribe now",
  "عرض التصميم":"View design",
  "حضور ثابت ومرتب":"Consistent presence",
  "للصفحات الجديدة اللي بدها تبدأ بشكل احترافي وواضح.":"For new pages that want to launch with a clear, professional presence.",
  "تقرير أداء شهري":"Monthly performance report",
  "الأكثر طلبًا":"Most requested",
  "نمو فعلي ومستمر":"Real, consistent growth",
  "للأنشطة اللي بدها محتوى أقوى مع إدارة حملة إعلانية.":"For businesses that need stronger content plus ad campaign management.",
  "إدارة حملة إعلانية":"Ad campaign management",
  "إدارة وتسويق متكامل":"Full management & marketing",
  "للبراندات اللي بدها فريق يمسك المحتوى والحملات والمتابعة بشكل أوسع.":"For brands that need broader content, campaign and community management.",
  "Stories يومية":"Daily Stories",
  "حتى 3 حملات إعلانية":"Up to 3 ad campaigns",
  "تقرير أسبوعي + شهري":"Weekly + monthly reporting",
  "* ميزانية الإعلانات الممولة غير مشمولة ضمن أسعار الباقات.":"* Paid media budget is not included in package prices.",
  "موقعك من الصفر.":"Your website from scratch.",
  "جاهز للإطلاق.":"Ready to launch.",
  "باقة مستقلة لتصميم وبرمجة موقع احترافي يعكس هوية مشروعك ويعمل بسلاسة على الموبايل والكمبيوتر.":"A standalone package to design and build a professional website that reflects your brand and works smoothly on mobile and desktop.",
  "تصميم وبرمجة من الصفر":"Design & development from scratch",
  "تصميم متوافق مع هوية البراند":"Brand-aligned design",
  "Responsive لجميع الأجهزة":"Responsive on all devices",
  "تجربة استخدام وسرعة تحميل مرتبة":"Smooth UX and optimized loading",
  "ربط الدومين وتجهيز الإطلاق":"Domain connection & launch setup",
  "* تكلفة الدومين والاستضافة غير مشمولة.":"* Domain and hosting costs are not included.",
  "دفعة واحدة":"One-time payment",
  "اطلب موقعك الآن":"Order your website",
  "الفرق مش بكثرة المحتوى.":"It's not about more content.",
  "الفرق بطريقة تقديمه.":"It's about how it's presented.",
  "هوية واضحة":"Clear identity",
  "كل تصميم وكل Reel يطلع من نفس شخصية البراند.":"Every design and reel follows the same brand personality.",
  "تنفيذ منظم":"Organized execution",
  "خطة ومواعيد ومتابعة بدون فوضى أو قرارات عشوائية.":"A clear plan, deadlines and follow-up without chaos or random decisions.",
  "تفكير بالنمو":"Growth mindset",
  "المحتوى والحملات يخدموا هدف المشروع، مش مجرد شكل.":"Content and campaigns serve the business goal — not just the look.",
  "05 / FAQ":"05 / FAQ",
  "أسئلة قبل الاشتراك.":"Questions before subscribing.",
  "هل ميزانية الإعلانات داخلة بسعر الباقة؟":"Is the ad budget included in the package?",
  "لا. إدارة الحملات تكون حسب الباقة، أما ميزانية Meta نفسها فتكون منفصلة.":"No. Campaign management depends on the package, while the Meta ad spend is separate.",
  "هل بقدر أغير الباقة لاحقًا؟":"Can I change my package later?",
  "أكيد. تقدر تبدأ بالباقة المناسبة حاليًا وتنتقل لباقتك التالية مع نمو احتياجك.":"Yes. Start with the right package now and upgrade as your needs grow.",
  "هل التصوير مشمول؟":"Is photography included?",
  "الإنتاج أو جلسات التصوير الخاصة يتم تسعيرها بشكل منفصل إذا احتاج المشروع.":"Production or dedicated photo shoots are quoted separately when needed.",
  "كيف يتم الدفع؟":"How do I pay?",
  "بعد اختيار الباقة، تقدر تدفع مباشرة عبر CliQ إلى DHAG. يتم تأكيد الاشتراك بعد مراجعة التحويل.":"After choosing a package, pay via CliQ to DHAG. Your subscription is confirmed after the transfer is reviewed.",
  "خلّي حضور مشروعك":"Give your brand presence",
  "يبدأ صح.":"the right start.",
  "تواصل عبر WhatsApp ↗":"Contact us on WhatsApp ↗",
  "الباقة المختارة":"Selected package",
  "أدخل بياناتك لإكمال الطلب":"Enter your details to continue",
  "لن يتم خصم أي مبلغ من الموقع. بعد المتابعة ستظهر لك بيانات التحويل عبر CliQ.":"No charge is taken on the website. Continue to see the CliQ transfer details.",
  "الاسم الكامل":"Full name",
  "رقم الهاتف":"Phone number",
  "اسم المشروع":"Project name",
  "متابعة للدفع":"Continue to payment",
  "رقم الطلب":"Order ID",
  "حوّل قيمة الباقة عبر CliQ":"Transfer the package amount via CliQ",
  "حوّل المبلغ الظاهر أدناه، وبعدها أرسل إثبات التحويل حتى يتم تأكيد اشتراكك.":"Transfer the amount below, then send the payment proof so we can confirm your subscription.",
  "المبلغ المطلوب":"Amount due",
  "البنك":"Bank",
  "اسم المستفيد":"Beneficiary",
  "نسخ":"Copy",
  "يفضّل كتابة رقم الطلب في ملاحظة التحويل إن كان تطبيق البنك يسمح بذلك. لا ترسل أي OTP أو بيانات بطاقة.":"If your banking app allows it, add the order ID in the transfer note. Never send OTPs or card details.",
  "تم التحويل — متابعة التأكيد":"Transfer complete — continue",
  "نسخ تفاصيل الطلب":"Copy order details",
  "فتح WhatsApp مباشرة ↗":"Open WhatsApp ↗",
  "الموقع لا يتحقق من الحوالة تلقائيًا. بعد المتابعة ستظهر صفحة تأكيد الطلب لإرسال صورة الحوالة عبر WhatsApp أو الإيميل.":"The website does not verify transfers automatically. Continue to the confirmation page to send your payment proof by WhatsApp or email.",
  "رجوع وتعديل البيانات":"Back and edit details",
  "تم النسخ ✓":"Copied ✓",
  "الدفع عبر CliQ":"Pay via CliQ"
};
const reverseTextTranslations = Object.fromEntries(Object.entries(textTranslations).map(([ar,en]) => [en,ar]));
const placeholderTranslations = {
  "اسمك الكامل":"Full name",
  "07XXXXXXXX":"07XXXXXXXX",
  "اسم البراند أو المشروع":"Brand or project name"
};
const reversePlaceholderTranslations = Object.fromEntries(Object.entries(placeholderTranslations).map(([ar,en]) => [en,ar]));
let currentLanguage = localStorage.getItem('dh-lang') || 'ar';

function replaceTextNodes(map){
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if(!trimmed || !map[trimmed]) return;
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    node.nodeValue = leading + map[trimmed] + trailing;
  });
}
function translateAttributes(map){
  document.querySelectorAll('input[placeholder]').forEach(el => {
    const v = el.getAttribute('placeholder'); if(map[v]) el.setAttribute('placeholder', map[v]);
  });
}
function applyLanguage(lang, initial=false){
  if(lang === currentLanguage && !initial) return;
  const from = currentLanguage;
  if(lang === 'en'){
    if(from === 'ar' || initial) replaceTextNodes(textTranslations);
    translateAttributes(placeholderTranslations);
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.title = 'DH Agency | Social Media, Content & Ads in Jordan';
    document.querySelector('meta[name="description"]')?.setAttribute('content','DH Agency in Amman — social media management, content creation, reels, web design and ad campaigns for growing brands.');
  } else {
    if(from === 'en' || initial) replaceTextNodes(reverseTextTranslations);
    translateAttributes(reversePlaceholderTranslations);
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.title = 'DH Agency | سوشال ميديا، محتوى وإعلانات في الأردن';
    document.querySelector('meta[name="description"]')?.setAttribute('content','DH Agency في عمّان — إدارة سوشال ميديا، صناعة محتوى، ريلز، تصميم وإدارة حملات إعلانية بخطط واضحة تناسب نمو مشروعك.');
  }
  currentLanguage = lang;
  localStorage.setItem('dh-lang', lang);
  const langText = document.getElementById('langToggleText');
  if(langText) langText.textContent = lang === 'ar' ? 'EN' : 'AR';
  const langBtn = document.getElementById('langToggle');
  if(langBtn) langBtn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  const themeText = document.getElementById('themeToggleText');
  if(themeText) themeText.textContent = document.documentElement.dataset.theme === 'dark' ? (lang === 'ar' ? 'فاتح' : 'Light') : (lang === 'ar' ? 'داكن' : 'Dark');
  const waFloat = document.querySelector('.whatsapp-float');
  if(waFloat){
    const msg = lang === 'ar' ? 'مرحبا DH Agency، أريد الاستفسار عن خدماتكم.' : 'Hello DH Agency, I would like to ask about your services.';
    waFloat.href = `https://wa.me/962798663834?text=${encodeURIComponent(msg)}`;
    waFloat.setAttribute('aria-label', lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp');
  }
}

function applyTheme(theme){
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('dh-theme', theme);
  const icon = document.getElementById('themeIcon');
  const txt = document.getElementById('themeToggleText');
  if(icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
  if(txt) txt.textContent = theme === 'dark' ? (currentLanguage === 'ar' ? 'فاتح' : 'Light') : (currentLanguage === 'ar' ? 'داكن' : 'Dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d0e11' : '#f4f2ee');
}

const savedTheme = localStorage.getItem('dh-theme') || 'light';
applyTheme(savedTheme);
const savedLang = localStorage.getItem('dh-lang') || 'ar';
currentLanguage = savedLang === 'en' ? 'ar' : 'en'; // force first pass
applyLanguage(savedLang, true);

document.getElementById('themeToggle')?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
document.getElementById('langToggle')?.addEventListener('click', () => applyLanguage(currentLanguage === 'ar' ? 'en' : 'ar'));

// Make checkout order text follow the active language.
const _originalBuildOrderText = buildOrderText;
buildOrderText = function(){
  const name = document.getElementById('customerName')?.value.trim() || '';
  const phone = document.getElementById('customerPhone')?.value.trim() || '';
  const project = document.getElementById('projectName')?.value.trim() || '';
  if(currentLanguage === 'en'){
    return `DH Agency Order\nOrder ID: ${currentOrderId}\nPackage: ${selectedPackage.name}\nAmount: ${selectedPackage.price} JD\nName: ${name}\nPhone: ${phone}\nProject: ${project}\nPayment: CliQ — DHAG\nTransfer completed; I will send the payment proof.`;
  }
  return _originalBuildOrderText();
};

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const packages = {
  mini: {
    label:'DH MINI', price:'35', color:'#ef7d2d', colorName:'ORANGE', image:'assets/packages/mini.png',
    ar:{title:'بداية خفيفة… بشكل احترافي',desc:'للمشاريع الصغيرة أو العملاء اللي بدهم محتوى مرتب بتكلفة خفيفة.',features:['4 Posts احترافية','1 Reel بسيط','4 Stories','كتابة الكابشن للمحتوى','تنسيق المحتوى مع هوية البراند','خطة محتوى مصغّرة للشهر','تعديل واحد لكل تصميم'],note:'إدارة الحسابات، النشر والجدولة، الرسائل والتعليقات، إدارة الإعلانات وميزانية الإعلانات غير مشمولة.'},
    en:{title:'A light start, done professionally.',desc:'For small businesses that need clean, consistent content on a lighter budget.',features:['4 professional posts','1 simple reel','4 stories','Caption writing','Content aligned with brand identity','Mini monthly content plan','One revision per design'],note:'Account management, publishing, community management, ads management and ad spend are not included.'}
  },
  start: {
    label:'DH START', price:'99', color:'#102b56', colorName:'NAVY', image:'assets/packages/start.png',
    ar:{title:'ابدأ حضورك الرقمي بشكل احترافي',desc:'للمشاريع الجديدة والصفحات اللي بدها محتوى ثابت ومرتب مع إدارة أساسية للحسابات.',features:['8 Posts احترافية','3 Reels','12 Stories','إدارة Instagram + Facebook','كتابة المحتوى والكابشن','تصميم كامل للمحتوى','جدولة ونشر المحتوى','خطة محتوى شهرية','تقرير أداء شهري'],note:'الإعلانات الممولة وإدارة الحملات غير مشمولة في هذه الباقة.'},
    en:{title:'Start your digital presence professionally.',desc:'For new businesses that need consistent content and essential social account management.',features:['8 professional posts','3 reels','12 stories','Instagram + Facebook management','Copy & captions','Full content design','Scheduling & publishing','Monthly content plan','Monthly performance report'],note:'Paid ads and campaign management are not included in this package.'}
  },
  growth: {
    label:'DH GROWTH', price:'179', color:'#0b704e', colorName:'EMERALD', image:'assets/packages/growth.png',
    ar:{title:'نمّي حضورك الرقمي ووسّع وصولك',desc:'للأنشطة اللي تحتاج محتوى أقوى، حضوراً منتظماً وإدارة تساعد على النمو وجذب العملاء.',features:['12 Posts احترافية','6 Reels','20 Stories','إدارة Instagram + Facebook','كتابة المحتوى والكابشن','تصميم كامل للمحتوى','جدولة ونشر المحتوى','خطة محتوى شهرية','تقرير أداء شهري','إدارة حملة إعلانية واحدة'],note:'ميزانية الإعلانات الممولة غير مشمولة في هذه الباقة.'},
    en:{title:'Grow your presence and widen your reach.',desc:'For brands that need stronger content, consistent activity and hands-on growth support.',features:['12 professional posts','6 reels','20 stories','Instagram + Facebook management','Copy & captions','Full content design','Scheduling & publishing','Monthly content plan','Monthly performance report','1 ad campaign managed'],note:'Paid media budget is not included in this package.'}
  },
  scale: {
    label:'DH SCALE', price:'299', color:'#6b155d', colorName:'PLUM', image:'assets/packages/scale.png',
    ar:{title:'انطلق لأبعد من ذلك',desc:'إدارة متكاملة وحملات مدروسة للبراندات اللي بدها نمو حقيقي ومتابعة أقوى.',features:['16 Posts احترافية','10 Reels','Stories يومية','إدارة Instagram + Facebook','كتابة المحتوى والكابشن','تصميم كامل للمحتوى','جدولة ونشر','خطة محتوى متقدمة','إدارة التعليقات والرسائل','إدارة حتى 3 حملات إعلانية','استهداف وتحسين الإعلانات','تقرير أسبوعي + شهري','جلسة استراتيجية شهرية'],note:'ميزانية الإعلانات الممولة غير مشمولة في هذه الباقة.'},
    en:{title:'Scale beyond the basics.',desc:'Full-service management and structured campaigns for brands ready for stronger growth.',features:['16 professional posts','10 reels','Daily stories','Instagram + Facebook management','Copy & captions','Full content design','Scheduling & publishing','Advanced content plan','Comments & messages management','Up to 3 ad campaigns','Targeting & ad optimization','Weekly + monthly reporting','Monthly strategy session'],note:'Paid media budget is not included in this package.'}
  }
};

const i18n = {
 ar:{
  'nav.services':'خدماتنا','nav.packages':'الباقات','nav.process':'كيف نعمل','nav.faq':'الأسئلة','nav.contact':'راسلنا',
  'hero.kicker':'SOCIAL • CONTENT • MARKETING','hero.title':'مو بس محتوى.<br><em>نبني حضور يتحرّك.</em>','hero.body':'استراتيجية، تصميم، ريلز وإدارة حملات — بهوية راقية وتنفيذ واضح يخلي مشروعك يظهر بثقة ويكبر بخطوات مدروسة.','hero.cta':'استكشف الباقات',
  'services.kicker':'WHAT WE DO','services.title':'من الفكرة إلى حضور<br>يُلاحظ ويُتذكر.','services.s1t':'إدارة السوشال ميديا','services.s1b':'خطة محتوى، نشر، تنسيق الحسابات ومتابعة الأداء بصورة منظمة.','services.s2t':'تصميم وهوية المحتوى','services.s2b':'تصاميم متناسقة تحافظ على هوية البراند وتخليه واضح من أول نظرة.','services.s3t':'ريلز ومحتوى قصير','services.s3b':'أفكار وإخراج محتوى سريع يناسب المنصات ويخدم هدف الصفحة.','services.s4t':'إدارة الإعلانات','services.s4b':'إعداد الحملات، الاستهداف، المتابعة والتحسين للوصول لنتائج أفضل.',
  'packages.kicker':'PACKAGES','packages.title':'اختَر مستوى النمو<br>المناسب لمشروعك.','packages.popular':'الأكثر طلباً','packages.cta':'اختَر هذه الباقة','packages.poster':'عرض التصميم',
  'compare.title':'مقارنة سريعة','compare.body':'الفرق الأساسي بين الباقات، بدون تعقيد.','compare.feature':'الخدمة','compare.posts':'Posts','compare.daily':'يومية','compare.management':'إدارة الحسابات','compare.ads':'إدارة حملات','compare.community':'التعليقات والرسائل','compare.basic':'أساسية','compare.report':'التقارير','compare.monthly':'شهري','compare.weekly':'أسبوعي + شهري','compare.note':'* ميزانية الإعلانات الممولة غير مشمولة ضمن أسعار الباقات.',
  'process.kicker':'PROCESS','process.title':'شغل واضح.<br>خطوات واضحة.','process.p1t':'نفهم المشروع','process.p1b':'نجمع أهدافك، جمهورك، العرض الأساسي وهوية البراند قبل أي تصميم.','process.p2t':'نبني الخطة','process.p2b':'نحدد نوع المحتوى، الرسائل، جدول النشر وأولويات الحملات.','process.p3t':'ننفّذ وننشر','process.p3b':'تصميم، كتابة، ريلز وجدولة بأسلوب متناسق مع الهوية.','process.p4t':'نراجع ونحسّن','process.p4b':'نقرأ النتائج ونعدّل المحتوى والحملات بناءً على الأداء الحقيقي.',
  'cta.title':'جاهز نخلي مشروعك<br><em>يبان بشكل يليق فيه؟</em>','cta.body':'ابعثلنا نوع مشروعك وهدفك، ونساعدك تختار الباقة الأنسب.','cta.button':'ابدأ المحادثة',
  'faq.title':'قبل ما تبدأ.','faq.q1':'هل ميزانية الإعلانات داخلة في سعر الباقة؟','faq.a1':'لا. سعر الباقة يغطي إدارة الحملة حسب الباقة، أما ميزانية Meta نفسها فيدفعها العميل بشكل منفصل.','faq.q2':'هل أقدر أبدأ ببكج MINI وبعدها أطور؟','faq.a2':'أكيد. MINI معمولة كبداية خفيفة، وتقدر تنتقل لأي باقة أعلى لما تزيد حاجتك للإدارة والمحتوى.','faq.q3':'شو الفرق بين GROWTH وSCALE؟','faq.a3':'GROWTH مناسبة للنمو المنتظم مع حملة واحدة، بينما SCALE تشمل محتوى أكثر، Stories يومية، إدارة مجتمع وحتى 3 حملات مع متابعة وتقارير أوسع.','faq.q4':'هل المحتوى مناسب لكل المجالات؟','faq.a4':'الخطة تتكيّف حسب المجال والجمهور، لكن حجم التصوير أو الإنتاج الخاص قد يُسعّر بشكل منفصل إذا احتاج المشروع ذلك.','footer.nav':'روابط','footer.social':'تواصل'
 },
 en:{
  'nav.services':'Services','nav.packages':'Packages','nav.process':'Process','nav.faq':'FAQ','nav.contact':'Message us',
  'hero.kicker':'SOCIAL • CONTENT • MARKETING','hero.title':'More than content.<br><em>We build momentum.</em>','hero.body':'Strategy, design, reels and campaign management — wrapped in a premium brand presence and a clear growth system.','hero.cta':'Explore packages',
  'services.kicker':'WHAT WE DO','services.title':'From idea to a presence<br>people remember.','services.s1t':'Social media management','services.s1b':'Content planning, publishing, account structure and performance follow-up.','services.s2t':'Content design & identity','services.s2b':'Consistent visuals that preserve your brand and make it instantly recognizable.','services.s3t':'Reels & short-form content','services.s3b':'Fast, platform-native ideas and execution built around your page goals.','services.s4t':'Ads management','services.s4b':'Campaign setup, targeting, monitoring and optimization for better outcomes.',
  'packages.kicker':'PACKAGES','packages.title':'Choose the growth level<br>that fits your business.','packages.popular':'MOST POPULAR','packages.cta':'Choose this package','packages.poster':'View artwork',
  'compare.title':'Quick comparison','compare.body':'The core difference between packages, at a glance.','compare.feature':'Feature','compare.posts':'Posts','compare.daily':'Daily','compare.management':'Account management','compare.ads':'Ad campaigns','compare.community':'Comments & messages','compare.basic':'Basic','compare.report':'Reporting','compare.monthly':'Monthly','compare.weekly':'Weekly + monthly','compare.note':'* Paid media spend is not included in package prices.',
  'process.kicker':'PROCESS','process.title':'Clear work.<br>Clear steps.','process.p1t':'Understand the business','process.p1b':'We map your goals, audience, offer and brand before creating anything.','process.p2t':'Build the plan','process.p2b':'We define content types, messages, publishing rhythm and campaign priorities.','process.p3t':'Create & publish','process.p3b':'Design, copy, reels and scheduling — all aligned with your identity.','process.p4t':'Review & improve','process.p4b':'We read real performance and optimize content and campaigns accordingly.',
  'cta.title':'Ready to make your business<br><em>look the part?</em>','cta.body':'Send us your business type and goal, and we’ll help you choose the right package.','cta.button':'Start a conversation',
  'faq.title':'Before you start.','faq.q1':'Is ad spend included in the package price?','faq.a1':'No. Package pricing covers campaign management where listed. The Meta media budget is paid separately by the client.','faq.q2':'Can I start with MINI and upgrade later?','faq.a2':'Yes. MINI is designed as a lightweight start, and you can move up whenever you need more management and content.','faq.q3':'What is the difference between GROWTH and SCALE?','faq.a3':'GROWTH supports consistent growth with one campaign. SCALE adds more content, daily stories, community management, up to 3 campaigns and more frequent reporting.','faq.q4':'Does the content work for every industry?','faq.a4':'The strategy adapts to your audience and industry. Special filming or larger production requirements may be quoted separately.','footer.nav':'Links','footer.social':'Social'
 }
};

let lang = localStorage.getItem('dh-lang') || 'ar';
let currentPackage = 'mini';

function setLanguage(next){
  lang = next;
  localStorage.setItem('dh-lang',lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $('#langToggle').textContent = lang === 'ar' ? 'EN' : 'AR';
  $$('[data-i18n]').forEach(el=>{ const val=i18n[lang][el.dataset.i18n]; if(val) el.innerHTML=val; });
  renderPackage(currentPackage);
}
function renderPackage(key){
  currentPackage = key; const p = packages[key]; const c = p[lang];
  $('#packageStage').style.setProperty('--pkg',p.color);
  $('#packageLabel').textContent=p.label; $('#packagePrice').textContent=p.price; $('#packageTitle').textContent=c.title; $('#packageDescription').textContent=c.desc; $('#packageNote').textContent=c.note;
  $('#packageImage').src=p.image; $('#modalImage').src=p.image; $('#packageImage').alt=`${p.label} package design`; $('#artColorName').textContent=p.colorName;
  $('#packageFeatures').innerHTML=c.features.map(x=>`<li>${x}</li>`).join('');
  $$('.tab').forEach(t=>t.classList.toggle('active',t.dataset.package===key));
}
$$('.tab').forEach(t=>t.addEventListener('click',()=>renderPackage(t.dataset.package)));
$('#langToggle').addEventListener('click',()=>setLanguage(lang==='ar'?'en':'ar'));

const savedTheme = localStorage.getItem('dh-theme');
if(savedTheme==='dark') document.documentElement.dataset.theme='dark';
$('#themeToggle').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme==='dark';document.documentElement.dataset.theme=dark?'light':'dark';localStorage.setItem('dh-theme',dark?'light':'dark')});

$('#menuBtn').addEventListener('click',()=>$('#navLinks').classList.toggle('open'));
$$('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));

const modal=$('#posterModal'); $('#viewPoster').addEventListener('click',()=>modal.showModal()); $('#closePoster').addEventListener('click',()=>modal.close()); modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12}); $$('.reveal').forEach(el=>observer.observe(el));
$('#year').textContent=new Date().getFullYear();
setLanguage(lang); renderPackage('mini');

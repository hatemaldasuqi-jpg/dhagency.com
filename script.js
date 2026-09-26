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
  return `طلب اشتراك DH Agency\nرقم الطلب: ${currentOrderId}\nالباقة: ${selectedPackage.name}\nالمبلغ: ${selectedPackage.price} JD\nالاسم: ${name}\nرقم الهاتف: ${phone}\nالمشروع: ${project}\nطريقة الدفع: CliQ — DHAG\nتم التحويل، وسأرسل إثبات الدفع.`;
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
  if(wa) wa.href = `https://wa.me/962796883834?text=${encodeURIComponent(text)}`;
  if(email){
    const subject = `DH Agency - ${currentOrderId} - ${selectedPackage.name}`;
    email.href = `mailto:info@dhagency.world?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text + '\n\nيرجى إرفاق صورة إثبات التحويل قبل الإرسال.')}`;
  }
}
document.getElementById('sendWhatsApp')?.addEventListener('click', updateContactLinks);
document.getElementById('sendEmail')?.addEventListener('click', updateContactLinks);

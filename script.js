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

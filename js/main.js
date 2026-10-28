// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Reveal on scroll
const revealEls = document.querySelectorAll(
  '.quote-section .container, .section-head, .acro-card, .pillar, .vision-statement .container, .about-grid > *, .edu-grid article, .lead-columns > div, .chips li, .flyer-grid > *, .join .container, .pledge-grid > *'
);
const showAll = () => revealEls.forEach(el => el.classList.add('in'));
if ('IntersectionObserver' in window) {
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
  // Fail-safe: never leave content hidden (print, screenshots, odd scroll containers)
  setTimeout(showAll, 2500);
  window.addEventListener('beforeprint', showAll);
}

// Share
async function shareCampaign() {
  const data = {
    title: 'Dr. Marshawn C. Wilbourn, Sr. — 16th Arkansas District Director',
    text: 'The Legacy Continues. The Brotherhood Advances. A.L.P.H.A. F.O.R.W.A.R.D.',
    url: window.location.href.split('#')[0]
  };
  const note = document.getElementById('shareNote');
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(data.url);
      note.textContent = 'Link copied! Send it to a brother.';
    } else {
      note.textContent = 'Copy this page link from your browser to share.';
    }
  } catch (err) { /* user cancelled */ }
}
['shareBtn', 'shareBtn2'].forEach(id => {
  const b = document.getElementById(id);
  if (b) b.addEventListener('click', shareCampaign);
});

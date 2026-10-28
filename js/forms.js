// Contact form.
// Delivery order:
//   1. SITE_CONFIG.FORM_ENDPOINT (Formspree etc.) — use this on GitHub Pages
//   2. Genspark table API (tables/messages) — only exists on Genspark hosting
//   3. SITE_CONFIG.CONTACT_EMAIL — opens the visitor's email app as a last resort
const CFG = window.SITE_CONFIG || {};

async function sendToEndpoint(data) {
  const res = await fetch(CFG.FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Endpoint failed: ' + res.status);
}

async function sendToTable(data) {
  const res = await fetch('tables/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Save failed: ' + res.status);
}

function sendByMailto(data) {
  const subject = encodeURIComponent('[Campaign Website] ' + data.topic + ' — ' + data.full_name);
  const body = encodeURIComponent(
    'Name: ' + data.full_name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone +
    '\nChapter: ' + data.chapter + '\nTopic: ' + data.topic + '\n\n' + data.message
  );
  window.location.href = 'mailto:' + CFG.CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
}

async function deliver(data) {
  if (CFG.FORM_ENDPOINT) return sendToEndpoint(data);
  try {
    return await sendToTable(data);
  } catch (err) {
    if (CFG.CONTACT_EMAIL) return sendByMailto(data);
    throw err;
  }
}

const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const val = (f, n) => (f.elements[n].value || '').trim();

(function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const fields = form.querySelector('.form-fields');
  const success = document.getElementById('contactSuccess');
  const errBox = document.getElementById('contactError');
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errBox.hidden = true;

    const data = {
      full_name: val(form, 'full_name'),
      email: val(form, 'email'),
      phone: val(form, 'phone'),
      chapter: val(form, 'chapter'),
      topic: val(form, 'topic'),
      message: val(form, 'message')
    };
    let msg = '';
    if (!data.full_name) msg = 'Please enter your name.';
    else if (!emailOk(data.email)) msg = 'Please enter a valid email address.';
    else if (!data.topic) msg = 'Please choose a topic.';
    else if (!data.message) msg = 'Please enter a message.';
    if (msg) { errBox.textContent = msg; errBox.hidden = false; return; }

    const label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      await deliver(data);
      fields.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (err) {
      errBox.textContent = 'Sorry, your message could not be sent right now. Please try again in a moment.';
      errBox.hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = label;
    }
  });

  form.querySelector('[data-reset]').addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    fields.hidden = false;
  });
})();

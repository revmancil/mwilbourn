// ------------------------------------------------------------------
// Contact form settings (for GitHub Pages hosting)
//
// GitHub Pages can only serve static files, so the contact form needs an
// outside service to receive messages and email them to the campaign.
//
// Easiest option: Formspree (https://formspree.io) — free plan available.
//   1. Create a free account and a new form, using the campaign email.
//   2. Copy the form URL, which looks like https://formspree.io/f/abcdwxyz
//   3. Paste it between the quotes below, then commit and push.
//
// Web3Forms, Getform, or any service that accepts a JSON POST also works.
// ------------------------------------------------------------------
window.SITE_CONFIG = {
  FORM_ENDPOINT: '',        // e.g. 'https://formspree.io/f/abcdwxyz'
  CONTACT_EMAIL: ''         // optional fallback: opens the visitor's email app, e.g. 'campaign@example.com'
};

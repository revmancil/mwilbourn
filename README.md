# Dr. Marshawn C. Wilbourn, Sr. — Campaign Website

Campaign site for the 16th Arkansas District Director race, Alpha Phi Alpha Fraternity, Inc.
Theme: "Built on Legacy. United in Brotherhood. Moving Alpha Forward." — black & old gold.

## Structure
- `index.html` — single-page site (hero, quote, A.L.P.H.A. F.O.R.W.A.R.D. platform, vision statement, about, education, leadership timeline, community service, flyer, join/share, footer)
- `css/style.css` — styles (responsive, mobile nav at ≤960px)
- `js/main.js` — mobile menu, scroll reveal (with fail-safe), share / copy-link button
- `images/` — `marshawn-portrait.jpg`, `couple.jpg`, `campaign-flyer.jpg`, `ar-district-seal.png`

## Content source
Taken from the supplied campaign info and the candidate's application pages (degrees, offices held, committees, community memberships, vision statement). The one-line descriptions under each A.L.P.H.A. / F.O.R.W.A.R.D. item are draft copy — please review/edit in `index.html`.

## Forms
- (The "Pledge Your Support" section was removed at the owner's request; the unused `pledges` table schema remains.)
- `#contact` — "Contact the Campaign" form → table `messages` (name, email, phone, chapter, topic, message)
- Logic in `js/forms.js` (POST to relative `tables/pledges` / `tables/messages`, validation, success state)

## Storage
Platform tables `pledges` and `messages` (schema in `.tables/schema.json`). Preview and live (Hosted Deploy) databases are separate; the live one starts empty.

## Next steps / ideas
- Review the draft platform descriptions; add election date & voting info
- Restrict who can read pledges/messages (they contain emails/phones) with Hosted Access Rules once an admin email is chosen
- Optional: public supporter wall using pledges where public_ok = true; social links
- Publish via Hosted Deploy when ready

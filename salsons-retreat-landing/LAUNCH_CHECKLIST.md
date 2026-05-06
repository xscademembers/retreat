# Salsons Retreat Landing Page — Launch Checklist

Before launching the new landing page, ensure all of the following items are completed:

- [ ] **Content Filled**: All `{{PLACEHOLDER}}` tags from `CONTENT_NEEDED.md` have been replaced with actual content in `index.html`.
- [ ] **Phone Numbers**: The correct phone number (`+91 80747 99387` or another) is updated across all CTAs.
- [ ] **Google My Business URL**: `{{GMB_URL}}` is updated in the trust bar and distance block.
- [ ] **Google Tag Manager**: `{{GTM_ID}}` is replaced with the actual GTM container ID in the `<head>` and `<body>`.
- [ ] **Google Ads Conversion Linked**: In Google Ads, ensure that the `call_click_*` events (fired by GTM) are set as primary conversion actions.
- [ ] **Lighthouse Performance**: Run Lighthouse on mobile to ensure the performance score is ≥ 90 and LCP is < 2.0s.
- [ ] **Rich Results Test**: Validate the page with Google's Rich Results Test tool to ensure the JSON-LD schemas (LodgingBusiness, FAQPage) are valid.
- [ ] **Accessibility Check**: Run a quick accessibility scan (e.g., using axe or WAVE) to ensure 0 critical issues.
- [ ] **GMB Rating**: Update `{{RATING}}` and `{{REVIEW_COUNT}}` with live numbers from Google My Business.

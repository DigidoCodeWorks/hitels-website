// Backend for the /contact-us form (src/components/contact/ContactForm.tsx)
// AND the pricing card signup modal
// (src/components/shared/PricingSignupModal.tsx) — both POST here. Both
// append a row to the spreadsheet (pricing signups leave Phone number/
// Message blank and fill in Plan instead, and vice versa) AND email
// LEAD_NOTIFICATION_EMAIL via Resend (resend.com), with their own
// subject/body below:
// https://docs.google.com/spreadsheets/d/1-R6FaPLGuE355EEsPv-k_hkbMv9WiELmimgMYOKsOSI
// The site is a static Astro build with no server, so form submissions are
// sent straight to this Google Apps Script Web App.
//
// One-time setup:
// 1. Open the spreadsheet above, then Extensions -> Apps Script.
// 2. Delete the default Code.gs contents and paste this whole file in.
// 3. Project Settings (gear icon) -> Script Properties -> add a property
//    named RESEND_API_KEY with a key from https://resend.com/api-keys.
//    Script Properties are Apps Script's env-var equivalent -- this repo's
//    .env never reaches Apps Script, which runs on Google's servers, not CI.
// 4. FROM_EMAIL uses notifications@hitels.is -- hitels.is is verified in
//    Resend (Domains tab), so this can send to anyone, not just the
//    account's own address like the onboarding@resend.dev sandbox sender.
// 5. Deploy -> New deployment -> type "Web app".
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copy the resulting /exec URL into PUBLIC_CONTACT_FORM_ENDPOINT in .env
//    (see .env.example).
// 7. Re-run "Deploy -> Manage deployments" and create a new version any time
//    this file changes — edits to the script don't apply to an existing
//    deployment until you do.

const SHEET_NAME = 'Sheet1';
const LEAD_NOTIFICATION_EMAIL = 'hi@hitels.is';
const FROM_EMAIL = 'Hitels Website <notifications@hitels.is>';

function sendViaResend({ to, subject, text }) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY script property -- see setup notes at the top of this file.');
  }

  const response = UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${apiKey}` },
    payload: JSON.stringify({ from: FROM_EMAIL, to, subject, text }),
    muteHttpExceptions: true,
  });

  if (response.getResponseCode() >= 300) {
    throw new Error(`Resend API error (${response.getResponseCode()}): ${response.getContentText()}`);
  }
}

function doPost(e) {
  // The client submits as FormData (multipart/form-data), not JSON -- see
  // the comment in ContactForm.tsx explaining why (CORS preflight avoidance).
  // Apps Script parses multipart/form-urlencoded fields into e.parameter,
  // not e.postData.contents (that's only JSON-parseable for a literal
  // application/json body, which this isn't).
  const data = e.parameter;
  const isPricingSignup = Boolean(data.plan);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Hotel name', 'Email', 'Phone number', 'Message', 'Plan']);
  }

  // The row below is the source of truth for both form types; don't let a
  // Resend hiccup (bad key, rate limit) turn an already-saved lead into a
  // failed response to the visitor. Failures land in the Apps Script
  // execution log (Executions tab) instead.
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.hotelName || '',
    data.email || '',
    data.phone || '',
    data.message || '',
    data.plan || '',
  ]);

  try {
    if (isPricingSignup) {
      sendViaResend({
        to: LEAD_NOTIFICATION_EMAIL,
        subject: `New pricing signup — ${data.plan}`,
        text: [
          `Plan: ${data.plan}`,
          `Name: ${data.name || ''}`,
          `Hotel name: ${data.hotelName || ''}`,
          `Email: ${data.email || ''}`,
        ].join('\n'),
      });
    } else {
      sendViaResend({
        to: LEAD_NOTIFICATION_EMAIL,
        subject: `New contact form message from ${data.name || 'website visitor'}`,
        text: [
          `Name: ${data.name || ''}`,
          `Hotel name: ${data.hotelName || ''}`,
          `Email: ${data.email || ''}`,
          `Phone: ${data.phone || ''}`,
          '',
          data.message || '',
        ].join('\n'),
      });
    }
  } catch (err) {
    console.error('Resend notification failed:', err);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

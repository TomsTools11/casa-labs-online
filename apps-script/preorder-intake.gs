/**
 * CASA Labs — Pre-Order Intake (Google Apps Script Web App)
 *
 * Receives pre-order submissions from casalabs.shop (JSON POST, text/plain
 * body — see src/lib/preorder/submit.ts) and appends them to a "Pre-Orders"
 * sheet in the bound spreadsheet, then emails a notification.
 *
 * Setup: see apps-script/README.md in this repo.
 */

var NOTIFY_EMAIL = 'alex@casalabs.shop'; // set to '' to disable email notifications
var SHEET_NAME = 'Pre-Orders';

var HEADERS = [
  'Timestamp',
  'Order #',
  'Tier',
  'Name',
  'Email',
  'Phone',
  'Organization',
  'Origin Qty',
  'Metabolic Qty',
  'Neuro Qty',
  'Estimated Total',
  'Notes',
  'Order Summary',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot: real users never fill the hidden "company" field.
    if (data.company) {
      return ContentService.createTextOutput('ok');
    }

    // The endpoint is public, so serialize the read-then-append pair — without
    // a lock, two simultaneous submissions would both read the same last row
    // and get duplicate Order #s (the column that enforces the tier caps).
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    var orderNumber;
    try {
      var sheet = getSheet_();
      orderNumber = sheet.getLastRow(); // header is row 1, so first order = 1
      sheet.appendRow([
        new Date(),
        orderNumber,
        text_(data.tier),
        text_(data.name),
        text_(data.email),
        text_(data.phone),
        text_(data.organization),
        Number(data.qty_origin) || 0,
        Number(data.qty_metabolic) || 0,
        Number(data.qty_neuro) || 0,
        text_(data.total),
        text_(data.notes),
        text_(data.order_summary),
      ]);
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'CASA Labs pre-order #' + orderNumber + ' — ' + (data.tier || '?') + ' — ' + (data.name || '?'),
        body:
          'New pre-order reservation (#' + orderNumber + ' by order sequence)\n\n' +
          (data.order_summary || '') +
          '\n\n---\nName: ' + (data.name || '-') +
          '\nEmail: ' + (data.email || '-') +
          '\nPhone: ' + (data.phone || '-') +
          '\nOrganization: ' + (data.organization || '-') +
          '\nNotes: ' + (data.notes || '-') +
          '\n\nSheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      });
    }

    return ContentService.createTextOutput('ok');
  } catch (err) {
    // Log and still return 200 — the site fires-and-forgets (no-cors).
    console.error(err);
    return ContentService.createTextOutput('error');
  }
}

/**
 * Coerce a user-supplied value to inert text. Sheets executes cell values
 * starting with = + - @ (or tab/CR) as live formulas, and this endpoint is
 * public — a crafted "name" like =IMPORTXML(...) could exfiltrate the sheet
 * the moment it's opened. A leading apostrophe forces plain text.
 */
function text_(v) {
  v = String(v == null ? '' : v);
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Run once from the editor to authorize Sheets + Mail scopes before deploying. */
function authorize() {
  getSheet_();
  if (NOTIFY_EMAIL) {
    MailApp.getRemainingDailyQuota();
  }
}

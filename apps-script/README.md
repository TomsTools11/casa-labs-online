# Pre-Order Intake — Google Apps Script Setup

Pre-order submissions from casalabs.shop POST to a Google Apps Script Web App,
which appends each order to a Google Sheet and emails a notification to
`alex@casalabs.shop`. The Sheet doubles as the **order-sequence tracker** for
the tier caps (first 10 = Founding, next 50 = Early 50) — the `Order #` column
is assigned by arrival order.

Until the endpoint is deployed and configured, the site falls back to opening
a pre-filled email in the visitor's mail app, so nothing breaks in the meantime.

## One-time setup (~5 minutes)

1. Go to [sheets.new](https://sheets.new) and create a spreadsheet named
   **CASA Labs Pre-Orders**.
2. In the spreadsheet: **Extensions → Apps Script**.
3. Delete the placeholder code and paste the entire contents of
   [`preorder-intake.gs`](./preorder-intake.gs). Save.
4. In the editor toolbar, select the **`authorize`** function and click
   **Run** once. Approve the permission prompts (Sheets + Mail). This creates
   the `Pre-Orders` tab with headers and warms up the scopes.
5. **Deploy → New deployment**:
   - Type: **Web app**
   - Description: `preorder intake`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
6. Paste that URL into [`src/config/preorder.ts`](../src/config/preorder.ts)
   as `FORM_ENDPOINT`, commit, and deploy the site.

## Verify

Submit a test pre-order on the site. Within a few seconds you should see:
- a new row in the `Pre-Orders` tab (timestamp, order #, tier, contact, quantities, total, summary), and
- a notification email at `alex@casalabs.shop`.

Delete the test row afterward so the order-sequence count stays accurate.

## Notes

- **Flipping tiers**: when Founding 10 sells out, edit `ACTIVE_TIER` in
  `src/config/preorder.ts` to `'early'` (then `'preorder'`) and push — the
  site is statically generated, so pricing updates on deploy.
- **Updating the script**: after editing code, use **Deploy → Manage
  deployments → ✏️ Edit → Version: New version** — otherwise the `/exec` URL
  keeps serving the old code.
- **Spam**: submissions with the hidden `company` honeypot field filled are
  silently dropped.
- The `/exec` URL is public by design (the site POSTs to it from the browser);
  it grants no read access to the sheet.

const { GoogleSpreadsheet } = require('google-spreadsheet');

export async function appendSpreadsheet(
  SelendraAddress,
  Amount,
  AmountSEL,
  BSCHash,
  BSCStatus
) {
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow({
      SelendraAddress: SelendraAddress,
      Amount: Amount,
      AmountSEL: AmountSEL,
      BSCHash: BSCHash,
      BSCStatus: BSCStatus
    });
  } catch (e) {
    console.error('Error: ', e);
  }
}
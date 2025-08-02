function myFunction() {
  // アクティブなスプレッドシートを取得し、その中の最初のシート（アクティブシート）を取得します。
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // A1セルに「ハローワールド」という文字列を設定します。
  sheet.getRange("A1").setValue("ハローワールド");
}

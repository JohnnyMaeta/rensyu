const SHEET_NAME = 'じゃんけん記録';

// 1. Webアプリにアクセスしたときに呼ばれる関数
function doGet(e) {
  // index.htmlをWebページとして表示します
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('GASでじゃんけんアプリ');
}

/**
 * 2. じゃんけんのゲームを実行し、結果を記録するサーバー側の関数
 * @param {string} userMove ユーザーの手（'グー', 'チョキ', 'パー'）
 * @return {object} ゲームの結果 { computerMove: string, result: string }
 */
function playGame(userMove) {
  const moves = ['グー', 'チョキ', 'パー'];
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  let result;
  if (userMove === computerMove) {
    result = 'あいこ';
  } else if (
    (userMove === 'グー' && computerMove === 'チョキ') ||
    (userMove === 'チョキ' && computerMove === 'パー') ||
    (userMove === 'パー' && computerMove === 'グー')
  ) {
    result = 'あなたの勝ち';
  } else {
    result = 'あなたの負け';
  }

  // 結果をシートに記録
  const sheet = getOrCreateSheet();
  const timestamp = new Date();
  sheet.appendRow([timestamp, userMove, computerMove, result]);

  return { computerMove: computerMove, result: result };
}

/**
 * 3. 記録用のシートを取得または新規作成するヘルパー関数
 * @return {Sheet} 記録用のシートオブジェクト
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    const headers = ['日時', 'あなたの手', 'コンピュータの手', '結果'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  }
  return sheet;
}

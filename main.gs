var token = "XXXXXXXXXX:YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" //Botのトークン
var telegramUrl = "https://api.telegram.org/bot" + token;

var chatId = "ZZZZZZZZZZZZZZZ"; //チャットのID　
var spredSheetId = "00000000000000000000000000000000000000000000" //レスポンスのスプレッドシート


//スプレッドシートからデータを取得してチャットに送る
function fromGoogleFormToTelegram(){
  var activeSpreadsheet = SpreadsheetApp.openById(spredSheetId); //レスポンスのスプレッドシートを取得
  var activeSheet = activeSpreadsheet.getSheets()[0]; //アクティブシートを取得
  var row = activeSheet.getLastRow(); //行数を取得
  var column = 3 //シートC列目
  var range = activeSheet.getDataRange(); //シートにデータが入っている範囲を取得
  var value = range.getCell(row, column).getValue(); //シート最終行C列目の値を取得
  var message = ""; 
  message += value;
  sendToTelegram(chatId, '@' + message + ' さんがフォームを送信しました！', token);
  Logger.log(message);
}

function sendToTelegram(chatId, text, token){
  var payload = {
    'method': 'sendMessage',
    'chat_id': chatId,
    'text': text,
    'parse_mode': 'HTML'
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
  UrlFetchApp.fetch(telegramUrl + '/', data);
}

var token = "XXXXXXXXXX:YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
var telegramUrl = "https://api.telegram.org/bot" + token;
var chatId = "ZZZZZZZZZZZZZZZ"; //チャットのID　


function getMe(){
  var url = telegramUrl+"/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}


function getUpdates(){
  var url = telegramUrl+"/getUpdates";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

//スプシからデータを取得してTG部屋に送る
function fromGoogleFormToTelegram(){
  var sheet = SpreadsheetApp.getActiveSheet(); //シートを指定する
  var row = sheet.getLastRow(); //行数
  var column = 3 //スプシC列目
  var range = sheet.getDataRange(); //シートにデータが入ってる範囲を指定する
  var value = range.getCell(row, column).getValue(); //最終行C列目の値を取る
  var message = "";
  message += value;
  Logger.log(message);
  sendToTelegram(chatId, '@' + message + ' さんが参加希望でフォームを記入されました！', token);
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

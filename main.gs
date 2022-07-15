var token = PropertiesService.getScriptProperties().getProperty("token"); //Botトークン
var chatId = PropertiesService.getScriptProperties().getProperty("chatId"); //チャットID

var telegramUrl = "https://api.telegram.org/bot" + token;


//Installable Trigger; FormTriggerBilder
//トリガーをセットするときに実行
function createFormSubmitTrigger() { 
  var formId = PropertiesService.getScriptProperties().getProperty("formId");
  ScriptApp.newTrigger('fromGoogleFormToTelegram')
      .forForm(formId) //トリガー対象のフォームを指定
      .onFormSubmit()
      .create();
}

//スプレッドシートからデータを取得してチャットに送る
function fromGoogleFormToTelegram(){
  var spreadSheetId = PropertiesService.getScriptProperties().getProperty("spreadSheetId");
  var activeSpreadsheet = SpreadsheetApp.openById(spreadSheetId); //レスポンスのスプレッドシートを取得
  var activeSheet = activeSpreadsheet.getSheets()[0]; //アクティブシートを取得
  var row = activeSheet.getLastRow(); //行数を取得
  var column = 3 //シートC列目
  var range = activeSheet.getDataRange(); //データが入っている範囲を取得
  var value = range.getCell(row, column).getValue(); //シート最終行C列目の値を取得
  var message = ""; 
  message += value;
  Logger.log(message);
  sendToTelegram(chatId, '@' + message + ' さんがフォームを送信しました！', token);
}

function sendToTelegram(chatId, text){
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
  var response = UrlFetchApp.fetch(telegramUrl + '/', data);
  Logger.log(response.getContentText());
}

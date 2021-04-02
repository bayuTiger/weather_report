function postSlack(text) {

  var url = 'your_slackChannel';
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({text: text}),
    muteHttpExceptions :true

  };

  UrlFetchApp.fetch(url, params);
}

function postSlackForecast() {

  var url = 'https://weather.tsukumijima.net/api/forecast?city=400020';
  var res = UrlFetchApp.fetch(url);
  var object = JSON.parse(res.getContentText());

  var date = new Date();
  var publicTime = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd hh時発表の天気予報');

  var title = "▼ 明日の" + object.title + ":\n" ;
  var max = "◇ 最高気温  :  " + object.forecasts[1].temperature.max.celsius + "度\n";
  var min = "◇ 最低気温  :  " + object.forecasts[1].temperature.min.celsius + "度\n";
  var telop = "◇ 空模様  :  " + object.forecasts[1].telop + "\n";
  var rain = "◇ 降水確率  ↓  " + "\n  ・00~06 = " + object.forecasts[1].chanceOfRain.T00_06 + "\n  ・06~12 = " + object.forecasts[1].chanceOfRain.T06_12 + "\n  ・12~18 = " + object.forecasts[1].chanceOfRain.T12_18 + "\n  ・18~24 = " + object.forecasts[1].chanceOfRain.T18_24 ;


  var strBody = "【" + publicTime + " :sun_with_face:】\n";
  strBody += title + max + min + telop + rain;


  postSlack(strBody);

}

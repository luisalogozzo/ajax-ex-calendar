for (var i = 1; i <= 31; i++) {
  console.log() ;
  var source = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);
  var context = {
    date: moment(i + '/01/2018', 'D/MM/YYYY', true).format('D MMMM'),
  };
  console.log(context.date);
  var html = template(context);
  $('.list').append(html);
}
$.ajax( {
  url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
  method: 'GET',
  success: function (risposta) {
    console.log(risposta.response[0].date);
    for (var i = 0; i < risposta.response.length; i++) {
      var DataMoment = moment(risposta.response[i].date, 'YYYY-MM-DD', true).format('D MMMM');
      console.log(DataMoment);
      for (var k = 0; k <= 31; k++) {
        if (DataMoment == $('.list li').eq(k).text()) {
          $('.list li').eq(k).append(' - ' + risposta.response[i].name);
          $('.list li').eq(k).addClass('red');
        }
      }
    }


  }
}

)

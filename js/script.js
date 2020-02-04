thisMonth = 0;
year = 2018;
baseMonth = moment(
  {
    year: 2018,
    month: thisMonth
  }
)



var DaysInMonth = baseMonth.daysInMonth();
console.log(DaysInMonth);
console.log(baseMonth.format("-M"));
printMonth(baseMonth);
printHoliday(baseMonth);


function printMonth(month) {
  $('#title').html(month.format("MMMM YYYY"));
  for (var i = 1; i <= DaysInMonth; i++) {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      date: moment(i + month.format("-MMMM"), "D-MMMM", true).format('D MMMM'),
    };

    // console.log(context.date);
    var html = template(context);
    $('.days-list').append(html);
  }

}

$('#next').click(function () {
  $('.days-list').html('');
  baseMonth = baseMonth.add(1, 'month');
  printMonth(baseMonth);
  printHoliday(baseMonth);
});
$('#prev').click(function () {
  $('.days-list').html('');
  baseMonth = baseMonth.subtract(1, 'month');
  printMonth(baseMonth);
  printHoliday(baseMonth);
});

function printHoliday(month) {
  $.ajax( {
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data: {
      year: month.year(),
      month: month.month()
    },
    success: function (risposta) {
      console.log(risposta.response);
      for (var i in risposta.response) {


      // for (var i = 0; i < risposta.response.length; i++) {
        var holiday = moment(risposta.response[i].date, 'YYYY-MM-DD', true).format('D MMMM');
        console.log(holiday);
        for (var k = 0; k <= DaysInMonth; k++) {
          if (holiday == $('.days-list li').eq(k).text()) {
            $('.days-list li').eq(k).append(' - ' + risposta.response[i].name);
            $('.days-list li').eq(k).addClass('red');
          }
        }
      }
    }
  }
)
}

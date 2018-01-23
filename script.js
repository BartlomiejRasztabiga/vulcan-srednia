var table = $('.ocenyZwykle-table');

var numberOfMarksArray = [];
var sumOfMarksArray = [];
var i = 0;
var dropDownList = document.getElementById('okresyKlasyfikacyjneDropDownList');
var secondPeriod = dropDownList.options[1].value;

if (window.location.href.indexOf("okres=" + secondPeriod) > -1) {

    var sumOfMarksArray = JSON.parse(localStorage.getItem('sumOfMarksArray'));
    var numberOfMarksArray = JSON.parse(localStorage.getItem('numberOfMarksArray'));
}

if (!$('.ocenyZwykle-table thead tr th:contains(\'Średnia\')').length) {
    table.find('thead > tr').append('<th>Średnia</th>');

    var rows = table.find('tbody').children().each(function () {
        var numberOfMarks = 0;
        var sumOfMarks = 0;

        $(this).find('td.break-word').children('span').each(function () {
            var text = $(this).text();
            var alt = $(this).attr("alt");
            var splitted = alt.split("<br/>");
            if (!isNaN(parseInt(text))) {
                var mark = parseInt(text);
                var bonusChar = text.charAt(1);
                if (bonusChar === "+") mark += 0.5;
                else if (bonusChar === "-") mark -= 0.25;

                var weight = splitted[2].match(/\d+/);

                numberOfMarks += parseInt(weight[0]);
                sumOfMarks += (mark * weight);
            }
        });

        if (window.location.href.indexOf("okres=" + secondPeriod) <= -1) {
            numberOfMarksArray.push(numberOfMarks);
            sumOfMarksArray.push(sumOfMarks);
        }

        var average = sumOfMarks / numberOfMarks;

        if (isNaN(average)) {
            $(this).append('<td>-</td>');
        } else {
            $(this).append('<td>' + average.toFixed(2) + '</td>');
        }

        if (window.location.href.indexOf("okres=" + secondPeriod) > -1) {
            var yearAverage = (sumOfMarks + sumOfMarksArray[i]) / (numberOfMarks + numberOfMarksArray[i]);
            if (isNaN(yearAverage)) {
                $(this).append('<td>-</td>');
            } else {
                $(this).append('<td>' + (sumOfMarks + sumOfMarksArray[i]) + '/' + (numberOfMarks + numberOfMarksArray[i]) + '=' + yearAverage.toFixed(2) + '</td>');
            }
            i++;
        }


    });

    if (window.location.href.indexOf("okres=" + secondPeriod) <= -1) {
        localStorage.setItem('numberOfMarksArray', JSON.stringify(numberOfMarksArray));
        localStorage.setItem('sumOfMarksArray', JSON.stringify(sumOfMarksArray));
    }
}

if (window.location.href.indexOf("okres=" + secondPeriod) > -1) {
    if (!$('.ocenyZwykle-table thead tr th:contains(\'Średnia roczna\')').length) {
        table.find('thead > tr').append('<th>Średnia roczna</th>');
    }
}
var LABELS = [
    'Rank', // 0
    'Expert Name', // 1
    'Expert Affiliation', // 2
    'Overall', // 3
    'QB', // 4
    'RB', // 5
    'WR', // 6
    'TE', // 7
    'K', // 8
    'DST' // 9
];

var index = function (cacheData) {
    if (!cacheData) return {};

    var index = {}, row, name;
    var i = 0, j = cacheData.length;
    for (i; i < j; i += 1) {
        row = cacheData[i];
        name = row[1]
        index[name] = {
            text: summaryText(row),
            html: summaryHtml(row)
        };
    }
    return index;
};

var summary = function (row, delimiter, lb) {
    var s = '', linebreak;
    var i = 4, j = 9;
    for (i; i <= j; i += 1) {
        s += LABELS[i] + ": " + row[i];
        s += (i % 2 !== 0) ? lb : delimiter;
    }

    return s;
};

var summaryTitle = function (row)  {
    return "Overall: " + row[3] + " (Rank " + row[0] + ")";
};

var summaryText = function (row) {
    var title = summaryTitle(row);
    var s = summary(row, ' | ', '\n');
    return '\n' + title + '\n' + s;
};

var summaryHtml = function (row) {
    var title = summaryTitle(row);
    var s = summary(row, ' | ', '<br />');

    return '<br/><span style="font-size: 85%">' + title + '<br/>' + s + '</span>';
};


$(document).ready(function () {
    chrome.storage.local.get('in-season', function(items) {
        var cache = items['in-season'];
        if (cache && cache.index) {
            // setup overlay
            var title, name, data;
            $('.expert-name a').each(function(index, value) {
                title = $(value).prop('title');
                name = $(value).text();
                data = cache.index[name];
                if (data) {
                    $(value).prop('title', title + data.text);
                    $(value).parent().parent().append(data.html);
                }
            })
        }
    });
});
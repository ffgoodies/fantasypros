$(document).ready(function () {
    var cache = {
        data: []
    };

    $('#2014>table>tbody>tr').each(function (index, row) {
        var rowData = [];
        $(row).children().each(function (index, cell) {
            if (index === 1) {
                rowData.push($(cell).find('.expert-name').text())
                rowData.push($(cell).find('.expert-affiliation').text());
            } else {
                rowData.push($(cell).text());
            }
        });
        cache.data.push(rowData);
    });

    cache.index = index(cache.data);

    chrome.storage.local.set({'in-season': cache}, function() {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        } else {
            console.log('in-season cache created');
        }
    })
})
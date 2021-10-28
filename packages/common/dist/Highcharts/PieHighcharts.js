export function getPieHighchartsConfig(textColor, title, search, data, backgroundColor, handleClick) {
    if (textColor === void 0) { textColor = 'black'; }
    var custodians = data.map(function (datum) { return ({
        name: datum.name,
        y: datum.value,
        color: datum.color,
        events: {
            click: function (e) { return handleClick(search, datum.name); },
        },
    }); });
    return {
        chart: {
            type: 'pie',
            backgroundColor: backgroundColor,
        },
        title: {
            text: title,
            style: {
                color: textColor,
            },
        },
        tooltip: {
            pointFormat: '{point.percentage:.1f}%',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                },
            },
        },
        series: [
            {
                data: custodians,
            },
        ],
    };
}
//# sourceMappingURL=PieHighcharts.js.map
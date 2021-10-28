export function getBarHighchartsConfig(textColor, title, search, data, backgroundColor, handleClick) {
    if (textColor === void 0) { textColor = 'black'; }
    return {
        chart: {
            type: 'bar',
            backgroundColor: backgroundColor,
        },
        title: {
            text: title,
            style: {
                color: textColor,
            },
        },
        xAxis: {
            categories: data.map(function (datum) { return datum.name; }),
            title: {
                text: null,
            },
            labels: {
                style: {
                    color: textColor,
                },
            },
        },
        yAxis: {
            labels: {
                overflow: 'justify',
                style: {
                    color: textColor,
                },
            },
            title: {
                text: null,
            },
        },
        tooltip: {
            valueSuffix: ' email',
        },
        plotOptions: {
            bar: {
                events: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    click: function (e) { return handleClick(search, e.point.category); },
                },
            },
        },
        series: [
            {
                showInLegend: false,
                colorByPoint: true,
                colors: data.map(function (datum) { return datum.color; }),
                data: data.map(function (datum) { return datum.value; }),
            },
        ],
    };
}
//# sourceMappingURL=BarHighcharts.js.map
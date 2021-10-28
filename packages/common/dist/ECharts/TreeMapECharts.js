export function getTreeMapEChartsConfig(textColor, title, data) {
    if (textColor === void 0) { textColor = 'black'; }
    var chartData = data.map(function (datum) { return ({
        name: datum.name,
        value: datum.value,
        itemStyle: { color: datum.color },
    }); });
    return {
        title: {
            text: title,
            left: 'center',
            textStyle: { color: textColor },
        },
        series: [
            {
                type: 'treemap',
                data: chartData,
                animationEasing: 'quinticInOut',
                animationDuration: 1500,
                animationDelay: function () { return Math.random() * 200; },
            },
        ],
    };
}
//# sourceMappingURL=TreeMapECharts.js.map
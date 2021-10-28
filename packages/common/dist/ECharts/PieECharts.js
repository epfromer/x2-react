export function getPieEChartsConfig(textColor, title, data) {
    if (textColor === void 0) { textColor = 'black'; }
    var chartData = data.map(function (datum) { return ({
        name: datum.name,
        value: datum.value,
        itemStyle: {
            color: datum.color,
            lineStyle: { color: datum.color },
            areaStyle: { color: datum.color },
        },
    }); });
    return {
        title: {
            text: title,
            top: 20,
            left: 'center',
            textStyle: {
                color: textColor,
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        series: [
            {
                type: 'pie',
                radius: '55%',
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                data: chartData,
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function () { return Math.random() * 200; },
            },
        ],
    };
}
//# sourceMappingURL=PieECharts.js.map
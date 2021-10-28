export function getBarEChartsConfig(textColor, title, data, gridConfig) {
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
            textStyle: { color: textColor },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
        },
        grid: gridConfig,
        xAxis: {
            axisLabel: { color: textColor },
        },
        yAxis: {
            data: data.map(function (datum) { return datum.name; }),
            axisLabel: { color: textColor },
        },
        series: [
            {
                type: 'bar',
                data: chartData,
            },
        ],
    };
}
//# sourceMappingURL=BarECharts.js.map
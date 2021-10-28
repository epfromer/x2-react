export function getVolumeTimelineEChartsConfig(textColor, title, data) {
    if (textColor === void 0) { textColor = 'black'; }
    return {
        title: {
            text: title,
            left: 'center',
            textStyle: { color: textColor },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
        },
        grid: {
            bottom: 90,
        },
        dataZoom: [{ type: 'inside' }, { type: 'slider' }],
        xAxis: {
            data: data.map(function (datum) { return datum.sent; }),
            silent: false,
            splitLine: { show: false },
            splitArea: { show: false },
            axisLabel: { color: textColor },
        },
        yAxis: {
            splitArea: { show: false },
            axisLabel: { color: textColor },
        },
        series: [
            {
                type: 'bar',
                data: data.map(function (datum) { return datum.total; }),
            },
        ],
    };
}
//# sourceMappingURL=VolumeTimelineECharts.js.map
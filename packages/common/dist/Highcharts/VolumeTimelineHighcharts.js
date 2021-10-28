export function getVolumeTimeHighchartsConfig(textColor, title, data, backgroundColor, handleClick) {
    if (textColor === void 0) { textColor = 'black'; }
    return {
        chart: {
            zoomType: 'x',
            backgroundColor: backgroundColor,
        },
        title: {
            text: title,
            style: {
                color: textColor,
            },
        },
        xAxis: {
            labels: {
                overflow: 'justify',
                style: {
                    color: textColor,
                },
            },
            type: 'datetime',
        },
        yAxis: {
            labels: {
                overflow: 'justify',
                style: {
                    color: textColor,
                },
            },
            title: {
                text: '# emails sent',
            },
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                events: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    click: function (e) {
                        return handleClick(new Date(e.point.category).toISOString().slice(0, 10));
                    },
                },
            },
        },
        series: [
            {
                type: 'area',
                name: '# emails sent',
                data: data.map(function (stat) { return [new Date(stat.sent).getTime(), stat.total]; }),
            },
        ],
    };
}
//# sourceMappingURL=VolumeTimelineHighcharts.js.map
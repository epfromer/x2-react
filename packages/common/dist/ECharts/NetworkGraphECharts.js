/* eslint-disable @typescript-eslint/no-explicit-any */
export function getNetworkGraphEChartsConfig(textColor, title, data, nodes) {
    if (textColor === void 0) { textColor = 'black'; }
    var chartNodes = nodes.map(function (node) { return ({
        id: node.id,
        name: node.id,
        category: node.id,
        x: null,
        y: null,
        draggable: true,
        itemStyle: { color: node.color },
        label: { show: true },
    }); });
    return {
        title: {
            text: title,
            top: 20,
            left: 'center',
            textStyle: { color: textColor },
        },
        tooltip: {},
        legend: [
            {
                bottom: 0,
                data: chartNodes.map(function (a) { return a.name; }),
                textStyle: { color: textColor },
            },
        ],
        series: [
            {
                name: title,
                top: 50,
                left: 50,
                right: 50,
                bottom: 250,
                type: 'graph',
                layout: 'force',
                data: chartNodes,
                links: data,
                categories: chartNodes,
                roam: true,
                label: {
                    position: 'bottom',
                    formatter: '{b}',
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3,
                },
                force: { repulsion: 1000 },
            },
        ],
    };
}
//# sourceMappingURL=NetworkGraphECharts.js.map
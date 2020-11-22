/* eslint-disable @typescript-eslint/no-explicit-any */
export function getNetworkGraphEChartsConfig(
  textColor = 'black',
  title: string,
  data: Array<[string, string, number]>,
  nodes: Array<any>
): unknown {
  const chartNodes: Array<any> = nodes.map((node) => ({
    id: node.id,
    name: node.id,
    category: node.id,
    x: null,
    y: null,
    draggable: true,
    itemStyle: {
      color: node.color,
    },
    label: {
      normal: {
        show: true,
      },
    },
  }))

  return {
    title: {
      text: title,
      top: 20,
      left: 'center',
      textStyle: {
        color: textColor,
      },
    },
    tooltip: {},
    legend: [
      {
        bottom: 0,
        data: chartNodes.map((a) => a.name),
        textStyle: {
          color: textColor,
        },
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
        force: {
          repulsion: 1000,
        },
      },
    ],
  }
}

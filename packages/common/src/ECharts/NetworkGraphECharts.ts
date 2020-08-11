export function getNetworkGraphEChartsConfig(
  darkMode: boolean,
  title: string,
  data: Array<[string, string, number]>,
  nodes: Array<any>
) {
  const maxSent = nodes.reduce(
    (maxVal, cur) => (cur.emailTotal > maxVal.emailTotal ? cur : maxVal),
    { emailTotal: 0 }
  ).emailTotal
  const chartNodes: Array<any> = nodes.map((node) => ({
    id: node.id,
    name: node.id,
    category: node.id,
    x: null,
    y: null,
    draggable: true,
    symbolSize: (node.emailTotal / maxSent) * 40 + 10,
    itemStyle: {
      color: node.color,
    },
    label: {
      normal: {
        show: true,
      },
    },
  }))
  const links: Array<any> = data.map((datum) => ({
    source: datum[0],
    target: datum[1],
    value: datum[2],
  }))

  return {
    title: {
      text: title,
      top: 20,
      left: 'center',
      textStyle: {
        color: darkMode ? 'white' : 'black',
      },
    },
    tooltip: {},
    legend: [
      {
        bottom: 0,
        data: chartNodes.map((a) => a.name),
        textStyle: {
          color: darkMode ? 'white' : 'black',
        },
      },
    ],
    animation: false,
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
        links: links,
        categories: chartNodes,
        roam: true,
        label: {
          position: 'bottom',
          formatter: '{b}',
        },
        force: {
          repulsion: 2700,
        },
      },
    ],
  }
}

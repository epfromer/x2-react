// @ts-ignore
import bestContrast from 'get-best-contrast-color'

export interface AppTheme {
  name: string
  Button: any
  Header: any
  CheckBox?: any
  colors?: any
}

// https://reactnativeelements.com/docs/button
// https://reactnativeelements.com/docs/header

export const appThemes: Array<AppTheme> = [
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=C62828
    name: 'Red',
    Header: { containerStyle: { backgroundColor: '#8e0000' } },
    Button: { buttonStyle: { backgroundColor: '#c62828' } },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=F57C00
    name: 'Orange',
    Header: { containerStyle: { backgroundColor: '#bb4d00' } },
    Button: { buttonStyle: { backgroundColor: '#f57c00' } },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FFFF00
    name: 'Yellow',
    Header: { containerStyle: { backgroundColor: '#c7cc00' } },
    Button: { buttonStyle: { backgroundColor: '#ffff00' } },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=2E7D32
    name: 'Green',
    Header: { containerStyle: { backgroundColor: '#005005' } },
    Button: { buttonStyle: { backgroundColor: '#2e7d32' } },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=283593
    name: 'Blue',
    Header: { containerStyle: { backgroundColor: '#003c8f' } },
    Button: { buttonStyle: { backgroundColor: '#1565c0' } },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=6A1B9A
    name: 'Purple',
    Header: { containerStyle: { backgroundColor: '#38006b' } },
    Button: { buttonStyle: { backgroundColor: '#6a1b9a' } },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=5D4037
    name: 'Brown',
    Header: { containerStyle: { backgroundColor: '#321911' } },
    Button: { buttonStyle: { backgroundColor: '#5d4037' } },
  },
]

export function getTheme(themeName: string) {
  return appThemes.find((t) => t.name === themeName)
}

export function textColor(theme: AppTheme) {
  return bestContrast(theme.Header.containerStyle.backgroundColor, [
    theme.colors.white,
    theme.colors.black,
  ])
}

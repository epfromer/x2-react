// import bestContrast from 'get-best-contrast-color'

export interface AppTheme {
  name: string
  type?: string
  primary: any
  secondary: any
}

// https://reactnativeelements.com/docs/button
// https://reactnativeelements.com/docs/header

export const appThemes: Array<AppTheme> = [
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=C62828
    name: 'Red',
    primary: { main: '#8e0000' },
    secondary: { main: '#c62828' },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=6A1B9A
    name: 'Purple',
    primary: { main: '#38006b' },
    secondary: { main: '#6a1b9a' },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=283593
    name: 'Blue',
    primary: { main: '#003c8f' },
    secondary: { main: '#1565c0' },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=2E7D32
    name: 'Green',
    primary: { main: '#005005' },
    secondary: { main: '#2e7d32' },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FFFF00
    name: 'Yellow',
    primary: { main: '#c7cc00' },
    secondary: { main: '#ffff00' },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=F57C00
    name: 'Orange',
    primary: { main: '#bb4d00' },
    secondary: { main: '#f57c00' },
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=5D4037
    name: 'Brown',
    primary: { main: '#321911' },
    secondary: { main: '#5d4037' },
  },
]

export function getTheme(themeName: string) {
  return appThemes.find((t) => t.name === themeName)
}

// export function textColor(theme: AppTheme) {
//   return bestContrast(theme.Header.containerStyle.backgroundColor, [
//     theme.colors.white,
//     theme.colors.black,
//   ])
// }

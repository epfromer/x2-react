interface AppTheme {
  name: string
  Button: any
  Header: any
}

// TODO 2. create a few themes, theme chooser in settings as in web (checkboxes)
// TODO 3. do same in web

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
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=6A1B9A
    name: 'Purple',
    Header: { containerStyle: { backgroundColor: '#38006b' } },
    Button: { buttonStyle: { backgroundColor: '#6a1b9a' } },
  },
]

export function getTheme(themeName) {
  return appThemes.find((t) => t.name === themeName)
}

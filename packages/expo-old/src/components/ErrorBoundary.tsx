import React from 'react'
import { Text } from 'react-native'

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // logErrorToMyService(error, errorInfo)
    console.log('error!')
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Something went wrong.</Text>
    }

    return this.props.children
  }
}

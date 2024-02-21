import { Component, ErrorInfo } from 'react';
import { ErrorHandlerProps } from '.';

interface State {
  hasError: boolean;
}

class ErrorHandler extends Component<ErrorHandlerProps, State> {
  constructor(props: ErrorHandlerProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorHandler caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }

    return this.props.children;
  }
}

export default ErrorHandler;

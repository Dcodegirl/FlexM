import React, { Component } from 'react';
import ErrorPage from '../../pages/ErrorPage';

class ErrorHandler extends Component {
    state = {
        hasError: false,
    };

    componentDidCatch(error, info) {
        this.setState({ hasError: true });

        console.log("this is the error that caused the oops scrren: ", error, info);
    }

    render() {
        const { hasError } = this.state;
        return hasError ? <ErrorPage /> : this.props.children;
    }
}

export default ErrorHandler;

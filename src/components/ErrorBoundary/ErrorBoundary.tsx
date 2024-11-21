import React, { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '@/types/type';
import './errorBoundary.scss';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="errorBoundary">
					<h1>Something wen&apos;t wrong.</h1>
					<h2>Please try refreshing the page or come back later.</h2>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

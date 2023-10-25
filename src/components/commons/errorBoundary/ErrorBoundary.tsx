import React from "react";

interface ErrorStatus {
  code?: number;
  message?: string;
  key?: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode | ((stat: ErrorStatus) => React.ReactNode);
}

interface ErrorBoundaryState {
  hasErr: boolean;
  status: ErrorStatus;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasErr: false, status: {} };
  }

  static getDerivedStateFromError(err: any) {
    return { hasErr: true, status: err };
  }

  render() {
    const { fallback } = this.props;

    if (!this.state.hasErr) {
      return this.props.children;
    }

    if (typeof fallback === "function") {
      return fallback(this.state.status);
    }

    return fallback;
  }
}

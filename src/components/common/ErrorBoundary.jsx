import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-xl w-full bg-white rounded-xl shadow-lg overflow-hidden border border-red-100">
            <div className="bg-red-50 p-6 border-b border-red-100">
              <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
                ⚠️ Algo salió mal
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-600">
                Se ha producido un error inesperado en la aplicación. Por favor, intente recargar la
                página.
              </p>
              {this.state.error && (
                <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-64">
                  <p className="text-red-400 font-mono text-sm mb-2">
                    {this.state.error.toString()}
                  </p>
                  <pre className="text-slate-400 font-mono text-xs whitespace-pre-wrap">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => (window.location.href = '/dashboard')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Recargar Página
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

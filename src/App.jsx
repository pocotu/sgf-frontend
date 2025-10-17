import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [retryCount, setRetryCount] = useState(0);
  const [isWakingUp, setIsWakingUp] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(`${apiUrl}/health`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          setBackendStatus('ok');
          setIsWakingUp(false);
        } else {
          setBackendStatus('error');
        }
      } catch (error) {
        // Si es timeout o error de red, probablemente está dormido
        if (error.name === 'AbortError' || error.message.includes('fetch')) {
          setIsWakingUp(true);
          setBackendStatus('sleeping');

          // Reintentar automáticamente
          if (retryCount < 3) {
            setTimeout(() => {
              setRetryCount(retryCount + 1);
            }, 5000); // Reintentar cada 5 segundos
          } else {
            setBackendStatus('error');
            setIsWakingUp(false);
          }
        } else {
          setBackendStatus('error');
        }
      }
    };

    checkBackend();
  }, [retryCount]);

  const getStatusMessage = () => {
    switch (backendStatus) {
      case 'checking':
        return 'Verificando...';
      case 'ok':
        return 'OK';
      case 'sleeping':
        return isWakingUp
          ? `Iniciando backend... (${retryCount + 1}/3)`
          : 'Inactivo';
      case 'error':
        return 'ERROR';
      default:
        return '...';
    }
  };

  const getStatusHint = () => {
    if (backendStatus === 'sleeping' && isWakingUp) {
      return 'El backend esta iniciando. Esto puede tomar 30-60 segundos...';
    }
    return null;
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p className={`backend-status ${backendStatus}`}>
          Backend: {getStatusMessage()}
        </p>
        {getStatusHint() && <p className="status-hint">{getStatusHint()}</p>}
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;

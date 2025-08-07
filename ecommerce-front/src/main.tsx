// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const MOCK = import.meta.env.VITE_USE_MOCK === 'true';

if (MOCK && typeof window !== 'undefined') {
  import('./mocks/browser')
    .then(({ worker }) =>
      worker.start({
        // 关键：使用 Vite 的 BASE_URL，确保路径正确（子路径部署也能工作）
        serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      })
    )
    .then(() => {
      console.log('%c[MOCK] MSW mock 已启用', 'color: green;');
    })
    .catch((err) => console.error('[MOCK] 启动失败:', err));
} else {
  console.log('%c[API] 使用真实后端接口', 'color: orange;');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

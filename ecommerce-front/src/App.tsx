// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteConfig from './routes/RouteConfig';

export default function App() {
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}

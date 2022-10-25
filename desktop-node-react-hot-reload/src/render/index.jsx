import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

window.addEventListener('process-open', async ({ detail }) => {
  console.log('process-open', detail)
})

window.addEventListener('process-error', async ({ detail }) => {
  console.log('process-error', detail)
})

window.resizeTo(
  Math.min(1440, window.screen.width * 0.80),
  Math.min(900, window.screen.height * 0.80)
)

window.parent.setTitle('React hot reload')

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

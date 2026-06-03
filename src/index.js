import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Fix for Expo Router web bundling issues
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.EXPO_ROUTER_APP_ROOT = './app';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
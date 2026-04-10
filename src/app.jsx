import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './app/App.tsx';

const container = document.getElementById('AppRoot');
const root = createRoot(container);
root.render(<App />);
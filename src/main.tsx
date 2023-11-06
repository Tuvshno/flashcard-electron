import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import HomePage from './HomePage.tsx'
import EditingPage from './EditingPage.tsx'
import ViewPage from './ViewPage.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editing" element={<EditingPage />} />
        <Route path="/viewing" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')

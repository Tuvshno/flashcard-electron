import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage/HomePage.tsx'
import EditingPage from './pages/EditingPage/EditingPage.tsx'
import ViewPage from './pages/ViewingPage/ViewPage.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editing" element={<EditingPage />} />
        <Route path="/viewing/:studySetTitle" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import './App.css'

function App() {
  return (
    <>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </>
  )
}

export default App

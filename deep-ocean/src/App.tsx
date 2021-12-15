import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { routeRender } from './route/routesRender'
import { routesConfig } from './route/routesConfig'

function App() {
  const routes = routeRender(routesConfig)
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>{routes}</Routes>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App

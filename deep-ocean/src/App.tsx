import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import ImgUpload from './views/ImgUpload/index'
import { routeRender } from './route/routesRender'
import { routesConfig } from './route/routesConfig'

function App() {
  const routes = routeRender(routesConfig)
  return (
    <div className="App">
      <header className="App-header">
        <ImgUpload />
        <BrowserRouter>
          <Routes>{routes}</Routes>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App

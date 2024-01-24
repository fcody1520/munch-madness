import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, Routes,  createBrowserRouter, createRoutesFromElements, BrowserRouter } from 'react-router-dom';
import Edit from './components/Edit.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/edit-info' element={<Edit/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/edit-info' element={<Edit/>}/>
    </Routes>
  </BrowserRouter>
  
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './CSS/index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Edit from './components/Edit.jsx';
import History from './components/History.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bracket from './components/Bracket.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/edit-info' element={<Edit/>}/>
      <Route path='/history' element={<History/>}/> 
      <Route index element={<Bracket/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

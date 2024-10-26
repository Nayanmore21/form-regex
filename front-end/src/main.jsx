import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RouteTable from './Components/RouteTable.jsx';
import RouteForm from './Components/RouteForm.jsx';

const router = 
createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App />}>
      <Route index={true} path='/' element={<RouteForm />} />
      <Route path='/routetable' element={<RouteTable />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

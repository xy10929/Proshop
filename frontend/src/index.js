//index.js is the entry of React
import React from 'react'
import ReactDOM from 'react-dom/client'
//allows to interact with document object module and broswer
import App from './App'
import reportWebVitals from './reportWebVitals'
// default bootstrap file
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import store from './store'
import { Provider } from 'react-redux'
import CartScreen from './screens/CartScreen'

//router of main app component
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* show HomeScreen when route is exactly / */}
      <Route index={true} path='/' element={<HomeScreen />} />

      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
    </Route>
  )
)

//put main app component into root div
const root = ReactDOM.createRoot(document.getElementById('root'))
//render main app component
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()

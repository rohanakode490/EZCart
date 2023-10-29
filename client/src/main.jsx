import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.jsx'
import { positions, transitions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

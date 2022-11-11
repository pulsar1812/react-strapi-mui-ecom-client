import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import './index.css'
import App from './App'
import { theme } from './theme'
import cartReducer from './state'

const store = configureStore({
  reducer: { cart: cartReducer },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

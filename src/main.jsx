import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { router } from './router/router.jsx'
import { onConstructionRouter } from './router/onConstructionRouter.jsx'
import { store } from './redux/store'
import { SnackbarProvider } from 'notistack'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
        <RouterProvider router={onConstructionRouter} />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
);

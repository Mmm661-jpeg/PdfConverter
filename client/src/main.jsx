import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import UploadBtnProvider from './context/uploadBtnContext/uploadbtnProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <UploadBtnProvider>
      <App />
    </UploadBtnProvider>
   
  </StrictMode>,
)

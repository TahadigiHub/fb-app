import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Topbar from './components/Topbar.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Topbar />
    <App />
  </StrictMode>,
)

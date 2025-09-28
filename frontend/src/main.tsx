import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/SpaceX-Mission-Explorer/"> {/* <-- Wrap your App component */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)

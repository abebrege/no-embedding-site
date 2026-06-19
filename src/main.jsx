import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './theme.css'
import { applyMode, getStoredMode } from './hooks/useColorMode.js'
import Frame from './components/frame.component.jsx'

// Set the theme before first paint so there's no light/dark flash on load.
applyMode(getStoredMode())
import Home from './components/screens/home/home.jsx'
import InventoryPage from './components/screens/inventory/InventoryPage.jsx'
import { languagesConfig, literatureConfig, institutionsConfig } from './components/screens/inventory/configs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frame />}>
          <Route index element={<Home />} />
          <Route path="languages" element={<InventoryPage config={languagesConfig} />} />
          <Route path="literature" element={<InventoryPage config={literatureConfig} />} />
          <Route path="institutions" element={<InventoryPage config={institutionsConfig} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WalletContextProvider } from './components/WalletContext'
import { StyleProvider } from './components/StyleContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider>
      <WalletContextProvider>
        <App />
      </WalletContextProvider>
    </StyleProvider>
  </StrictMode>,
)

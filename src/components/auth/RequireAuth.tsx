// src/components/auth/RequireAuth.tsx
import { useWallet } from '@solana/wallet-adapter-react'
import { Navigate, useLocation } from 'react-router-dom'

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { publicKey } = useWallet()
  const location = useLocation()

  if (!publicKey) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}

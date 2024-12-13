//src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { WalletConnection } from './components/WalletConnection'
import { useWallet } from '@solana/wallet-adapter-react'
import { StyleSwitcher } from './components/StyleSwitcher'
import * as React from 'react'
import { ExternalLink } from 'lucide-react'
import { TokenProfile } from './components/token/TokenProfile'
import { BumpProfile } from './components/bump/BumpProfile'
import { BumpManagement } from './components/bump/BumpManagement'
import { UserDashboard } from './components/dashboard/UserDashboard'
import { RequireAuth } from './components/auth/RequireAuth'
import { CreateBump } from './components/bump/CreateBump'

const HomePage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">bump-gui</h1>
        <p className="text-md">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia amet facere dignissimos esse dolor, ipsa eum expedita accusantium enim sapiente a hic fugiat libero? Quos ullam earum magni reiciendis magnam?
        </p>
      </section>



      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Feature 1</li>
          <li>Feature 2</li>
        </ul>
      </section>

      <section className="bg-base-200 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Try It Out</h2>
        <p>
          Connect your wallet.
        </p>
      </section>

      <section className="text-sm text-base-content/70">
        <p>
          View the full source code and documentation on{' '}
          <a
            href="https://github.com/nothingdao/bump-gui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </section>
    </div>
  )
}

export const App: React.FC = () => {
  const { publicKey } = useWallet()

  return (

    <Router>
      <div className='min-h-screen bg-base-100 text-base-content'>
        <nav className='navbar bg-base-200 p-4'>
          <div className='container mx-auto'>
            <div className='flex-1 flex items-center gap-4'>
              <Link
                to='/'
                className='flex items-center gap-2 hover:text-primary'
              >
                Home
              </Link>
              {publicKey && (
                <Link
                  to='/dashboard'
                  className='hover:text-primary'
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className='flex-none flex items-center gap-4'>
              <StyleSwitcher />
              <WalletConnection />
            </div>
          </div>
        </nav>

        <main className='container mx-auto p-4'>
          {/* really great routing section */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/token/:address" element={<TokenProfile />} />
            <Route path="/bump/:id" element={<BumpProfile />} />
            <Route
              path="/bump/:id/manage"
              element={
                <RequireAuth>
                  <BumpManagement />
                </RequireAuth>
              }
            />
            <Route
              path="/bump/create"
              element={
                <RequireAuth>
                  <CreateBump />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

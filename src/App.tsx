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
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">bump-gui</h1>
        <p className="text-lg leading-relaxed">
          A general web interface for managing automated token bumping on Solana using pump.fun. Create, monitor, and collaborate on bump operations with an intuitive dashboard.
        </p>
      </section>

      {/* Features Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">🔐 Secure Authentication</h3>
              <p>Connect with Phantom or Solflare wallet to manage your bumps safely</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">📊 Real-time Analytics</h3>
              <p>Track token prices, monitor transactions, and analyze performance</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">🤖 Automated Control</h3>
              <p>Configure and manage automated bump operations with ease</p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">👥 Multi-user Support</h3>
              <p>Collaborate with others through shared bump contributions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-xl">Get Started</h2>
          <p className="mb-4">
            Connect your wallet to start creating and managing bumps. Monitor your operations from a comprehensive dashboard and collaborate with other users.
          </p>
          <div className="card-actions">
            <WalletConnection />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="steps steps-vertical lg:steps-horizontal w-full">
          <div className="step step-primary">Connect Wallet</div>
          <div className="step step-primary">Create Bump</div>
          <div className="step step-primary">Configure Settings</div>
          <div className="step step-primary">Monitor & Manage</div>
        </div>
      </section>

      {/* GitHub Link */}
      <section className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Open Source</h3>
          <p className="text-base-content/70">
            This project is open source and available on GitHub. View the code, contribute, or report issues.
          </p>
          <div className="card-actions">
            <a
              href="https://github.com/nothingdao/bump-gui"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost gap-2"
            >
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="text-sm text-base-content/70 flex items-center justify-between">
        <div className="space-x-2">
          <span className="badge badge-success">mainnet</span>
          <span className="badge badge-info">in development</span>
        </div>
        <p>
          Built with ❤️ by{' '}
          <a
            href="https://twitter.com/nothingdao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            @nothingdao
          </a>
        </p>
      </section>
    </div >
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

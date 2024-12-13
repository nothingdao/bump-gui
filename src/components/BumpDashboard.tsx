// src/components/BumpDashboard.tsx
import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  Play,
  Square,
  Timer,
  Wallet as WalletIcon,
  Settings,
  History,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign
} from 'lucide-react'

// Types for our transaction history
interface Transaction {
  id: string
  type: 'BUY' | 'SELL' | 'CONTRIBUTION' | 'WITHDRAWAL'
  amount: number
  timestamp: Date
  status: 'PENDING' | 'CONFIRMED' | 'FAILED'
  signature: string
}

// Types for token info
interface TokenInfo {
  address: string
  name: string
  symbol: string
  currentPrice: number
  volume24h: number
  marketCap: number
  lastUpdated: Date
}

// Tab Components
const TokenInfoTab: React.FC<{ tokenInfo: TokenInfo }> = ({ tokenInfo }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="stat bg-base-200 rounded-box">
        <div className="stat-figure text-primary">
          <CircleDollarSign className="w-8 h-8" />
        </div>
        <div className="stat-title">Current Price</div>
        <div className="stat-value">${tokenInfo.currentPrice.toFixed(4)}</div>
        <div className="stat-desc">Last updated: {new Date(tokenInfo.lastUpdated).toLocaleTimeString()}</div>
      </div>

      <div className="stat bg-base-200 rounded-box">
        <div className="stat-title">24h Volume</div>
        <div className="stat-value">${tokenInfo.volume24h.toLocaleString()}</div>
      </div>

      <div className="stat bg-base-200 rounded-box">
        <div className="stat-title">Market Cap</div>
        <div className="stat-value">${tokenInfo.marketCap.toLocaleString()}</div>
      </div>
    </div>

    <div className="card bg-base-200">
      <div className="card-body">
        <h3 className="card-title">Token Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Token Address</label>
            <code className="block p-2 bg-base-300 rounded text-sm overflow-hidden text-ellipsis">
              {tokenInfo.address}
            </code>
          </div>
          <div>
            <label className="label">Symbol</label>
            <div className="font-mono p-2">{tokenInfo.symbol}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const TransactionHistoryTab: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <div className="overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Time</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>
              <div className="flex items-center gap-2">
                {tx.type === 'BUY' && <ArrowUpRight className="w-4 h-4 text-success" />}
                {tx.type === 'SELL' && <ArrowDownRight className="w-4 h-4 text-error" />}
                {tx.type}
              </div>
            </td>
            <td>{tx.amount} SOL</td>
            <td>{tx.timestamp.toLocaleString()}</td>
            <td>
              <div className={`badge ${tx.status === 'CONFIRMED' ? 'badge-success' :
                tx.status === 'FAILED' ? 'badge-error' :
                  'badge-warning'
                }`}>
                {tx.status}
              </div>
            </td>
            <td>
              <a
                href={`https://solscan.io/tx/${tx.signature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-xs"
              >
                View
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Main Dashboard Component
const BumpDashboard: React.FC = () => {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'controls' | 'token' | 'history'>('controls')
  const [isActive, setIsActive] = useState(false)

  const [config, setConfig] = useState<BumpConfig>({
    mintAddress: '',
    buyAmount: 0.1,
    interval: 60,
    slippageBasisPoints: 100
  })

  const [stats, setStats] = useState({
    totalBumps: 0,
    lastBumpTime: null,
    tokenBalance: 0
  })

  const handleStart = () => {
    setIsActive(true)
    // Mock stats update
    setStats(prev => ({
      ...prev,
      totalBumps: prev.totalBumps + 1,
      lastBumpTime: new Date()
    }))
  }

  const handleStop = () => {
    setIsActive(false)
  }

  // Mock data - replace with real data fetching
  const mockTokenInfo: TokenInfo = {
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    name: "Dummy Token",
    symbol: "DUMMY",
    currentPrice: 0.145,
    volume24h: 50000,
    marketCap: 1000000,
    lastUpdated: new Date()
  }

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'BUY',
      amount: 0.1,
      timestamp: new Date(),
      status: 'CONFIRMED',
      signature: '23jh4k23h4jk23h4kj23h4kj23h4kj23h4'
    },
    {
      id: '2',
      type: 'SELL',
      amount: 0.05,
      timestamp: new Date(Date.now() - 3600000),
      status: 'CONFIRMED',
      signature: '5gh67gh567gh567gh567gh567gh567gh'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${activeTab === 'controls' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('controls')}
        >
          <Settings className="w-4 h-4 mr-2" />
          Controls
        </a>
        <a
          className={`tab ${activeTab === 'token' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('token')}
        >
          <Info className="w-4 h-4 mr-2" />
          Token Info
        </a>
        <a
          className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <History className="w-4 h-4 mr-2" />
          History
        </a>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'controls' && (
          <>
            {/* Main Control Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Bump Controls</h2>

                {/* Configuration Form */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Token Address</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter token address"
                    className="input input-bordered w-full"
                    value={config.mintAddress}
                    onChange={(e) => setConfig({ ...config, mintAddress: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Buy Amount (SOL)</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered"
                      value={config.buyAmount}
                      onChange={(e) => setConfig({ ...config, buyAmount: Number(e.target.value) })}
                      step="0.1"
                      min="0"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Interval (seconds)</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered"
                      value={config.interval}
                      onChange={(e) => setConfig({ ...config, interval: Number(e.target.value) })}
                      min="1"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-end">
                  {!isActive ? (
                    <button
                      className="btn btn-primary"
                      onClick={handleStart}
                      disabled={!config.mintAddress}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Bumping
                    </button>
                  ) : (
                    <button
                      className="btn btn-error"
                      onClick={handleStop}
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Timer className="w-8 h-8" />
                </div>
                <div className="stat-title">Total Bumps</div>
                <div className="stat-value">{stats.totalBumps}</div>
                <div className="stat-desc">
                  Last: {stats.lastBumpTime?.toLocaleTimeString() || 'Never'}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <WalletIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Token Balance</div>
                <div className="stat-value">{stats.tokenBalance}</div>
                <div className="stat-desc">Current holdings</div>
              </div>

              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Settings className="w-8 h-8" />
                </div>
                <div className="stat-title">Status</div>
                <div className="stat-value text-sm">
                  {isActive ? (
                    <span className="text-success">Active</span>
                  ) : (
                    <span className="text-error">Inactive</span>
                  )}
                </div>
                <div className="stat-desc">Current state</div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'token' && (
          <TokenInfoTab tokenInfo={mockTokenInfo} />
        )}

        {activeTab === 'history' && (
          <TransactionHistoryTab transactions={mockTransactions} />
        )}
      </div>
    </div>
  )
}

export default BumpDashboard

// src/components/bump/BumpInfoTab.tsx
import React from 'react'
import { Activity, Timer, Wallet as WalletIcon } from 'lucide-react'

interface BumpInfo {
  creator: string
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED'
  totalBumps: number
  totalVolume: number
  lastBumpTime: Date | null
  nextBumpTime: Date | null
  bumpWallet: string
  tokenBalance: number
  configuration: {
    buyAmount: number
    interval: number
    slippage: number
  }
}

export const BumpInfoTab: React.FC = () => {
  // Mock data - replace with real data fetching
  const bumpInfo: BumpInfo = {
    creator: '7xKX...83TZ',
    status: 'ACTIVE',
    totalBumps: 150,
    totalVolume: 25.5,
    lastBumpTime: new Date(Date.now() - 1800000),
    nextBumpTime: new Date(Date.now() + 1800000),
    bumpWallet: '9aBC...45XY',
    tokenBalance: 1000,
    configuration: {
      buyAmount: 0.1,
      interval: 3600,
      slippage: 1
    }
  }

  return (
    <div className="space-y-6">
      {/* Status and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <Activity className="w-8 h-8" />
          </div>
          <div className="stat-title">Status</div>
          <div className="stat-value text-lg">
            <div className={`badge ${bumpInfo.status === 'ACTIVE' ? 'badge-success' :
              bumpInfo.status === 'PAUSED' ? 'badge-warning' :
                'badge-error'
              }`}>
              {bumpInfo.status}
            </div>
          </div>
        </div>

        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <Timer className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Bumps</div>
          <div className="stat-value">{bumpInfo.totalBumps}</div>
          <div className="stat-desc">
            Volume: {bumpInfo.totalVolume} SOL
          </div>
        </div>

        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <WalletIcon className="w-8 h-8" />
          </div>
          <div className="stat-title">Token Balance</div>
          <div className="stat-value">{bumpInfo.tokenBalance}</div>
          <div className="stat-desc">In bump wallet</div>
        </div>
      </div>

      {/* Configuration Details */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Buy Amount</label>
              <div className="font-mono p-2 bg-base-300 rounded">
                {bumpInfo.configuration.buyAmount} SOL
              </div>
            </div>
            <div>
              <label className="label">Interval</label>
              <div className="font-mono p-2 bg-base-300 rounded">
                {bumpInfo.configuration.interval} seconds
              </div>
            </div>
            <div>
              <label className="label">Slippage</label>
              <div className="font-mono p-2 bg-base-300 rounded">
                {bumpInfo.configuration.slippage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timing Information */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Timing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Last Bump</label>
              <div className="font-mono p-2 bg-base-300 rounded">
                {bumpInfo.lastBumpTime?.toLocaleString() || 'Never'}
              </div>
            </div>
            <div>
              <label className="label">Next Bump</label>
              <div className="font-mono p-2 bg-base-300 rounded">
                {bumpInfo.nextBumpTime?.toLocaleString() || 'Not scheduled'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

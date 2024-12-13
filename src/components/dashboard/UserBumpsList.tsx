// src/components/dashboard/UserBumpsList.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowUpRight,
  Play,
  Square,
  Clock,
  Settings
} from 'lucide-react'

interface UserBump {
  id: string
  name: string
  tokenAddress: string
  tokenSymbol: string
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED'
  nextBumpTime: Date | null
  totalBumps: number
  totalVolume: number
  config: {
    buyAmount: number
    interval: number
  }
}

export const UserBumpsList: React.FC = () => {
  // Mock data - replace with real data fetching
  const bumps: UserBump[] = [
    {
      id: '1',
      name: 'Primary SOL Bump',
      tokenAddress: '7xKX...83TZ',
      tokenSymbol: 'SOL',
      status: 'ACTIVE',
      nextBumpTime: new Date(Date.now() + 1800000),
      totalBumps: 150,
      totalVolume: 25.5,
      config: {
        buyAmount: 0.1,
        interval: 3600
      }
    },
    {
      id: '2',
      name: 'Secondary BONK Bump',
      tokenAddress: '9aBC...45XY',
      tokenSymbol: 'BONK',
      status: 'PAUSED',
      nextBumpTime: null,
      totalBumps: 75,
      totalVolume: 12.3,
      config: {
        buyAmount: 0.05,
        interval: 1800
      }
    }
  ]

  const handleQuickAction = async (bumpId: string, action: 'start' | 'stop') => {
    // Implement quick action logic
    console.log(`${action} bump ${bumpId}`)
  }

  return (
    <div className="space-y-4">
      {bumps.map(bump => (
        <div key={bump.id} className="card bg-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Bump Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{bump.name}</h3>
                  <div className={`badge ${bump.status === 'ACTIVE' ? 'badge-success' :
                    bump.status === 'PAUSED' ? 'badge-warning' :
                      'badge-error'
                    }`}>
                    {bump.status}
                  </div>
                </div>

                <div className="text-sm text-base-content/70 mb-4">
                  Token: <span className="font-mono">{bump.tokenSymbol}</span>
                </div>

                <div className="stats stats-horizontal bg-base-200 shadow">
                  <div className="stat px-4 py-2">
                    <div className="stat-title">Volume</div>
                    <div className="stat-value text-lg">{bump.totalVolume} SOL</div>
                  </div>
                  <div className="stat px-4 py-2">
                    <div className="stat-title">Bumps</div>
                    <div className="stat-value text-lg">{bump.totalBumps}</div>
                  </div>
                  <div className="stat px-4 py-2">
                    <div className="stat-title">Interval</div>
                    <div className="stat-value text-lg">{bump.config.interval}s</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-between">
                {bump.status === 'ACTIVE' && bump.nextBumpTime && (
                  <div className="text-sm flex items-center gap-1 text-base-content/70">
                    <Clock className="w-4 h-4" />
                    Next: {bump.nextBumpTime.toLocaleTimeString()}
                  </div>
                )}

                <div className="flex gap-2">
                  {bump.status !== 'ACTIVE' ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleQuickAction(bump.id, 'start')}
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleQuickAction(bump.id, 'stop')}
                    >
                      <Square className="w-4 h-4" />
                    </button>
                  )}

                  <Link
                    to={`/bump/${bump.id}/manage`}
                    className="btn btn-ghost btn-sm"
                  >
                    <Settings className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/bump/${bump.id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {bumps.length === 0 && (
        <div className="text-center py-8 bg-base-200 rounded-lg">
          <Activity className="w-12 h-12 mx-auto text-base-content/50" />
          <h3 className="mt-4 text-lg font-semibold">No Active Bumps</h3>
          <p className="text-base-content/70 mb-4">Get started by creating your first bump!</p>
          <Link to="/bump/create" className="btn btn-primary">
            Create New Bump
          </Link>
        </div>
      )}
    </div>
  )
}

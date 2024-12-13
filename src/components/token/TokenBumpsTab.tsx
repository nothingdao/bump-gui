// src/components/token/TokenBumpsTab.tsx
import React from 'react'
import { Activity, User, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BumpData {
  id: string
  creator: string
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED'
  totalBumps: number
  totalVolume: number
  lastBumpTime: Date
  contributors: number
}

export const TokenBumpsTab: React.FC = () => {
  // Mock data - replace with real data fetching
  const bumps: BumpData[] = [
    {
      id: '1',
      creator: '7xKX...83TZ',
      status: 'ACTIVE',
      totalBumps: 150,
      totalVolume: 25.5,
      lastBumpTime: new Date(),
      contributors: 3
    },
    {
      id: '2',
      creator: '9aBC...45XY',
      status: 'INACTIVE',
      totalBumps: 75,
      totalVolume: 12.3,
      lastBumpTime: new Date(Date.now() - 3600000),
      contributors: 2
    }
  ]

  return (
    <div className="space-y-4">
      {bumps.map(bump => (
        <div key={bump.id} className="card bg-base-200">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-mono">{bump.creator}</span>
                  <div className={`badge ${bump.status === 'ACTIVE' ? 'badge-success' :
                    bump.status === 'PAUSED' ? 'badge-warning' :
                      'badge-error'
                    }`}>
                    {bump.status}
                  </div>
                </div>

                <div className="stats stats-horizontal bg-base-300 shadow">
                  <div className="stat">
                    <div className="stat-title">Total Bumps</div>
                    <div className="stat-value text-lg">{bump.totalBumps}</div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Volume</div>
                    <div className="stat-value text-lg">{bump.totalVolume} SOL</div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Contributors</div>
                    <div className="stat-value text-lg">{bump.contributors}</div>
                  </div>
                </div>
              </div>

              <Link
                to={`/bump/${bump.id}`}
                className="btn btn-ghost btn-sm"
              >
                View Details
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {bumps.length === 0 && (
        <div className="text-center py-8 bg-base-200 rounded-lg">
          <Activity className="w-12 h-12 mx-auto text-base-content/50" />
          <h3 className="mt-4 text-lg font-semibold">No Active Bumps</h3>
          <p className="text-base-content/70">Be the first to create a bump for this token!</p>
        </div>
      )}
    </div>
  )
}

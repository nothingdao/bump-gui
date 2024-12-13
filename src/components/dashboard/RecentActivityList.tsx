// src/components/dashboard/RecentActivityList.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  AlertCircle,
  PlayCircle,
  StopCircle
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'BUY' | 'SELL' | 'CONFIG_CHANGE' | 'START' | 'STOP' | 'ERROR'
  bumpId: string
  bumpName: string
  timestamp: Date
  details: string
  status?: 'SUCCESS' | 'FAILED' | 'PENDING'
}

export const RecentActivityList: React.FC = () => {
  // Mock data - replace with real data fetching
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'BUY',
      bumpId: '1',
      bumpName: 'Primary SOL Bump',
      timestamp: new Date(),
      details: 'Bought 100 SOL for 0.1 SOL',
      status: 'SUCCESS'
    },
    {
      id: '2',
      type: 'CONFIG_CHANGE',
      bumpId: '1',
      bumpName: 'Primary SOL Bump',
      timestamp: new Date(Date.now() - 1800000),
      details: 'Updated buy amount to 0.2 SOL'
    },
    {
      id: '3',
      type: 'ERROR',
      bumpId: '2',
      bumpName: 'Secondary BONK Bump',
      timestamp: new Date(Date.now() - 3600000),
      details: 'Insufficient funds for transaction',
      status: 'FAILED'
    }
  ]

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'BUY':
        return <ArrowUpRight className="w-4 h-4 text-success" />
      case 'SELL':
        return <ArrowDownRight className="w-4 h-4 text-error" />
      case 'CONFIG_CHANGE':
        return <Settings className="w-4 h-4" />
      case 'START':
        return <PlayCircle className="w-4 h-4 text-success" />
      case 'STOP':
        return <StopCircle className="w-4 h-4 text-error" />
      case 'ERROR':
        return <AlertCircle className="w-4 h-4 text-error" />
    }
  }

  return (
    <div className="space-y-2">
      {activities.map(activity => (
        <div
          key={activity.id}
          className="flex items-center justify-between p-3 bg-base-300 rounded-lg"
        >
          <div className="flex items-center gap-3">
            {getActivityIcon(activity.type)}

            <div>
              <div className="font-medium">
                {activity.bumpName}
                {activity.status && (
                  <span className={`ml-2 badge badge-sm ${activity.status === 'SUCCESS' ? 'badge-success' :
                    activity.status === 'FAILED' ? 'badge-error' :
                      'badge-warning'
                    }`}>
                    {activity.status}
                  </span>
                )}
              </div>
              <div className="text-sm text-base-content/70">{activity.details}</div>
              <div className="text-xs text-base-content/50">
                {activity.timestamp.toLocaleString()}
              </div>
            </div>
          </div>

          <Link
            to={`/bump/${activity.bumpId}`}
            className="btn btn-ghost btn-sm"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      ))}

      {activities.length === 0 && (
        <div className="text-center py-6 bg-base-200 rounded-lg">
          <p className="text-base-content/70">No recent activity</p>
        </div>
      )}
    </div>
  )
}

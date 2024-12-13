// src/components/dashboard/UserDashboard.tsx
import React from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { UserBumpsList } from './UserBumpsList'
import { RecentActivityList } from './RecentActivityList'

export const UserDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Bumps</h2>
        <Link to="/bump/create" className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create New Bump
        </Link>
      </div>

      {/* Active Bumps Section */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Active Bumps</h3>
          <UserBumpsList />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Recent Activity</h3>
          <RecentActivityList />
        </div>
      </div>
    </div>
  )
}

// src/components/bump/ContributorsTab.tsx
import React from 'react'
import { User, Coins } from 'lucide-react'

interface Contributor {
  address: string
  totalContribution: number
  lastContribution: Date
  contributionCount: number
}

export const ContributorsTab: React.FC = () => {
  // Mock data - replace with real data fetching
  const contributors: Contributor[] = [
    {
      address: '7xKX...83TZ',
      totalContribution: 5.5,
      lastContribution: new Date(),
      contributionCount: 3
    },
    {
      address: '9aBC...45XY',
      totalContribution: 2.3,
      lastContribution: new Date(Date.now() - 86400000),
      contributionCount: 1
    }
  ]

  return (
    <div className="space-y-4">
      {/* Contributors List */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Contributor</th>
              <th>Total</th>
              <th>Contributions</th>
              <th>Last Contribution</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((contributor, index) => (
              <tr key={index}>
                <td className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-mono">{contributor.address}</span>
                </td>
                <td>{contributor.totalContribution} SOL</td>
                <td>{contributor.contributionCount}</td>
                <td>{contributor.lastContribution.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {contributors.length === 0 && (
        <div className="text-center py-8 bg-base-200 rounded-lg">
          <Coins className="w-12 h-12 mx-auto text-base-content/50" />
          <h3 className="mt-4 text-lg font-semibold">No Contributors Yet</h3>
          <p className="text-base-content/70">Be the first to contribute to this bump!</p>
        </div>
      )}
    </div>
  )
}

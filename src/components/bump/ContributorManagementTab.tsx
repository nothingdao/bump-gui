// src/components/bump/ContributorManagementTab.tsx
import React, { useState } from 'react'
import { User, Plus, Trash2, Check } from 'lucide-react'

interface Contributor {
  address: string
  totalContribution: number
  isBlocked: boolean
}

export const ContributorManagementTab: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([
    {
      address: '7xKX...83TZ',
      totalContribution: 5.5,
      isBlocked: false
    },
    {
      address: '9aBC...45XY',
      totalContribution: 2.3,
      isBlocked: true
    }
  ])

  const [newContributor, setNewContributor] = useState('')

  const handleAddContributor = () => {
    if (newContributor) {
      setContributors(prev => [...prev, {
        address: newContributor,
        totalContribution: 0,
        isBlocked: false
      }])
      setNewContributor('')
    }
  }

  const toggleBlock = (address: string) => {
    setContributors(prev => prev.map(c =>
      c.address === address ? { ...c, isBlocked: !c.isBlocked } : c
    ))
  }

  return (
    <div className="space-y-6">
      {/* Add Contributor */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Add Contributor</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Contributor wallet address"
              className="input input-bordered flex-1"
              value={newContributor}
              onChange={(e) => setNewContributor(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleAddContributor}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Contributors List */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Contributor</th>
              <th>Total Contribution</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td>
                  <span className={`badge ${contributor.isBlocked ? 'badge-error' : 'badge-success'}`}>
                    {contributor.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${contributor.isBlocked ? 'btn-success' : 'btn-error'}`}
                    onClick={() => toggleBlock(contributor.address)}
                  >
                    {contributor.isBlocked ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Unblock
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Block
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// src/components/bump/BumpProfile.tsx
import React from 'react'
import { Info, Users, History } from 'lucide-react'
import { BumpInfoTab } from './BumpInfoTab'
import { ContributorsTab } from './ContributorsTab'
import { TransactionHistoryTab } from '../shared/TransactionHistoryTab'
import { useWallet } from '@solana/wallet-adapter-react'
import { Link, useParams } from 'react-router-dom'

export const BumpProfile: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'info' | 'contributors' | 'history'>('info')
  const { publicKey } = useWallet()
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-6">
      {/* Header with Manage Button for Owner */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bump Details</h2>
        {publicKey && ( // Show manage button if user is authenticated
          <Link to={`/bump/${id}/manage`} className="btn btn-primary">
            Manage Bump
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${activeTab === 'info' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <Info className="w-4 h-4 mr-2" />
          Overview
        </a>
        <a
          className={`tab ${activeTab === 'contributors' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('contributors')}
        >
          <Users className="w-4 h-4 mr-2" />
          Contributors
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
        {activeTab === 'info' && <BumpInfoTab />}
        {activeTab === 'contributors' && <ContributorsTab />}
        {activeTab === 'history' && <TransactionHistoryTab />}
      </div>
    </div>
  )
}

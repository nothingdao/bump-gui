// src/components/token/TokenProfile.tsx
import React from 'react'
import { Info, History, Settings } from 'lucide-react'
import { TokenInfoTab } from './TokenInfoTab'
import { TokenBumpsTab } from './TokenBumpsTab'
import { TransactionHistoryTab } from '../shared/TransactionHistoryTab'

export const TokenProfile: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'info' | 'bumps' | 'history'>('info')

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${activeTab === 'info' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <Info className="w-4 h-4 mr-2" />
          Token Info
        </a>
        <a
          className={`tab ${activeTab === 'bumps' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('bumps')}
        >
          <Settings className="w-4 h-4 mr-2" />
          Active Bumps
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
        {activeTab === 'info' && <TokenInfoTab />}
        {activeTab === 'bumps' && <TokenBumpsTab />}
        {activeTab === 'history' && <TransactionHistoryTab />}
      </div>
    </div>
  )
}

// src/components/bump/BumpManagement.tsx
import React from 'react'
import { Settings, Users, Activity } from 'lucide-react'
import { BumpControlsTab } from './BumpControlsTab'
import { ContributorManagementTab } from './ContributorManagementTab'
import { BumpSettingsTab } from './BumpSettingsTab'

export const BumpManagement: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'controls' | 'contributors' | 'settings'>('controls')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Bump</h2>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${activeTab === 'controls' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('controls')}
        >
          <Activity className="w-4 h-4 mr-2" />
          Controls
        </a>
        <a
          className={`tab ${activeTab === 'contributors' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('contributors')}
        >
          <Users className="w-4 h-4 mr-2" />
          Manage Contributors
        </a>
        <a
          className={`tab ${activeTab === 'settings' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </a>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'controls' && <BumpControlsTab />}
        {activeTab === 'contributors' && <ContributorManagementTab />}
        {activeTab === 'settings' && <BumpSettingsTab />}
      </div>
    </div>
  )
}

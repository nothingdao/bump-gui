// src/components/bump/BumpSettingsTab.tsx
import React, { useState } from 'react'
import { Save, Trash2, AlertTriangle } from 'lucide-react'

interface BumpSettings {
  name: string
  description: string
  isPublic: boolean
  autoRestartOnFailure: boolean
  maxSlippage: number
}

export const BumpSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<BumpSettings>({
    name: 'My Bump',
    description: '',
    isPublic: true,
    autoRestartOnFailure: true,
    maxSlippage: 1
  })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSave = async () => {
    // Implement save logic
  }

  const handleDelete = async () => {
    // Implement delete logic
  }

  return (
    <div className="space-y-6">
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">General Settings</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Bump Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={settings.name}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={settings.description}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                description: e.target.value
              }))}
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Public Bump</span>
              <input
                type="checkbox"
                className="toggle"
                checked={settings.isPublic}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  isPublic: e.target.checked
                }))}
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Auto-restart on Failure</span>
              <input
                type="checkbox"
                className="toggle"
                checked={settings.autoRestartOnFailure}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  autoRestartOnFailure: e.target.checked
                }))}
              />
            </label>
          </div>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card bg-base-200 border-2 border-error">
        <div className="card-body">
          <h3 className="card-title text-error">Danger Zone</h3>

          {!showDeleteConfirm ? (
            <button
              className="btn btn-error"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Bump
            </button>
          ) : (
            <div className="space-y-4">
              <div className="alert alert-error">
                <AlertTriangle className="w-6 h-6" />
                <span>This action cannot be undone. Are you sure?</span>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

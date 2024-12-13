// src/components/bump/BumpControlsTab.tsx
import React, { useState } from 'react'
import { Play, Square, RefreshCw, AlertCircle } from 'lucide-react'

interface BumpControls {
  buyAmount: number
  interval: number
  slippage: number
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED'
}

export const BumpControlsTab: React.FC = () => {
  const [controls, setControls] = useState<BumpControls>({
    buyAmount: 0.1,
    interval: 3600,
    slippage: 1,
    status: 'INACTIVE'
  })

  const [isUpdating, setIsUpdating] = useState(false)

  const handleStart = async () => {
    // Implement start logic
    setControls(prev => ({ ...prev, status: 'ACTIVE' }))
  }

  const handleStop = async () => {
    // Implement stop logic
    setControls(prev => ({ ...prev, status: 'INACTIVE' }))
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    // Implement update logic
    setTimeout(() => setIsUpdating(false), 1000)
  }

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`alert ${controls.status === 'ACTIVE' ? 'alert-success' :
        controls.status === 'PAUSED' ? 'alert-warning' :
          'alert-error'
        }`}>
        <AlertCircle className="w-6 h-6" />
        <span>
          Status: <strong>{controls.status}</strong>
        </span>
      </div>

      {/* Control Form */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Bump Configuration</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Buy Amount (SOL)</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={controls.buyAmount}
              onChange={(e) => setControls(prev => ({
                ...prev,
                buyAmount: Number(e.target.value)
              }))}
              step="0.1"
              min="0"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Interval (seconds)</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={controls.interval}
              onChange={(e) => setControls(prev => ({
                ...prev,
                interval: Number(e.target.value)
              }))}
              min="1"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Slippage (%)</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={controls.slippage}
              onChange={(e) => setControls(prev => ({
                ...prev,
                slippage: Number(e.target.value)
              }))}
              min="0.1"
              max="100"
              step="0.1"
            />
          </div>

          <div className="card-actions justify-end space-x-2">
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
              Update Configuration
            </button>

            {controls.status !== 'ACTIVE' ? (
              <button
                className="btn btn-success"
                onClick={handleStart}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Bump
              </button>
            ) : (
              <button
                className="btn btn-error"
                onClick={handleStop}
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Bump
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

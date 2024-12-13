// src/components/bump/CreateBump.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import {
  Search,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

interface TokenValidationStatus {
  isValid: boolean
  name?: string
  symbol?: string
  error?: string
  isLoading?: boolean
}

interface BumpConfig {
  name: string
  description: string
  buyAmount: number
  interval: number
  slippage: number
  isPublic: boolean
}

export const CreateBump: React.FC = () => {
  const navigate = useNavigate()
  const { publicKey } = useWallet()
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  // Token validation state
  const [tokenAddress, setTokenAddress] = useState('')
  const [validationStatus, setValidationStatus] = useState<TokenValidationStatus>({
    isValid: false
  })

  // Bump configuration state
  const [config, setConfig] = useState<BumpConfig>({
    name: '',
    description: '',
    buyAmount: 0.1,
    interval: 3600,
    slippage: 1,
    isPublic: true
  })

  // Validation and next step handling
  const validateToken = async () => {
    setValidationStatus({ isValid: false, isLoading: true })

    try {
      // Validate the token address format
      new PublicKey(tokenAddress)

      // Mock token validation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setValidationStatus({
        isValid: true,
        name: 'Example Token',
        symbol: 'EX'
      })
    } catch (error) {
      setValidationStatus({
        isValid: false,
        error: 'Invalid token address'
      })
    }
  }

  const handleCreate = async () => {
    try {
      // Mock creation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Navigate to the new bump page
      navigate('/bump/new-bump-id')
    } catch (error) {
      console.error('Failed to create bump:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Create New Bump</h1>
        <p className="text-base-content/70">
          Set up automated buying for any Solana token
        </p>
      </div>

      {/* Step Progress */}
      <div className="steps w-full mb-8">
        <span className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>
          Select Token
        </span>
        <span className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>
          Configure Bump
        </span>
      </div>

      {currentStep === 1 ? (
        // Step 1: Token Selection
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Select Token</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Token Address</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter token address"
                  className={`input input-bordered flex-1 ${validationStatus.error ? 'input-error' : ''
                    }`}
                  value={tokenAddress}
                  onChange={(e) => {
                    setTokenAddress(e.target.value)
                    setValidationStatus({ isValid: false })
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={validateToken}
                  disabled={!tokenAddress || validationStatus.isLoading}
                >
                  {validationStatus.isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </div>

              {validationStatus.error && (
                <div className="alert alert-error mt-4">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationStatus.error}</span>
                </div>
              )}

              {validationStatus.isValid && (
                <div className="alert alert-success mt-4">
                  <CheckCircle2 className="w-4 h-4" />
                  <div>
                    <div className="font-bold">{validationStatus.name}</div>
                    <div className="text-xs">{validationStatus.symbol}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-primary"
                disabled={!validationStatus.isValid}
                onClick={() => setCurrentStep(2)}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Step 2: Configuration
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Configure Bump</h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bump Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a name for your bump"
                  className="input input-bordered"
                  value={config.name}
                  onChange={(e) => setConfig(prev => ({
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
                  placeholder="Optional description"
                  value={config.description}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Buy Amount (SOL)</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={config.buyAmount}
                    onChange={(e) => setConfig(prev => ({
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
                    value={config.interval}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      interval: Number(e.target.value)
                    }))}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Public Bump</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={config.isPublic}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      isPublic: e.target.checked
                    }))}
                  />
                </label>
                <label className="label">
                  <span className="label-text-alt text-base-content/70">
                    Public bumps are visible to everyone and allow contributions
                  </span>
                </label>
              </div>
            </div>

            <div className="card-actions justify-between mt-4">
              <button
                className="btn btn-ghost"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreate}
                disabled={!config.name}
              >
                Create Bump
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

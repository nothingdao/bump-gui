// src/components/shared/TransactionHistoryTab.tsx
import React, { useState } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  ExternalLink,
  RefreshCw,
  SortAsc,
  SortDesc
} from 'lucide-react'

interface Transaction {
  id: string
  type: 'BUY' | 'SELL' | 'CONTRIBUTION' | 'WITHDRAWAL'
  amount: number
  timestamp: Date
  signature: string
  status: 'CONFIRMED' | 'PENDING' | 'FAILED'
  fromAddress: string
  toAddress: string
  tokenAmount?: number
  tokenSymbol?: string
  error?: string
}

interface TransactionHistoryTabProps {
  scope?: 'token' | 'bump' // Optional prop to customize behavior based on context
  address?: string // Token address or bump ID
}

export const TransactionHistoryTab: React.FC<TransactionHistoryTabProps> = () => {

  // State for filters and sorting
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all'
  })
  const [sortConfig, setSortConfig] = useState({
    field: 'timestamp',
    direction: 'desc' as 'asc' | 'desc'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with real data fetching
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'BUY',
      amount: 0.1,
      timestamp: new Date(),
      signature: '5Th7Pu...3bKm',
      status: 'CONFIRMED',
      fromAddress: '7xKX...83TZ',
      toAddress: '9aBC...45XY',
      tokenAmount: 1000,
      tokenSymbol: 'SOL'
    },
    {
      id: '2',
      type: 'SELL',
      amount: 0.05,
      timestamp: new Date(Date.now() - 3600000),
      signature: '3nM8Kj...9vLp',
      status: 'FAILED',
      fromAddress: '9aBC...45XY',
      toAddress: '7xKX...83TZ',
      tokenAmount: 500,
      tokenSymbol: 'SOL',
      error: 'Insufficient funds'
    }
  ]

  const refreshTransactions = async () => {
    setIsLoading(true)
    // Implement refresh logic
    setTimeout(() => setIsLoading(false), 1000)
  }

  const toggleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }))
  }

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${showFilters ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={refreshTransactions}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Transaction Type</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="all">All Types</option>
                  <option value="BUY">Buy</option>
                  <option value="SELL">Sell</option>
                  <option value="CONTRIBUTION">Contribution</option>
                  <option value="WITHDRAWAL">Withdrawal</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="all">All Statuses</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date Range</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                >
                  <option value="all">All Time</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>
                <button
                  className="flex items-center gap-2"
                  onClick={() => toggleSort('timestamp')}
                >
                  Time
                  {sortConfig.field === 'timestamp' && (
                    sortConfig.direction === 'desc' ?
                      <SortDesc className="w-4 h-4" /> :
                      <SortAsc className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th>Amount</th>
              <th>Status</th>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>
                  <div className="flex items-center gap-2">
                    {tx.type === 'BUY' && <ArrowUpRight className="w-4 h-4 text-success" />}
                    {tx.type === 'SELL' && <ArrowDownRight className="w-4 h-4 text-error" />}
                    {tx.type}
                  </div>
                </td>
                <td>{tx.timestamp.toLocaleString()}</td>
                <td className="font-mono">
                  {tx.amount} SOL
                  {tx.tokenAmount && (
                    <div className="text-xs text-base-content/70">
                      {tx.tokenAmount} {tx.tokenSymbol}
                    </div>
                  )}
                </td>
                <td>
                  <div className={`badge ${tx.status === 'CONFIRMED' ? 'badge-success' :
                    tx.status === 'FAILED' ? 'badge-error' :
                      'badge-warning'
                    }`}>
                    {tx.status}
                  </div>
                  {tx.error && (
                    <div className="text-xs text-error mt-1">
                      {tx.error}
                    </div>
                  )}
                </td>
                <td className="font-mono text-sm">{tx.fromAddress}</td>
                <td className="font-mono text-sm">{tx.toAddress}</td>
                <td>
                  <a
                    href={`https://solscan.io/tx/${tx.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-8 bg-base-200 rounded-lg">
          <p className="text-base-content/70">No transactions found</p>
        </div>
      )}
    </div>
  )
}

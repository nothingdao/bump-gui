// src/components/token/TokenInfoTab.tsx
import React from 'react'
import { CircleDollarSign, TrendingUp, LineChart } from 'lucide-react'

interface TokenInfoData {
  address: string
  name: string
  symbol: string
  currentPrice: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  lastUpdated: Date
}

export const TokenInfoTab: React.FC = () => {
  // Mock data - replace with real data fetching
  const tokenInfo: TokenInfoData = {
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    name: "Example Token",
    symbol: "EX",
    currentPrice: 0.145,
    priceChange24h: 5.23,
    volume24h: 50000,
    marketCap: 1000000,
    lastUpdated: new Date()
  }

  return (
    <div className="space-y-6">
      {/* Price Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <CircleDollarSign className="w-8 h-8" />
          </div>
          <div className="stat-title">Current Price</div>
          <div className="stat-value">${tokenInfo.currentPrice.toFixed(4)}</div>
          <div className="stat-desc flex items-center gap-1">
            <span className={tokenInfo.priceChange24h >= 0 ? 'text-success' : 'text-error'}>
              {tokenInfo.priceChange24h > 0 ? '+' : ''}{tokenInfo.priceChange24h}%
            </span>
            <span>24h change</span>
          </div>
        </div>

        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="stat-title">24h Volume</div>
          <div className="stat-value">${tokenInfo.volume24h.toLocaleString()}</div>
        </div>

        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <LineChart className="w-8 h-8" />
          </div>
          <div className="stat-title">Market Cap</div>
          <div className="stat-value">${tokenInfo.marketCap.toLocaleString()}</div>
        </div>
      </div>

      {/* Token Details Card */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Token Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Contract Address</label>
              <div className="flex items-center gap-2">
                <code className="block p-2 bg-base-300 rounded text-sm overflow-hidden text-ellipsis">
                  {tokenInfo.address}
                </code>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => navigator.clipboard.writeText(tokenInfo.address)}
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <label className="label">Symbol</label>
              <div className="font-mono p-2">{tokenInfo.symbol}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

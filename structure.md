# Project Structure

## Root Files
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── structure.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts

## Public Assets
public/
└── vite.svg

## Source Code (src/)
src/
├── main.tsx
├── App.tsx
├── index.css
├── declarations.d.ts
├── vite-env.d.ts

### Core Assets
├── assets/
│   ├── react.svg
│   ├── amd.png
│   ├── apple.png
│   ├── meta.png
│   ├── nvidia.png
│   ├── tesla.png
│   └── icons/
│       └── arrow-right.png
│   └── trend/
│       ├── amdChart.png
│       ├── appleChart.png
│       ├── metaChart.png
│       ├── nividiaChart.png
│       └── teslaChart.png

### Components
├── components/
│   ├── Sidebar.tsx
│   ├── StockCard.tsx
│   ├── navbar/
│   │   └── Navbar.tsx
│   ├── dashboard/
│   │   ├── MyStocks.tsx
│   │   ├── PortfolioSummary.tsx
│   │   ├── QuickActions.tsx
│   │   ├── StockDashboard.tsx
│   │   ├── TrendingStocks.tsx
│   │   └── Watchlist.tsx
│   └── Explore/
│       ├── FilterTabs.tsx
│       ├── MarketHeader.tsx
│       ├── MarketOverviewCards.tsx
│       ├── OverviewCard.tsx
│       ├── SectionHeader.tsx
│       ├── StockCard.tsx
│       ├── StockChart.tsx
│       ├── StocksDisplay.tsx
│       ├── StocksTable.tsx
│       └── TrendingStockCard.tsx

### Pages
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── ExploreStocks.tsx
│   ├── Portfolio.tsx
│   ├── Buy.tsx
│   ├── StockDetail.tsx
│   ├── Watchlist.tsx
│   └── Settings.tsx

### Data & Services
├── data/
│   └── stocks.ts
├── services/
│   └── stockAPI.ts

### State Management
├── stores/
│   └── watchlistStore.ts
├── types/
│   ├── portfolio.ts
│   ├── stock.ts
│   ├── user.ts
│   └── watchlist.ts

### UI Components
├── ui/
│   └── common/
│       ├── Button.tsx
│       ├── TextButton.tsx
│       ├── Tooltip.tsx
│       ├── ErrorDisplay.tsx
│       ├── LoadingSpinner.tsx
│       ├── NoDataDisplay.tsx
│       └── WatchlistButton.tsx

## Draft/Experimental Features
draft/
├── App.css
├── code.tsx
├── DemoBanner.tsx
├── DemoModeRouter.tsx
├── demoModeStore.ts
├── DemoToggle.tsx
├── DemoWelcome.tsx
├── PortfolioOverview.tsx
├── TradeButton.tsx
├── tradingStore.ts
├── context/
│   ├── DemoModeContext.tsx
│   ├── DemoTradingContext.tsx
│   └── TradingContext.tsx
└── features/
    ├── auth/
    └── stocks/
        └── store.ts


Users

id, email, password, role, kycStatus, balance, isDemo

Stocks

id, symbol, name, sector, price, change, volume

UserStocks (Portfolio)

id, userId, stockId, quantity, avgPrice

Transactions

id, userId, type (deposit, withdraw, buy, sell), amount, status, timestamp

Orders

id, userId, stockId, type (buy, sell), quantity, price, status

Watchlists

id, userId, stockId

KYC

id, userId, nationalId, selfieUrl, status

Notifications

id, userId, message, read

Admins

Extends user model via role
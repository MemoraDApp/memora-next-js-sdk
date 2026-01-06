# 🧠 Memora

**Memora** is an *on-chain intelligence* and *wallet behavior analysis* platform focused on the **Solana ecosystem**. It is designed to help traders, builders, and researchers understand transaction patterns, market psychology, and wallet decision quality using real-time and historical blockchain data.

> *“Trading is not about luck — it is about behavior, timing, and intent.”*

---

## ✨ Key Features

* 🔍 **Wallet Intelligence Analysis**
  Deep analysis of wallet behavior based on historical buy, sell, and swap activity.

* 📊 **Behavioral Metrics Engine**
  Advanced metrics including:

  * Rationality Score
  * Bias Index
  * Accrual Velocity
  * Volume Concentration
  * Trade Consistency

* 🧬 **DEX Source Detection**
  Identifies transaction origins across multiple DEXs such as:
  `pumpfun`, `bonk`, `gmgn`, `axiom`, `bags`, and more.

* ⚡ **Real-time & Near Real-time Data**
  Powered by Solana RPC and indexing APIs for fast and reliable data access.

* 🧠 **Protocol Intelligence Layer (Memora Intel)**
  Soft filtering and signal extraction to detect:

  * Smart money behavior
  * FOMO and panic patterns
  * Bot-like activity

* 🎨 **Modern Analytics Dashboard**
  Built with **Next.js, Shadcn UI, and Tailwind CSS**, focusing on:

  * High readability
  * Clear data visualization
  * Native dark mode

---

## 🏗️ Architecture

```
memora/
├─ app/
│  ├─ dashboard/          # Analytics dashboard UI
│  ├─ api/                # API routes (Intel, Wallet, Metrics)
│  └─ layout.tsx
│
├─ lib/
│  ├─ solana/             # Solana RPC & transaction utilities
│  ├─ intel/              # Behavioral analysis engine
│  └─ firebase/           # Realtime data & persistence layer
│
├─ components/
│  ├─ ui/                 # Shadcn UI components
│  └─ charts/             # Data visualizations
│
├─ types/                 # Global TypeScript types
├─ utils/                 # Helper functions & formatters
└─ README.md
```

---

## 🧪 Example Data Models

```ts
export type MemoraTrade = {
  amountUSD: number
  timestamp: number
  type: "buy" | "sell" | "swap"
  source: "pumpfun" | "bonk" | "gmgn" | "axiom" | "bags" | "unknown"
}
```

```ts
export type MemoraIntel = {
  rationality: number
  biasIndex: number
  accrualVelocity: number
  totalVolumeUSD: number
  tradeCount: number
}
```

---

## 🚀 Installation & Development

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-org/memora.git
cd memora
```

### 2️⃣ Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
MEMORA_INTEL_SECRET=your_secret
```

### 4️⃣ Run the Development Server

```bash
pnpm dev
```

Access the app at: `http://localhost:3000`

---

## 📈 Use Cases

* 🧑‍💻 **Retail Traders**
  Evaluate whether a wallet is worth following or avoiding.

* 🧠 **Alpha Hunters**
  Identify high-consistency, high-performance wallets.

* 🏗️ **Protocols & DEX Teams**
  Analyze user behavior and liquidity movement.

* 🔐 **Security & Research**
  Detect bots, wash trading, and volume manipulation.

---

## 🔮 Roadmap

* [ ] Multi-chain support (EVM, Base, BSC)
* [ ] Wallet clustering & identity graph
* [ ] AI-based trade intent classification
* [ ] Public Intel API
* [ ] Social sentiment correlation

---

## 🛡️ Disclaimer

Memora is **not a financial advisor**. All data and analysis are provided for **research and educational purposes only**. Any trading decisions are made at the user’s own risk.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`feature/intel-v2`)
3. Commit your changes
4. Submit a Pull Request

---

## 📄 License

MIT License © 2026 — **Memora Intelligence**

---

## 🌐 Contact

* Website: *Coming soon*
* X / Twitter: *@memora_intel*
* Email: `contact@memora.ai`

---

**Memora — Decode the mind behind the money.**

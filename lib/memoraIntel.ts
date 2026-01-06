export type MemoraDEX =
  | "pumpfun"
  | "bonk"
  | "bags"
  | "axiom"
  | "gmgn"
  | "padre"
  | "unknown"

export type MemoraTrade = {
  amountUSD: number
  timestamp: number
  type: "buy" | "sell" | "swap"
  source: MemoraDEX
}

export function calculateIntelMetrics(trades: MemoraTrade[]) {
  const validTrades = trades.filter(t =>
    t.amountUSD > 0 &&
    Number.isFinite(t.timestamp) &&
    t.timestamp > 0
  )

  if (validTrades.length < 2) {
    return null
  }

  // ===============================
  // BASE (SOFT MODE)
  // ===============================
  let rationality = 110

  let consistencyPenalty = 0
  let patiencePenalty = 0
  let overtradePenalty = 0
  let riskPenalty = 0
  let cleanlinessPenalty = 0

  let biasCount = 0
  let volume = 0

  const sorted = [...validTrades].sort(
    (a, b) => a.timestamp - b.timestamp
  )

  // ===============================
  // CONSISTENCY (VERY SOFT)
  // ===============================
  const days = new Set(
    sorted.map(t =>
      new Date(t.timestamp).toDateString()
    )
  )

  if (days.size === 1 && sorted.length >= 6) {
    consistencyPenalty += 2
    biasCount++
  }

  // ===============================
  // LOOP ANALYSIS
  // ===============================
  for (let i = 0; i < sorted.length; i++) {
    const trade = sorted[i]
    volume += trade.amountUSD

    // 1️⃣ SMALL TRADE (VERY LIGHT)
    if (trade.amountUSD < 3) {
      riskPenalty += 0.25
      biasCount++
    }

    // 2️⃣ DEX CLEANLINESS (MINIMAL)
    if (trade.source === "pumpfun" || trade.source === "gmgn") {
      cleanlinessPenalty += 0.15
    }

    // 3️⃣ TIMING BEHAVIOR
    if (i > 0) {
      const delta = trade.timestamp - sorted[i - 1].timestamp

      // impulsive (< 2 min)
      if (delta < 2 * 60 * 1000) {
        patiencePenalty += 0.6
        overtradePenalty += 0.3
        biasCount++
      }

      // bot-like (< 30 sec) → still punished
      if (delta < 30 * 1000) {
        overtradePenalty += 1.5
        cleanlinessPenalty += 0.8
        biasCount += 2
      }
    }
  }

  // ===============================
  // SOFT PENALTY CAP
  // ===============================
  const totalPenalty = Math.min(
    consistencyPenalty +
      patiencePenalty +
      overtradePenalty +
      riskPenalty +
      cleanlinessPenalty,
    55 // softer cap
  )

  rationality -= totalPenalty

  // higher grace floor
  rationality = Math.max(40, Math.min(100, rationality))

  // ===============================
  // DISCIPLINE TIER
  // ===============================
  const disciplineTier =
    rationality >= 88 ? "Excellence"
    : rationality >= 72 ? "Stable"
    : rationality >= 55 ? "Risky"
    : "Unstable"

  // ===============================
  // ACCRUAL VELOCITY (BUFFED)
  // ===============================
  const accrualVelocity =
    volume >= 7000 ? 1.9
    : volume >= 3000 ? 1.6
    : volume >= 1500 ? 1.35
    : volume >= 700 ? 1.15
    : 1.05

  // ===============================
  // FINAL INTEL SCORE
  // ===============================
  const intelScore =
    rationality * 0.7 +
    accrualVelocity * 20

  return {
    rationalityIndex: Number(rationality.toFixed(1)),
    disciplineTier,
    accrualVelocity: Number(accrualVelocity.toFixed(2)),
    intelScore: Number(intelScore.toFixed(1)),
    biasRate: Number(
      ((biasCount / validTrades.length) * 100).toFixed(2)
    )
  }
}

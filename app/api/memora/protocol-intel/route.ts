import { db } from "@/lib/firebase"
import { ref, get, update } from "firebase/database"
import { NextResponse } from "next/server"

const HELIUS_API_KEY = "HELIUS_API_KEY"
const HELIUS_BASE = "https://api.helius.xyz/v0/addresses"

type HeliusTx = {
  timestamp?: number // seconds
}

/* ===============================
   INTEL + RATIONALITY ENGINE
================================ */

function calculateIntelAndRationality(timestamps: number[]) {
  if (timestamps.length < 2) {
    return {
      intelScore: 5,
      rationalityIndex: 10,
    }
  }

  timestamps.sort((a, b) => a - b)

  const first = timestamps[0]
  const last = timestamps[timestamps.length - 1]

  const totalDays = Math.max(
    1,
    Math.ceil((last - first) / 86_400_000)
  )

  const tradesPerDay = timestamps.length / totalDays

  // ===============================
  // SPACING ANALYSIS
  // ===============================
  let spacingSum = 0
  for (let i = 1; i < timestamps.length; i++) {
    spacingSum += timestamps[i] - timestamps[i - 1]
  }

  const avgSpacing =
    spacingSum / (timestamps.length - 1)

  // ===============================
  // RATIONALITY INDEX (0–100)
  // ===============================
  let rationality = 100

  // overtrading penalty
  if (tradesPerDay > 30) rationality -= 50
  else if (tradesPerDay > 15) rationality -= 35
  else if (tradesPerDay > 8) rationality -= 20
  else if (tradesPerDay > 4) rationality -= 10

  // panic trading (spacing too short)
  if (avgSpacing < 60_000) rationality -= 25        // < 1 min
  else if (avgSpacing < 300_000) rationality -= 15 // < 5 min
  else if (avgSpacing < 900_000) rationality -= 5  // < 15 min

  rationality = Math.max(
    0,
    Math.min(100, Math.round(rationality))
  )

  // ===============================
  // INTEL SCORE (0–100)
  // ===============================
  let intel = 0

  // longevity intelligence
  if (totalDays >= 3) intel += 15
  if (totalDays >= 7) intel += 15
  if (totalDays >= 30) intel += 20

  // activity awareness
  if (timestamps.length >= 5) intel += 10
  if (timestamps.length >= 15) intel += 10
  if (timestamps.length >= 40) intel += 10

  // spacing maturity
  if (avgSpacing > 10 * 60_000) intel += 10   // >10 min
  if (avgSpacing > 60 * 60_000) intel += 10   // >1 hour

  // irrationality penalty
  intel -= (100 - rationality) * 0.5

  intel = Math.max(
    0,
    Math.min(100, Math.round(intel))
  )

  return {
    intelScore: intel,
    rationalityIndex: rationality,
  }
}

/* ===============================
   API HANDLER
================================ */

export async function GET() {
  try {
    const walletsSnap = await get(ref(db, "wallets"))
    if (!walletsSnap.exists()) {
      return NextResponse.json({ status: "No wallets found" })
    }

    const wallets = walletsSnap.val()
    const results: any[] = []

    for (const walletAddress of Object.keys(wallets)) {
      const heliusRes = await fetch(
        `${HELIUS_BASE}/${walletAddress}/transactions?api-key=${HELIUS_API_KEY}`,
        { cache: "no-store" }
      )

      if (!heliusRes.ok) continue

      const heliusJson = await heliusRes.json()
      const txs: HeliusTx[] = Array.isArray(heliusJson)
        ? heliusJson
        : []

      const timestamps = txs
        .filter(tx => typeof tx.timestamp === "number")
        .map(tx => tx.timestamp! * 1000)

      if (timestamps.length < 2) continue

      const {
        intelScore,
        rationalityIndex
      } = calculateIntelAndRationality(timestamps)

      await update(ref(db, `wallets/${walletAddress}`), {
        intelScore,
        rationalityIndex,
        tradeCount: timestamps.length,
        firstSeen: Math.min(...timestamps),
        lastSeen: Math.max(...timestamps),
        scanMode: "INTEL_ENGINE",
        lastAnalyzed: Date.now()
      })

      results.push({
        wallet: walletAddress,
        intelScore,
        rationalityIndex,
        trades: timestamps.length
      })
    }

    return NextResponse.json({
      status: "Memora Intel Scan Complete",
      updatedWallets: results.length,
      results
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Memora Scan Failed" },
      { status: 500 }
    )
  }
}

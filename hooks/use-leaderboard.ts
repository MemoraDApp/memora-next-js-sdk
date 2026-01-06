"use client"

import { useEffect, useState } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "@/lib/firebase"

type WalletData = {
  wallet: string
  intelScore: number
  rationalityIndex: number
  disciplineTier: string
  accrualVelocity: number
  accruedValue: number
  tier: string
}

type RankedWallet = WalletData & {
  rank: number
  isWinner: boolean
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<RankedWallet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const walletsRef = ref(db, "wallets")

    const unsub = onValue(walletsRef, (snapshot) => {
      if (snapshot.exists()) {
        const walletsData = snapshot.val()
        
        // Convert to array and sort by intelScore descending
        const walletsArray: WalletData[] = Object.keys(walletsData).map((key) => ({
          wallet: key,
          ...walletsData[key],
        }))

        // Sort by intelScore (highest first)
        const sortedWallets = walletsArray.sort((a, b) => b.intelScore - a.intelScore)

        // Add rank and winner status
        const rankedWallets: RankedWallet[] = sortedWallets.map((wallet, index) => ({
          ...wallet,
          rank: index + 1,
          isWinner: index < 5, // Top 5 are winners
        }))

        setLeaderboard(rankedWallets)
        setLoading(false)
      } else {
        setLeaderboard([])
        setLoading(false)
      }
    })

    return () => unsub()
  }, [])

  return { leaderboard, loading }
}

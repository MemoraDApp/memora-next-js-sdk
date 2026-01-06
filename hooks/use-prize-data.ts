"use client"

import { useEffect, useState } from "react"
import { ref, onValue, off } from "firebase/database"
import { db } from "@/lib/firebase"

/* ================= TYPES ================= */

type PrizeDistribution = {
  rank1: number
  rank2: number
  rank3: number
  rank4: number
  rank5: number
}

type PrizeData = {
  wallet: string
  totalPoolSOL: number
  devCut: number
  distributableSOL: number
  distribution: PrizeDistribution
  timestamp: number
}

/* ================= HOOK ================= */

export function usePrizeData() {
  const [prizeData, setPrizeData] = useState<PrizeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const prizeRef = ref(db, "weekly_prizes/current")

    const unsubscribe = onValue(
      prizeRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setPrizeData(snapshot.val())
          setError(null)
        } else {
          setPrizeData(null)
          setError("Prize data not available")
        }
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setPrizeData(null)
        setLoading(false)
      }
    )

    return () => {
      off(prizeRef)
    }
  }, [])

  return {
    prizeData,
    loading,
    error
  }
}

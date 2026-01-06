"use client"

import { useState, useEffect, useCallback } from "react"
import { ref, onValue, update } from "firebase/database"
import { db } from "@/lib/firebase"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  Timer,
  Gift,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trophy,
} from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

/* ================= PROPS ================= */

interface ClaimCardProps {
  walletAddress: string
  rank: number,
  point: number
}

/* ================= COMPONENT ================= */

export function ClaimCard({ walletAddress, rank, point }: ClaimCardProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)
  const [isClaimWindow, setIsClaimWindow] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  const [totalPoolSOL, setTotalPoolSOL] = useState(0)
  const [distribution, setDistribution] = useState<any>(null)
  const [hasClaimed, setHasClaimed] = useState(false)

  const MIN_POINT = 30
  const isEligibleByPoint = point >= MIN_POINT

  useEffect(() => {
    const prizeRef = ref(db, "weekly_prizes/current")

    const unsub = onValue(prizeRef, (snap) => {
      if (!snap.exists()) return

      const data = snap.val()
      setTotalPoolSOL(data.totalPoolSOL)
      setDistribution(data.distribution)
      setHasClaimed(data.claimed?.[walletAddress] === true)
    })

    return () => unsub()
  }, [walletAddress])

  /* ================= CALC ================= */

  const distributableSOL = totalPoolSOL * 0.8
  const devCut = +(totalPoolSOL * 0.2).toFixed(6)

  const prizeAmount =
    rank === 1 ? distribution?.rank1 :
      rank === 2 ? distribution?.rank2 :
        rank === 3 ? distribution?.rank3 :
          rank === 4 ? distribution?.rank4 :
            rank === 5 ? distribution?.rank5 : 0

  const isWinner = rank >= 1 && rank <= 5

  /* ================= TIME WINDOW ================= */

  const checkClaimStatus = useCallback(() => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()

    const active = day === 0 && hour >= 12 && hour < 24
    setIsClaimWindow(active)

    const targetDate = new Date(now)
    if (active) {
      targetDate.setHours(24, 0, 0, 0)
    } else {
      const daysUntilSunday = (7 - day) % 7
      targetDate.setDate(now.getDate() + (daysUntilSunday === 0 && hour >= 12 ? 7 : daysUntilSunday))
      targetDate.setHours(12, 0, 0, 0)
    }

    const diff = targetDate.getTime() - now.getTime()
    setTimeLeft({
      hours: Math.max(0, Math.floor(diff / 3600000)),
      minutes: Math.max(0, Math.floor((diff % 3600000) / 60000)),
      seconds: Math.max(0, Math.floor((diff % 60000) / 1000)),
    })
  }, [])

  useEffect(() => {
    checkClaimStatus()
    const timer = setInterval(checkClaimStatus, 1000)
    return () => clearInterval(timer)
  }, [checkClaimStatus])

  /* ================= CLAIM ================= */

  const handleClaim = async () => {
    if (!isEligibleByPoint) {
      toast.error("Insufficient points. Minimum 30 points required.")
      return
    }

    if (!isWinner || hasClaimed || prizeAmount <= 0) return

    setIsClaiming(true)
    try {
      const res = await fetch("/api/memora/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          rank,
          amount: prizeAmount,
          action: "CLAIM_REWARD",
        }),
      })

      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Claim failed")

      await update(ref(db, "weekly_prizes/current/claimed"), {
        [walletAddress]: true,
      })

      toast.success("Reward claimed successfully!")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsClaiming(false)
    }
  }

  if (!isWinner || !distribution) return null

  /* ================= UI (UNCHANGED) ================= */

  return (
    <Card className="border-secondary/30 bg-secondary/5 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <Gift className="h-16 w-16" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl italic text-secondary flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Claim Reward
            </CardTitle>
            <CardDescription className="uppercase text-[10px] tracking-widest mt-1">
              Winner distribution protocol
            </CardDescription>
          </div>

          {timeLeft && (
            <Badge
              variant="outline"
              className="font-mono text-[10px] border-secondary/30 text-secondary bg-secondary/10"
            >
              <Timer className="mr-1 h-3 w-3" />
              {timeLeft.hours.toString().padStart(2, "0")}:
              {timeLeft.minutes.toString().padStart(2, "0")}:
              {timeLeft.seconds.toString().padStart(2, "0")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="bg-background/40 p-3 rounded-md border border-secondary/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
              Your Allocation
            </div>
            <div className="text-2xl font-black italic text-secondary">
              {prizeAmount.toFixed(2)} USDC
            </div>
            <div className="text-[10px] text-muted-foreground mt-1 uppercase">
              Rank #{rank} Recognition
            </div>
          </div>

          <AnimatePresence mode="wait">
            {hasClaimed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-500 font-bold italic justify-center py-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                CLAIMED SUCCESSFULLY
              </motion.div>
            ) : isClaimWindow ? (
              <Button
                onClick={handleClaim}
                disabled={isClaiming}
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-black italic"
              >
                {isClaiming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  "CLAIM REWARD NOW"
                )}
              </Button>
            ) : (
              <div className="text-center p-2 rounded border border-yellow-500/30 bg-yellow-500/5 flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-[10px] uppercase font-bold text-yellow-500">
                  Window Opens: Sunday 12:00 PM
                </span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

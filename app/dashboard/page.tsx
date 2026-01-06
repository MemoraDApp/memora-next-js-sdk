"use client"

import { useEffect, useState } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "@/lib/firebase"
import Cookies from "js-cookie"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Award, Brain, Shield, Trophy, Coins } from "lucide-react"
import { motion } from "framer-motion"
import { usePrizeData } from "@/hooks/use-prize-data"
import { useLeaderboard } from "@/hooks/use-leaderboard"
import { ClaimCard } from "@/components/claim-card"

type WalletIntel = {
  wallet: string
  rationalityIndex: number
  disciplineTier: string
  accrualVelocity: number
  accruedValue: number
  intelScore: number
  tier: string
}

export default function DashboardPage() {
  const [intel, setIntel] = useState<WalletIntel | null>(null)
  const { prizeData, loading: prizeLoading } = usePrizeData()
  const { leaderboard, loading: leaderboardLoading } = useLeaderboard()

  const walletAddress = Cookies.get("memora_wallet") || ""

  useEffect(() => {
    if (!walletAddress && typeof window !== "undefined") {
      window.location.href = "/"
    }
  }, [walletAddress])

  useEffect(() => {
    if (!walletAddress) return
    const walletRef = ref(db, `wallets/${walletAddress}`)
    const unsub = onValue(walletRef, (snap) => {
      if (snap.exists()) {
        setIntel(snap.val())
      }
    })
    return () => unsub()
  }, [walletAddress])

  const userRankData = leaderboard.find((item) => item.wallet === walletAddress)
  const userRank = userRankData?.rank ?? "--"
  const totalWallets = leaderboard.length
  const percentile = userRankData ? ((userRankData.rank / totalWallets) * 100).toFixed(2) : "--"

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
      <Navigation />

      <main className="container max-w-7xl py-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Protocol Intel</h1>
            <p className="text-muted-foreground text-sm tracking-widest uppercase">
              Cognitive pattern analysis & recognition tiers
            </p>
          </motion.div>

          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary px-3 py-1 font-mono">
            <Activity className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
            Neural Link Active
          </Badge>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-md h-full">
              <CardHeader>
                <CardTitle className="text-xl italic flex items-center gap-2">
                  <Coins className="h-5 w-5 text-accent" />
                  Prize Pool
                </CardTitle>
                <CardDescription className="uppercase text-xs tracking-widest">
                  Live prize distribution tracker
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prizeLoading ? (
                  <div className="text-center py-4 text-muted-foreground">Loading prize data...</div>
                ) : prizeData ? (
                  <div className="space-y-6">
                    <div className="text-center p-4 rounded-lg bg-background/40">
                      <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Total Pool</div>
                      <div className="text-4xl font-black italic text-accent">
                        {prizeData.distributableSOL.toFixed(2)} USDC
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-5">
                      {Object.entries(prizeData.distribution).map(([rank, value]) => (
                        <motion.div
                          key={rank}
                          whileHover={{ scale: 1.02 }}
                          className="p-3 rounded-md border bg-background/20"
                        >
                          <div className="text-xs text-muted-foreground uppercase mb-1">
                            {rank.replace("rank", "Rank ")}
                          </div>
                          <div className="text-xl font-black italic">{value.toFixed(2)}</div>
                          <div className="text-[10px] text-muted-foreground">USDC</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <ClaimCard
            walletAddress={walletAddress}
            rank={typeof userRank === "number" ? userRank : 0}
            point={Number(intel?.rationalityIndex.toFixed(1)) ?? 0}
          />
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <Card className="border-primary/20 bg-card/40 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                Rationality Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-primary italic">
                {intel?.rationalityIndex.toFixed(1) ?? "--"}
                <span className="text-sm text-muted-foreground ml-2">/100</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-card/40 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <Shield className="h-4 w-4 text-secondary" />
                Discipline Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-secondary italic">{intel?.disciplineTier ?? "--"}</div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-card/40 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <Award className="h-4 w-4 text-accent" />
                Accrual Velocity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-accent italic">{intel?.accrualVelocity.toFixed(1) ?? "--"}x</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Accrued: {intel?.accruedValue?.toFixed(2) ?? "--"} USDC
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="bg-card/40 border-primary/10 shadow-2xl backdrop-blur-xl h-full overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="italic flex gap-2 items-center text-2xl font-black">
                    <Trophy className="h-6 w-6 text-secondary" />
                    GLOBAL RECOGNITION
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {/* <div className="flex -space-x-2 mr-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full border-2 border-background bg-muted-foreground/20"
                        />
                      ))}
                    </div> */}
                    <Badge variant="outline" className="font-mono text-[10px] bg-white/5 uppercase tracking-tighter">
                      PARTICIPANTS: {totalWallets}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {leaderboardLoading ? (
                    <div className="text-center py-20 text-muted-foreground flex flex-col items-center gap-4">
                      <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                      <span className="animate-pulse font-mono tracking-widest text-xs uppercase">
                        Scanning Neural Network...
                      </span>
                    </div>
                  ) : (
                    leaderboard.map((item, index) => {
                      const isCurrentUser = item.wallet === walletAddress
                      const isTop3 = index < 3

                      return (
                        <motion.div
                          key={item.wallet}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group flex justify-between items-center px-6 py-4 border-b border-white/5 transition-all duration-300 ${
                            isCurrentUser ? "bg-primary/15 border-l-4 border-l-primary" : "hover:bg-white/[0.02]"
                          }`}
                        >
                          <div className="flex items-center gap-6">
                            <div className="relative flex items-center justify-center w-10">
                              {index === 0 && (
                                <Badge className="absolute -top-4 bg-yellow-500/20 text-yellow-500 border-yellow-500/50 text-[8px] px-1 py-0 uppercase">
                                  Gold
                                </Badge>
                              )}
                              {index === 1 && (
                                <Badge className="absolute -top-4 bg-slate-300/20 text-slate-300 border-slate-300/50 text-[8px] px-1 py-0 uppercase">
                                  Silver
                                </Badge>
                              )}
                              {index === 2 && (
                                <Badge className="absolute -top-4 bg-amber-600/20 text-amber-600 border-amber-600/50 text-[8px] px-1 py-0 uppercase">
                                  Bronze
                                </Badge>
                              )}
                              <span
                                className={`text-2xl font-black italic ${isTop3 ? "text-primary italic" : "text-muted-foreground/50"}`}
                              >
                                {item.rank}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-mono text-sm tracking-tight ${isCurrentUser ? "text-primary font-bold" : "text-foreground/80"}`}
                                >
                                  {item.wallet.slice(0, 10)}...{item.wallet.slice(-6)}
                                </span>
                                {isCurrentUser && (
                                  <Badge className="bg-primary text-[8px] h-4 px-1 leading-none uppercase tracking-tighter">
                                    YOU
                                  </Badge>
                                )}
                              </div>
                              <div className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                                Neural Link Sync 
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end">
                            <div
                              className={`text-xl font-black italic tracking-tighter ${isCurrentUser ? "text-primary" : "text-foreground"}`}
                            >
                              {item.intelScore.toFixed(1)}
                            </div>
                            <div className="text-[9px] uppercase font-mono text-muted-foreground/40">Intel Score</div>
                          </div>
                        </motion.div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card
              className={`relative overflow-hidden group border-2 transition-all duration-500 ${
                Number(userRank) <= 5
                  ? "border-secondary/50 bg-secondary/5 shadow-[0_0_30px_rgba(var(--secondary),0.1)]"
                  : "border-primary/10 bg-card/30"
              }`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="h-32 w-32 -mr-12 -mt-8 rotate-12" />
              </div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="italic text-lg tracking-tight flex items-center gap-2">
                    <Award className={`h-5 w-5 ${Number(userRank) <= 5 ? "text-secondary" : "text-primary"}`} />
                    STATUS REPORT
                  </CardTitle>
                  <Badge variant="outline" className="animate-pulse border-white/10 text-[10px] uppercase">
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative inline-block"
                  >
                    <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div
                      className={`text-8xl font-black italic tracking-tighter leading-none mb-4 relative ${
                        Number(userRank) <= 5 ? "text-secondary" : "text-primary"
                      }`}
                    >
                      #{userRank}
                    </div>
                  </motion.div>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="text-lg font-black uppercase italic tracking-tighter text-foreground/90">
                      RANKING POSITION
                    </div>
                    <div className="h-1 w-12 bg-primary/30 rounded-full mb-2" />
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">
                      Upper <span className="text-primary font-bold">{percentile}%</span> Threshold
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </Card>

            <Card className="bg-primary/5 border-primary/10 border-dashed">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                    Performance Insight
                  </div>
                  <div className="text-xs text-foreground/80 leading-snug">
                    {Number(userRank) <= 10
                      ? "Exceptional neural sync. Your accrual velocity is exceeding protocol defaults."
                      : "Stabilize pattern recognition to ascend tiers. Current velocity remains nominal."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

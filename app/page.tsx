"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, TrendingUp, Shield, Zap, Target, Award, Database } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const address =
    "8itjGoEPNpEXF4EubU2GZFRVj3o8vJJi7PTLaACZpump"

  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.2),transparent_50%)]"
        />

        <div className="container relative py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge variant="secondary" className="mb-6 border-primary/20 bg-primary/10 text-primary animate-pulse-soft">
              Non-Custodial • Data-Driven • Automated
            </Badge>

            <h1 className="mb-6 text-balance text-6xl font-black leading-[1.1] tracking-tighter md:text-8xl">
              Trading{" "}
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Behavior
              </span>{" "}
              Refined.
            </h1>

            <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Memora observes your on-chain trading discipline to unlock real-time stablecoin incentives. No custody, no
              staking.
            </p>
            <div className="flex justify-center w-full">

            <Badge className="mb-5 flex items-center gap-3 px-4 py-2 rounded-full">
              {/* Logo */}
              <img
                src="/logo.jpeg"
                alt="Token Logo"
                className="w-6 h-6 rounded-full object-cover"
              />

              {/* Address */}
              <span className="font-mono text-xs truncate max-w-[180px]">
                {address}
              </span>

              {/* Copy Button */}
              <Button
                size="icon"
                variant="ghost"
                onClick={copyToClipboard}
                className="h-6 w-6"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </Badge>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={'/dashboard'} className="h-14 px-8 gap-2 text-lg rounded-full shadow-2xl shadow-primary/30 bg-primary flex items-center justify-center gap-2">
                Enter App
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full border-border/50 bg-background/50 backdrop-blur-sm"
                asChild
              >
                <Link href="/whitepaper">Whitepaper</Link>
              </Button>
            </div>

            {/* <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border/40 pt-16"
            >
              <motion.div variants={item} className="space-y-1">
                <div className="text-4xl font-black tracking-tight text-primary">$2.4M+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Distributed</div>
              </motion.div>
              <motion.div variants={item} className="space-y-1">
                <div className="text-4xl font-black tracking-tight text-secondary">12.8K</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  Active Wallets
                </div>
              </motion.div>
              <motion.div variants={item} className="space-y-1">
                <div className="text-4xl font-black tracking-tight text-accent">98.2%</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  Protocol Uptime
                </div>
              </motion.div>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-1/4 left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-float" />
        <div
          className="absolute bottom-1/4 right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full animate-float"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      {/* How It Works */}
      <section className="container py-24" id="features">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline" className="mb-4 animate-pulse-soft">
            How Memora Works
          </Badge>
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
            Behavioral Intelligence, <span className="text-primary">On-Chain</span>
          </h2>
          <p className="text-pretty text-muted-foreground">
            Connect your wallet and let Memora observe your trading patterns. Demonstrate discipline, consistency, and
            rational behavior to unlock rewards.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid px-10 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
              >
                <Database className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="mb-2 font-semibold">Connect Wallet</h3>
              <p className="text-sm text-muted-foreground">
                Non-custodial, read-only access. We never touch your funds.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10"
              >
                <Brain className="h-6 w-6 text-secondary" />
              </motion.div>
              <h3 className="mb-2 font-semibold">Behavioral Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Our protocol observes discipline, consistency, and rationality over time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10"
              >
                <Target className="h-6 w-6 text-accent" />
              </motion.div>
              <h3 className="mb-2 font-semibold">Build Reputation</h3>
              <p className="text-sm text-muted-foreground">
                Consistent behavior builds a track record worth remembering.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10"
              >
                <Award className="h-6 w-6 text-chart-2" />
              </motion.div>
              <h3 className="mb-2 font-semibold">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Automatic stablecoin rewards distributed directly from market activity.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-border/40 bg-muted/30 px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container py-24"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-12 lg:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <Badge variant="outline" className="mb-4 animate-pulse-soft">
                What We Measure
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Discipline Over Profit</h2>
              <p className="mb-8 text-pretty text-muted-foreground">
                Memora doesn't judge your P&L, trade size, or capital. We evaluate the quality of your decision-making
                process and behavioral consistency.
              </p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex gap-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                  >
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="mb-1 font-semibold">Consistency</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular trading patterns and adherence to your own strategy.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex gap-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10"
                  >
                    <Brain className="h-5 w-5 text-secondary" />
                  </motion.div>
                  <div>
                    <h3 className="mb-1 font-semibold">Rationality</h3>
                    <p className="text-sm text-muted-foreground">
                      Evidence of thoughtful position sizing and risk management.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex gap-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10"
                  >
                    <Shield className="h-5 w-5 text-accent" />
                  </motion.div>
                  <div>
                    <h3 className="mb-1 font-semibold">Discipline</h3>
                    <p className="text-sm text-muted-foreground">
                      Avoiding emotional reactions and maintaining structured behavior.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center"
            >
              <Card className="w-full border-primary/20 bg-card/80 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-6"
                >
                  <h3 className="mb-2 text-2xl font-bold">Your Behavioral Score</h3>
                  <p className="text-sm text-muted-foreground">Real-time calculation based on on-chain activity</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-6 flex items-end gap-2"
                >
                  <div className="text-6xl font-bold text-primary">87</div>
                  <div className="mb-2 text-2xl text-muted-foreground">/100</div>
                </motion.div>

                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Consistency</span>
                      <span className="text-primary">92%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[92%] bg-primary" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Rationality</span>
                      <span className="text-secondary">85%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[85%] bg-secondary" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Discipline</span>
                      <span className="text-accent">84%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[84%] bg-accent" />
                    </div>
                  </motion.div>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Memora */}
      <section className="container py-24 px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline" className="mb-4 animate-pulse-soft">
            Why Choose Memora
          </Badge>
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
            Built for <span className="text-primary">Real Traders</span>
          </h2>
          <p className="text-pretty text-muted-foreground">
            No gimmicks, no custody, no friction. Just intelligent recognition and real rewards.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          <Card className="border-primary/20 bg-card/50">
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 h-8 w-8 flex items-center justify-center rounded-lg bg-primary"
              >
                <Shield className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold">100% Non-Custodial</h3>
              <p className="text-sm text-muted-foreground">
                We never hold your funds. Read-only protocol observes without touching your assets.
              </p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-card/50">
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 h-8 w-8 flex items-center justify-center rounded-lg bg-secondary"
              >
                <Zap className="h-8 w-8 text-secondary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold">Fully Automated</h3>
              <p className="text-sm text-muted-foreground">
                Rewards distributed automatically based on behavioral algorithms. Zero manual claims.
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-card/50">
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 h-8 w-8 flex items-center justify-center rounded-lg bg-accent"
              >
                <Database className="h-8 w-8 text-accent" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold">Plug & Play</h3>
              <p className="text-sm text-muted-foreground">
                Connect wallet, continue trading normally. No workflow changes, no friction.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="border-y border-border/40 bg-muted/30 px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              Start Building Your <span className="text-primary">Behavioral Reputation</span>
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Join thousands of traders earning stablecoin rewards for disciplined on-chain behavior.
            </p>


          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container py-12"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4 flex items-center gap-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex h-8 w-8 items-center justify-center rounded-lg "
              >
                <Image
                  src="/logo.jpeg"
                  alt="Memora Logo"
                  width={30}
                  height={30}
                  className="rounded-lg"
                  priority
                />
              </motion.div>
              <span className="text-xl font-bold">Memora</span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              On-chain behavioral intelligence and automated reward distribution.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4"
            >
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/#features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/whitepaper" className="hover:text-foreground">
                    Whitepaper
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4"
            >
              <h3 className="mb-4 font-semibold">Socials</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">


                <li>
                  <a href="https://x.com/MemoraLabs" className="hover:text-foreground">
                    X
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4"
            >
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground"
          >
            © 2025 Memora Protocol. All rights reserved.
          </motion.div>
        </motion.div>
      </footer>
    </div>
  )
}

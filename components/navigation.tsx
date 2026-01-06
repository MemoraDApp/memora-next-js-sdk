"use client"

import Link from "next/link"
import Image from "next/image"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Menu, LayoutDashboard, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

const COOKIE_KEY = "memora_wallet"

export function Navigation() {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [manualKey, setManualKey] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const connected = !!publicKey

  useEffect(() => {
    const savedWallet = Cookies.get(COOKIE_KEY)
    if (savedWallet) {
      setPublicKey(savedWallet)
    }
  }, [])

  const handleManualConnect = async () => {
    if (!manualKey || manualKey.length < 32) {
      toast.error("Please enter a valid Solana public key")
      return
    }

    setIsSubmitting(true)
    try {
      // 🔥 REGISTER KE MEMORA
      const response = await fetch("/api/memora/register-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: manualKey }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || "Failed to register wallet")
      }

      setPublicKey(manualKey)
      Cookies.set(COOKIE_KEY, manualKey, { expires: 7 })
      toast.success(`Connected: ${manualKey.slice(0, 4)}...${manualKey.slice(-4)}`)
      setIsModalOpen(false)

      // Reload to update state globally
      window.location.reload()
    } catch (err: any) {
      console.error("Register wallet error:", err)
      toast.error(err.message || "Failed to register wallet")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDisconnect = () => {
    setPublicKey(null)
    Cookies.remove(COOKIE_KEY)
    toast("Wallet disconnected")
    window.location.reload()
  }

  return (
    <header className="sticky px-10 top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between mx-auto">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpeg" alt="Memora Logo" width={30} height={30} className="rounded-lg" priority />
            <span className="text-xl font-bold">Memora</span>
          </Link>

          <nav className="hidden md:flex gap-1">
            <Link href="/dashboard" className="px-4 py-2 text-sm rounded-full hover:bg-accent/50">
              <LayoutDashboard className="inline h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <Link href="/whitepaper" className="px-4 py-2 text-sm rounded-full hover:bg-accent/50">
              <FileText className="inline h-4 w-4 mr-1" />
              Whitepaper
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/30 text-[10px] font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Solana Mainnet
          </div>

          <AnimatePresence mode="wait">
            {connected ? (
              <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisconnect}
                  className="rounded-full border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 bg-transparent"
                >
                  <div className="h-2 w-2 bg-emerald-500 rounded-full mr-2" />
                  {publicKey!.slice(0, 4)}...{publicKey!.slice(-4)}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button size="sm" onClick={() => setIsModalOpen(true)} className="rounded-full gap-2">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/whitepaper">Whitepaper</Link>
              </DropdownMenuItem>
              {connected && (
                <DropdownMenuItem onClick={handleDisconnect} className="text-destructive">
                  Disconnect Wallet
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Manual Connection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Solana Wallet</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Paste your Solana Wallet address below to connect to Memora.
            </p>
            <Input
              placeholder="e.g. 7xKX...jL2s"
              value={manualKey}
              onChange={(e) => setManualKey(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
          <DialogFooter>
            <Button className="w-full rounded-full" onClick={handleManualConnect} disabled={isSubmitting}>
              {isSubmitting ? "Connecting..." : "Connect Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}

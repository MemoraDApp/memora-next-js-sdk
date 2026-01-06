import { NextResponse } from "next/server"
import {
  Connection,
  Keypair,
  Transaction,
  PublicKey,
} from "@solana/web3.js"
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token"
import bs58 from "bs58"
import { ref, get, update } from "firebase/database"
import { db } from "@/lib/firebase"

export const runtime = "nodejs"

/* ================= CONFIG ================= */

const RPC_ENDPOINT =
  "https://mainnet.helius-rpc.com/?api-key=HELIUS_API_KEY"

const WALLET_SECRET =
  "DEV_WALLET_SECRET"

const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
)

const USDC_DECIMALS = 6

const connection = new Connection(RPC_ENDPOINT, "confirmed")

/* ================= TIME UTILS (WIB) ================= */

function nowWIB() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  )
}

function isClaimAllowed() {
  const now = nowWIB()
  return now.getDay() === 0 && now.getHours() >= 12 && now.getHours() <= 23
}

function getWeekKey() {
  const now = nowWIB()
  const year = now.getFullYear()

  const firstDay = new Date(year, 0, 1)
  const pastDays = Math.floor(
    (now.getTime() - firstDay.getTime()) / 86400000
  )

  const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7)
  return `${year}-W${week.toString().padStart(2, "0")}`
}

/* ================= API ================= */

export async function POST(req: Request) {
  try {
    const { walletAddress, rank, amount, action } = await req.json()

    if (!walletAddress || !amount || action !== "CLAIM_REWARD") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    if (!isClaimAllowed()) {
      return NextResponse.json(
        { error: "Claim hanya dibuka Minggu 12:00–24:00 WIB" },
        { status: 403 }
      )
    }

    const weekKey = getWeekKey()

    const claimRef = ref(
      db,
      `weekly_prizes/claimed/${weekKey}/${walletAddress}`
    )

    const snapshot = await get(claimRef)
    if (snapshot.exists()) {
      return NextResponse.json(
        { error: "Reward minggu ini sudah di-claim" },
        { status: 409 }
      )
    }

    /* ================= SEND USDC ================= */

    const sender = Keypair.fromSecretKey(bs58.decode(WALLET_SECRET))
    const receiver = new PublicKey(walletAddress)

    const senderATA = await getAssociatedTokenAddress(
      USDC_MINT,
      sender.publicKey
    )

    const receiverATA = await getAssociatedTokenAddress(
      USDC_MINT,
      receiver
    )

    const tx = new Transaction()

    // 🔥 Auto-create ATA receiver jika belum ada
    const receiverInfo = await connection.getAccountInfo(receiverATA)
    if (!receiverInfo) {
      tx.add(
        createAssociatedTokenAccountInstruction(
          sender.publicKey, // payer
          receiverATA,
          receiver,
          USDC_MINT
        )
      )
    }

    // 🔥 Transfer USDC
    tx.add(
      createTransferInstruction(
        senderATA,
        receiverATA,
        sender.publicKey,
        Math.floor(amount * 10 ** USDC_DECIMALS)
      )
    )

    const signature = await connection.sendTransaction(tx, [sender])
    await connection.confirmTransaction(signature, "confirmed")

    /* ================= SAVE TO FIREBASE ================= */

    await update(claimRef, {
      claimed: true,
      rank,
      amount,
      asset: "USDC",
      tx: signature,
      claimedAt: Date.now(),
    })

    return NextResponse.json({
      success: true,
      signature,
      week: weekKey,
      asset: "USDC",
      solscan: `https://solscan.io/tx/${signature}`,
    })
  } catch (err: any) {
    console.error("CLAIM ERROR:", err)
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    )
  }
}

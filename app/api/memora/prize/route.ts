import { NextResponse } from "next/server"
import { Connection, PublicKey } from "@solana/web3.js"
import { ref, set } from "firebase/database"
import { db } from "@/lib/firebase"

export const runtime = "nodejs"

const HELIUS_RPC =
  "https://mainnet.helius-rpc.com/?api-key=HELIUS_API_KEY"

const POOL_WALLET = new PublicKey(
  "POOL_WALLET"
)

// ✅ USDC Mint (Solana Mainnet)
const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
)

/* ================= TIME CHECK WIB ================= */
function canSavePrize(): boolean {
  const now = new Date()
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000)

  const day = wib.getUTCDay() // 0 = Minggu
  const hour = wib.getUTCHours()

  // 🚫 Minggu jam 12 siang – 12 malam
  if (day === 0 && hour >= 12) {
    return false
  }

  return true
}

/* ================= API ================= */
export async function GET() {
  try {
    const connection = new Connection(HELIUS_RPC, "confirmed")

    // 🔥 Ambil token account USDC milik wallet pool
    const tokenAccounts =
      await connection.getParsedTokenAccountsByOwner(
        POOL_WALLET,
        { mint: USDC_MINT }
      )

    let totalUSDC = 0

    if (tokenAccounts.value.length > 0) {
      const info =
        tokenAccounts.value[0].account.data.parsed.info
      totalUSDC = Number(info.tokenAmount.uiAmount)
    }

    // ❗️LOGIC TETAP SAMA (anggap SOL = USDC)
    const devCut = totalUSDC * 0.2
    const distributableSOL = totalUSDC - devCut

    const distribution = {
      rank1: +(distributableSOL * 0.4).toFixed(6),
      rank2: +(distributableSOL * 0.25).toFixed(6),
      rank3: +(distributableSOL * 0.15).toFixed(6),
      rank4: +(distributableSOL * 0.1).toFixed(6),
      rank5: +(distributableSOL * 0.1).toFixed(6),
    }

    const payload = {
      wallet: POOL_WALLET.toBase58(),
      totalPoolSOL: +totalUSDC.toFixed(6), // 🔥 ISI USDC
      devCut: +devCut.toFixed(6),
      distributableSOL: +distributableSOL.toFixed(6),
      distribution,
      timestamp: Date.now(),
    }

    let saved = false

    if (canSavePrize()) {
      await set(ref(db, "weekly_prizes/current"), payload)
      saved = true
    }

    return NextResponse.json({
      ...payload,
      savedToFirebase: saved,
      asset: "USDC",
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}

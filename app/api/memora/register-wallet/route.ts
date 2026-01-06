import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { ref, get, set } from "firebase/database"

export async function POST(req: Request) {
  try {
    const { wallet } = await req.json()

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet required" },
        { status: 400 }
      )
    }

    const walletRef = ref(db, `wallets/${wallet}`)
    const snapshot = await get(walletRef)

    // 🚫 Kalau sudah ada → skip
    if (snapshot.exists()) {
      return NextResponse.json({
        status: "exists",
        wallet
      })
    }

    // ✅ Wallet baru → simpan
    await set(walletRef, {
      wallet,
      createdAt: Date.now(),
      intelScore: 0,
      rationalityIndex: 0,
      disciplineTier: "Uninitialized",
      accrualVelocity: 1.0,
      biasRate: 0,
      tier: "Observer",
      rank: null
    })

    return NextResponse.json({
      status: "registered",
      wallet
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to register wallet" },
      { status: 500 }
    )
  }
}

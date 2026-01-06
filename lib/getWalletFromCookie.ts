// lib/getWalletFromCookie.ts
export function getWalletFromCookie(): string | null {
  if (typeof document === "undefined") return null

  const match = document.cookie
    .split("; ")
    .find(row => row.startsWith("memora_wallet="))

  return match ? decodeURIComponent(match.split("=")[1]) : null
}

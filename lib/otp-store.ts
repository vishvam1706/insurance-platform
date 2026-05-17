/* eslint-disable no-var */
declare global {
  var __otpStore: Map<string, { code: string; expires: number }> | undefined
}

const store: Map<string, { code: string; expires: number }> =
  globalThis.__otpStore ?? new Map()
if (!globalThis.__otpStore) globalThis.__otpStore = store

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function setOtp(key: string, code: string, ttlMs = 5 * 60 * 1000) {
  store.set(key, { code, expires: Date.now() + ttlMs })
}

export function verifyAndConsumeOtp(key: string, code: string): boolean {
  const entry = store.get(key)
  if (!entry) return false
  if (Date.now() > entry.expires) { store.delete(key); return false }
  if (entry.code !== code) return false
  store.delete(key)
  return true
}

export function hasActiveOtp(key: string): boolean {
  const entry = store.get(key)
  if (!entry) return false
  if (Date.now() > entry.expires) { store.delete(key); return false }
  return true
}

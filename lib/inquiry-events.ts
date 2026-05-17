/* eslint-disable no-var */
import { EventEmitter } from "events"

declare global {
  var __inquiryEmitter: EventEmitter | undefined
}

export const inquiryEmitter: EventEmitter =
  globalThis.__inquiryEmitter ?? new EventEmitter()

if (!globalThis.__inquiryEmitter) {
  globalThis.__inquiryEmitter = inquiryEmitter
  inquiryEmitter.setMaxListeners(200)
}

export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { inquiryEmitter } from "@/lib/inquiry-events"

export async function GET(req: NextRequest) {
  const user = await getAuthUser()
  if (!user) return new Response("Unauthorized", { status: 401 })

  const encoder = new TextEncoder()
  let cleanup: (() => void) | undefined

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        } catch {
          cleanup?.()
        }
      }

      // Initial connection acknowledgement
      send({ type: "connected" })

      // Heartbeat every 25 s to keep the connection alive
      const heartbeat = setInterval(() => send({ type: "ping" }), 25_000)

      const onNew = (inquiry: unknown) => send({ type: "new_inquiry", inquiry })
      inquiryEmitter.on("new_inquiry", onNew)

      cleanup = () => {
        clearInterval(heartbeat)
        inquiryEmitter.off("new_inquiry", onNew)
        try { controller.close() } catch { /* already closed */ }
      }

      req.signal.addEventListener("abort", () => cleanup?.())
    },
    cancel() { cleanup?.() },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  })
}

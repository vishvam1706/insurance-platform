import { connectDB } from "./mongodb"
import RateLimit from "./models/RateLimit"

interface RateLimitConfig {
    limit: number
    windowMs: number
}

/**
 * Checks if a key (e.g. IP or IP+Action) has exceeded its rate limit.
 * Automatically handles reset windows. Fully persistent across server instances.
 * Returns true if the client is rate limited, false otherwise.
 */
export async function isRateLimited(key: string, config: RateLimitConfig): Promise<boolean> {
    try {
        await connectDB()
        const now = Date.now()
        const entry = await RateLimit.findOne({ key })

        if (!entry) {
            await RateLimit.create({
                key,
                count: 1,
                resetAt: new Date(now + config.windowMs),
            })
            return false
        }

        if (now > entry.resetAt.getTime()) {
            entry.count = 1
            entry.resetAt = new Date(now + config.windowMs)
            await entry.save()
            return false
        }

        if (entry.count >= config.limit) {
            return true
        }

        entry.count += 1
        await entry.save()
        return false
    } catch (err) {
        console.error("Rate limiting error:", err)
        // Fail-open in case of database issues so we don't block legitimate users,
        // but log the failure clearly.
        return false
    }
}

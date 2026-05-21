/**
 * Production Readiness Security Test Script
 * Run this script against a running server to verify rate-limiting and OTP bypass prevention.
 * 
 * Usage:
 *   node scratch/test-production-security.js [server_url]
 *   Example: node scratch/test-production-security.js http://localhost:3000
 */

const serverUrl = process.argv[2] || "http://localhost:3000"

async function runTests() {
    console.log(`\n🧪 Starting Production Readiness Security Verification against ${serverUrl}...\n`)

    // ── TEST 1: Prevent Direct Inquiry Creation (OTP Bypass Check) ──────────────────
    console.log("----------------------------------------------------------------------")
    console.log("Test 1: Attempt to create an inquiry directly without verified OTP...")
    console.log("----------------------------------------------------------------------")
    try {
        const dummyInquiry = {
            name: "Malicious Attacker",
            phone: "9876543210",
            email: "attacker@exploit.com",
            insuranceType: "term",
            state: "Karnataka",
            language: "English",
            message: "This should be blocked by backend because OTP is not verified."
        }

        const res = await fetch(`${serverUrl}/api/inquiries`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dummyInquiry)
        })

        const data = await res.json()
        if (res.status === 400 && data.error.includes("verification required")) {
            console.log(`✅ Success: Inquiry rejected with 400 Bad Request.`)
            console.log(`   Message received: "${data.error}"`)
        } else {
            console.log(`❌ Failure: Server returned status ${res.status}. Expected 400.`)
            console.log(`   Response:`, data)
        }
    } catch (err) {
        console.error("❌ Test 1 Error:", err.message)
    }

    // ── TEST 2: Trigger Rate Limiting on Email OTP Sending ───────────────────────────
    console.log("\n----------------------------------------------------------------------")
    console.log("Test 2: Rapidly request email OTP to trigger 429 Rate Limiter...")
    console.log("----------------------------------------------------------------------")
    
    const targetEmail = `rate_test_${Math.floor(Math.random() * 100000)}@test.com`
    console.log(`Targeting test email: ${targetEmail}`)
    
    let rateLimited = false
    for (let i = 1; i <= 7; i++) {
        try {
            console.log(`Request #${i} sending...`)
            const res = await fetch(`${serverUrl}/api/inquiries/verify?type=email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: targetEmail })
            })

            const data = await res.json()
            if (res.status === 429) {
                console.log(`✅ Success: Rate limiter triggered on request #${i} with 429 Too Many Requests.`)
                console.log(`   Message: "${data.error}"`)
                rateLimited = true
                break
            } else if (res.status === 200) {
                console.log(`   Request #${i} succeeded (OTP Sent).`)
            } else {
                console.log(`   Request #${i} returned status ${res.status}:`, data.error || data)
            }
        } catch (err) {
            console.error(`❌ Request #${i} Error:`, err.message)
            break
        }
        // Small delay to prevent network connection collision but quick enough to trigger window
        await new Promise(r => setTimeout(r, 100))
    }

    if (!rateLimited) {
        console.log(`❌ Failure: Sent all 7 requests without triggering 429. Is the server rate limiter active?`)
    }
    
    console.log("\n🏁 Security Verification Completed.\n")
}

runTests()

import { connectDB } from "../lib/mongodb"
import PageContent from "../lib/models/PageContent"

async function run() {
    console.log("Connecting to database...")
    await connectDB()
    
    console.log("Finding homepage database document...")
    const home = await PageContent.findOne({ pageKey: "home" })
    if (!home) {
        console.error("No homepage found in DB.")
        process.exit(1)
    }

    // Check if block already exists
    const hasBlock = home.blocks.some((b: any) => b.type === "home_video_section")
    if (hasBlock) {
        console.log("Homepage already contains home_video_section block.")
        process.exit(0)
    }

    console.log("Current blocks:", home.blocks.map((b: any) => b.type))
    
    // Find index of home_trust
    const trustIdx = home.blocks.findIndex((b: any) => b.type === "home_trust")
    const newBlocks = [...home.blocks]
    
    const videoBlock = {
        id: "h_video",
        type: "home_video_section",
        data: {}
    }

    if (trustIdx >= 0) {
        newBlocks.splice(trustIdx + 1, 0, videoBlock)
        console.log(`Inserting home_video_section right after home_trust (index ${trustIdx})`)
    } else {
        newBlocks.push(videoBlock)
        console.log("Inserting home_video_section at the end (home_trust not found)")
    }

    home.blocks = newBlocks
    await home.save()
    console.log("Homepage document updated successfully!")
    process.exit(0)
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})

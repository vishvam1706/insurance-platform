require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Mini schema to prevent importing TS models
const PageContentSchema = new mongoose.Schema({
    pageKey: String,
    blocks: Array,
    published: Boolean
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema, 'pagecontents');

async function run() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("MONGODB_URI is not set in .env.local");
        process.exit(1);
    }
    
    console.log("Connecting to database...");
    await mongoose.connect(mongoUri);
    
    console.log("Finding homepage database document...");
    const home = await PageContent.findOne({ pageKey: "home" });
    if (!home) {
        console.error("No homepage found in DB.");
        process.exit(1);
    }

    const hasBlock = home.blocks.some(b => b.type === "home_video_section");
    if (hasBlock) {
        console.log("Homepage already contains home_video_section block.");
        process.exit(0);
    }

    console.log("Current blocks:", home.blocks.map(b => b.type));
    
    const trustIdx = home.blocks.findIndex(b => b.type === "home_trust");
    const newBlocks = [...home.blocks];
    
    const videoBlock = {
        id: "h_video_" + Math.random().toString(36).substr(2, 9),
        type: "home_video_section",
        data: {}
    };

    if (trustIdx >= 0) {
        newBlocks.splice(trustIdx + 1, 0, videoBlock);
        console.log(`Inserting home_video_section right after home_trust (index ${trustIdx})`);
    } else {
        newBlocks.push(videoBlock);
        console.log("Inserting home_video_section at the end (home_trust not found)");
    }

    home.blocks = newBlocks;
    await PageContent.updateOne({ _id: home._id }, { $set: { blocks: newBlocks } });
    console.log("Homepage database document updated successfully!");
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});

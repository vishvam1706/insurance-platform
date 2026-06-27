import { connectDB } from "./lib/mongodb";
import HeroContent from "./lib/models/HeroContent";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
    await connectDB();
    const hero = await HeroContent.findOne({ key: "home_hero" }).lean();
    console.log("HeroContent in Database:", JSON.stringify(hero, null, 2));
    process.exit(0);
}

run().catch(console.error);

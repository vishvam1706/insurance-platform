import { connectDB } from "./lib/mongodb";
import PageContent from "./lib/models/PageContent";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
    await connectDB();
    const pages = await PageContent.find({}, { pageKey: 1, title: 1, published: 1 }).lean();
    console.log("Pages in Database:", JSON.stringify(pages, null, 2));
    process.exit(0);
}

run().catch(console.error);

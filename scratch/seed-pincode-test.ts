import { connectDB } from "../lib/mongodb";
import User from "../lib/models/User";
import Inquiry from "../lib/models/Inquiry";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
    console.log("Connecting to Database...");
    await connectDB();

    // 1. Clear existing inquiries
    console.log("Clearing all inquiries...");
    await Inquiry.deleteMany({});

    // 2. Clear existing test dummy employees
    console.log("Cleaning up old test users...");
    await User.deleteMany({ email: { $in: [
        "amit@platform.com",
        "priya@platform.com",
        "rajesh@platform.com",
        "suresh@platform.com"
    ] } });

    // 3. Create dummy employees with passwords
    const passwordHash = await bcrypt.hash("Password123", 12);

    console.log("Seeding test employees...");
    
    // Amit Kumar: Delhi & Haryana
    await User.create({
        name: "Amit Kumar",
        email: "amit@platform.com",
        passwordHash,
        role: "employee",
        states: ["Delhi", "Haryana"],
        languages: ["Hindi", "English"],
        pincodes: ["110001", "110002"],
        status: "active"
    });

    // Priya Patel: Gujarat & Maharashtra
    await User.create({
        name: "Priya Patel",
        email: "priya@platform.com",
        passwordHash,
        role: "employee",
        states: ["Gujarat", "Maharashtra"],
        languages: ["Gujarati", "Marathi", "English"],
        pincodes: ["380001", "400001"],
        status: "active"
    });

    // Rajesh Iyer: Tamil Nadu & Karnataka
    await User.create({
        name: "Rajesh Iyer",
        email: "rajesh@platform.com",
        passwordHash,
        role: "employee",
        states: ["Tamil Nadu", "Karnataka"],
        languages: ["Tamil", "Kannada", "English"],
        pincodes: ["600001", "560001"],
        status: "active"
    });

    // Suresh Iyer: Karnataka (Overlapping pincode 560001)
    await User.create({
        name: "Suresh Iyer",
        email: "suresh@platform.com",
        passwordHash,
        role: "employee",
        states: ["Karnataka"],
        languages: ["Kannada", "English"],
        pincodes: ["560001"],
        status: "active"
    });

    console.log("Seeding complete! Database ready for testing.");
    process.exit(0);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});

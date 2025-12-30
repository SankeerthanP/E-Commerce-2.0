
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_ecommerce";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB");
        try {
            const users = await User.find({}, "-passwordHash");
            console.log(`Found ${users.length} users:`);
            users.forEach(u => console.log(`- ${u.name} (${u.email}) [${u.role}]`));
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => {
        console.error("Connection error:", err);
    });

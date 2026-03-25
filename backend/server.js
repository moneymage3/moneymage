const Feedback = require("./models/Feedback");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ CONNECT TO MONGODB (FIXED STRING)
mongoose.connect("mongodb://MoneyMage:Football3115@ac-px4kpxk-shard-00-00.nk2gxuq.mongodb.net:27017,ac-px4kpxk-shard-00-01.nk2gxuq.mongodb.net:27017,ac-px4kpxk-shard-00-02.nk2gxuq.mongodb.net:27017/moneymage?ssl=true&replicaSet=atlas-gqrffk-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));
// Test route
app.get("/", (req, res) => {
   res.send("Money Mage Backend is Running 🚀");
});
app.post("/feedback", async (req, res) => {
    console.log("Data received:", req.body); // 🔥 ADD THIS

    try {
        const { name, email, topic, message } = req.body;

        const newFeedback = new Feedback({
            name,
            email,
            topic,
            message
        });

        await newFeedback.save();

        res.status(200).json({ message: "Feedback saved ✅" });
    } catch (error) {
        console.log(error); // 🔥 ALSO ADD
        res.status(500).json({ error: error.message });
    }
});;

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

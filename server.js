const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { healthCheck } = require("./middleware/healthMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: "https://personal-book-manager-frontend-pczidx9hn.vercel.app",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running...");
});

// healthCheck
app.use("/health", healthCheck);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const mongoose = require("mongoose");

const healthCheck = async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;

        const dbStatus =
            dbState === 1
                ? "connected"
                : dbState === 2
                    ? "connecting"
                    : dbState === 0
                        ? "disconnected"
                        : "disconnecting";

        res.status(200).json({
            status: "OK",
            server: "running",
            database: dbStatus,
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            message: "Health check failed",
            error: error.message,
        });
    }
};

module.exports = { healthCheck };
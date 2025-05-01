const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // No trailing slash
    methods: ["GET", "POST"],       // Allow necessary methods
    credentials: true,               // Allow credentials (cookies, sessions)
  })
);

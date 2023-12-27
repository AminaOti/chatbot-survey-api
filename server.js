const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const routes = require("./routes/routes.js");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT | 3000;
const SESSION_KEY = process.env.SESSION_KEY;
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  session({
    secret: SESSION_KEY, // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
  })
);

let counter = 0;

app.use(express.json());
app.use("/api/chatbot/", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Congratulations, you have hit the endpoint for the chatbotApi",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`${process.env.PORT}`);
});

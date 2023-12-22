const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT | 3000;

app.get("/api/users", async (req, res) => {
  const chatId = req.query.chatid;

  res.send(`Thank you for you questions for chatId \n ${chatId}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`${process.env.PORT}`);
});

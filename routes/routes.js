const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: "true", data: { id: 1 } });
});

router.post("/sendMessage", (req, res) => {
  const message = req.body.message;
  const chatId = req.body.chatId;

  console.log(`${req.body.message}`);
  return res.status(200).send(`${message} ${chatId}`);
});

module.exports = router;

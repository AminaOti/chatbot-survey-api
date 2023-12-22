const express = require("express");
const router = express.Router();
const {
  sendMessageToLmmController,
} = require("../controllers/sendMessageToLmmController");

router.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "congratulations, you have hit the endpoint for the chatbotApi",
  });
});

router.route("/sendMessage").post(sendMessageToLmmController);

module.exports = router;

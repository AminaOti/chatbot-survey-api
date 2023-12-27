const express = require("express");
const router = express.Router();
const {
  sendMessageToLmmController,
} = require("../controllers/sendMessageToLmmController");

router.route("/sendMessage").post(sendMessageToLmmController);

module.exports = router;

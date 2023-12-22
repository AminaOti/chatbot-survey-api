const express = require("express");
const router = express.Router();
const {
  sendMessageToLmmController,
} = require("../controllers/sendMessageToLmmController");
//const sendMessageToLlm = require("../services/sendMessageToLlmServices");

const BEARER_TOKEN = process.env.LLM_BEARER_TOKEN;
const MODEL_ID = process.env.LLM_MODEL_ID;
const URL = process.env.LLM_URL; //"https://bam-api.res.ibm.com/v2/text/chat";

router.get("/", (req, res) => {
  res
    .status(200)
    .json({
      success: "true",
      message: "congratulations, you have hit the endpoint for the chatbotApi",
    });
});

router.route("/sendMessage").post(sendMessageToLmmController);

module.exports = router;

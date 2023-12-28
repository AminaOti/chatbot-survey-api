const sendMessageToLlm = require("../services/sendMessageToLlmServices");

const BEARER_TOKEN = process.env.LLM_BEARER_TOKEN;
const MODEL_ID = process.env.LLM_MODEL_ID;
const URL = process.env.LLM_URL;

exports.sendMessageToLmmController = async (req, res) => {
  const message = req.body.message;
  const isLastMessage = req.body.isLastMessage;

  console.log(`is last message: ${isLastMessage}`);
  const response = await sendMessageToLlm(
    req,
    MODEL_ID,
    BEARER_TOKEN,
    URL,
    message,
    isLastMessage
  );

  res.status(200).send(response);
};

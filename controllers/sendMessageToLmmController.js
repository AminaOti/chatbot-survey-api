const sendMessageToLlm = require("../services/sendMessageToLlmServices");

const BEARER_TOKEN = process.env.LLM_BEARER_TOKEN;
const MODEL_ID = process.env.LLM_MODEL_ID;
const URL = process.env.LLM_URL;

exports.sendMessageToLmmController = async (req, res) => {
  const message = req.body.message;
  const chatId = req.body.chatId;

  const response = await sendMessageToLlm(MODEL_ID, BEARER_TOKEN, URL, message);

  console.log(`${response}`);
  res.status(200).send(response);
};

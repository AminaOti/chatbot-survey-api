const dotenv = require("dotenv");
const axios = require("axios");
const {
  generateObjectForParams,
  generateObjectForFirstQuestion,
} = require("./services/sendMessageToLmm.js");

dotenv.config({ path: "./config/config.env" });
const BEARER_TOKEN = process.env.LLM_BEARER_TOKEN;
const MODEL_ID = process.env.LLM_MODEL_ID;
const URL = process.env.LLM_URL; //"https://bam-api.res.ibm.com/v2/text/chat";
const FIRST_MESSAGE_ID = 1;

const sendDataToLmm = async (modelId, bearatoken, url, message, messageId) => {
  const data = generateObjectForFirstQuestion(modelId, message);
  const params = generateObjectForParams(bearatoken);

  const response = await axios.post(url, data, params);

  console.log(`parentId: ${response.data.id}`);
  console.log(`conversationId: ${response.data.conversation_id}`);
  console.log(`generated test: ${response.data.results[0].generated_text}`);
};

const message = "hi what colour is the sky?";
sendDataToLmm(MODEL_ID, BEARER_TOKEN, URL, message);

const dotenv = require("dotenv");
const axios = require("axios");
const {
  generateObjectForParams,
  generateObjectForFirstQuestion,
  generateObjectAfterFirstQuestion,
} = require("../utils/generateObjects");

dotenv.config({ path: "./config/config.env" });
let conversationId = "";
let parentId = "";

const sendMessageToLlm = async (modelId, bearatoken, url, message) => {
  const data =
    conversationId.length === 0
      ? generateObjectForFirstQuestion(modelId, message)
      : generateObjectAfterFirstQuestion(
          modelId,
          message,
          conversationId,
          parentId
        );

  const params = generateObjectForParams(bearatoken);

  const response = await axios.post(url, data, params);
  conversationId = response.data.conversation_id;
  parentId = response.data.id;

  return {
    parentId: response.data.id,
    converstationId: response.data.conversation_id,
    response: response.data.results[0].generated_text,
  };
};

module.exports = sendMessageToLlm;

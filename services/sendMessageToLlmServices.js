const dotenv = require("dotenv");
const axios = require("axios");
const {
  generateObjectForParams,
  generateObjectForFirstQuestion,
  generateObjectAfterFirstQuestion,
} = require("../utils/generateObjects");

dotenv.config({ path: "./config/config.env" });

const setCoversationAndParentId = (req, conversationId, parentId) => {
  req.session.conversationId = conversationId;
  req.session.parentId = parentId;
};

const resetCoversationAndParentId = (req) => {
  req.session.conversationId = "";
  req.session.parentId = "";
};

const sendMessageToLlm = async (
  req,
  modelId,
  bearatoken,
  url,
  message,
  isLastMessage
) => {
  let conversationId = req.session.conversationId || "";
  let parentId = req.session.parentId || "";

  const data =
    conversationId === ""
      ? generateObjectForFirstQuestion(modelId, message)
      : generateObjectAfterFirstQuestion(
          modelId,
          message,
          conversationId,
          parentId
        );

  const params = generateObjectForParams(bearatoken);

  const response = await axios.post(url, data, params);

  if (conversationId === "" || parentId === "") {
    setCoversationAndParentId(
      req,
      response.data.conversation_id,
      response.data.id
    );
  }

  if (isLastMessage === true) {
    resetCoversationAndParentId(req);
  }

  return {
    parentId: response.data.id,
    converstationId: response.data.conversation_id,
    response: response.data.results[0].generated_text,
    cookies: req.cookies,
  };
};

module.exports = sendMessageToLlm;

const generateObjectForFirstQuestion = (modelId, message) => {
  return {
    model_id: modelId,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don'''t know the answer to a question, please don'''t share false information.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    parameters: {
      decoding_method: "greedy",
      min_new_tokens: 1,
      max_new_tokens: 200,
    },
    moderations: {
      hap: {
        threshold: 0.75,
        input: true,
        output: true,
      },
      stigma: {
        threshold: 0.75,
        input: true,
        output: true,
      },
    },
  };
};

const generateObjectForParams = (bearatoken) => {
  return {
    params: {
      version: "2023-12-22",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearatoken}`,
    },
  };
};

module.exports = {
  generateObjectForParams,
  generateObjectForFirstQuestion,
};

import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT | 3000;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const url = "https://bam-api.res.ibm.com/v2/text/chat";

const firstQuesrtionData = {
  model_id: "meta-llama/llama-2-70b-chat",
  conversation_id: "6042bc67-d451-4ef3-8cbd-01eb1d207b9d",
  parent_id: "88441b16-07c8-41fd-8dce-2e8451be13c9",
  messages: [
    {
      role: "user",
      content: "Could you explain more about the fourth one?",
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

const firstQuesrtionParams = {
  params: {
    version: "2023-12-22",
  },
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

app.get("/", (req, res) => {
  res.send("Welcome to my server! yo");
});

app.get("/api/users", async (req, res) => {
  const chatId = req.query.chatid;

  const response = await axios.post(
    url,
    firstQuesrtionData,
    firstQuesrtionParams
  );

  console.log(response);

  res.send(
    `Thank you for you questions for chatId \n ${response.data.results[0].generated_text}`
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`${process.env.PORT}`);
});

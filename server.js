const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/routes.js");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT | 3000;

const app = express();
app.use(express.json());
app.use("/api/chatbot/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`${process.env.PORT}`);
});

const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const routes = require("./routes/routes.js");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT | 3000;
const SESSION_KEY = process.env.SESSION_KEY;
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(
  session({
    secret: SESSION_KEY, // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
  })
);

app.use(express.json());
app.use("/api/chatbot/", routes);

app.get("/", (req, res) => {
  console.log(req.headers.cookie);
  res.status(200).json({
    success: "true",
    message: "Congratulations, you have hit the endpoint for the chatbotApi",
  });
});

app.post("/setSessionName", async (req, res) => {
  try {
    console.log(req.body.name);
    req.session.name = req.body.name;
    res.send({ message: "saved" }).status(201);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

// app.get("/set-cookie", (req, res) => {
//   console.log(`1 ${req.headers.cookie}`);
//   res.cookie("myCookie", "cookieValue", { maxAge: 900000, httpOnly: true });
//   console.log(`cookies ${JSON.stringify(req.cookies)}`);
//   console.log(`2 ${req.headers.cookie}`);
//   res.send("Cookie has been set");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`${process.env.PORT}`);
});

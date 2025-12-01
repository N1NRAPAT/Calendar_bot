import express from "express";
import { Client } from "@line/bot-sdk";

const app = express();
app.use(express.json());

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

app.post("/line/webhook", (req, res) => {
  const events = req.body.events;

  events.forEach((event) => {
    if (event.type === "message") {
      const text = event.message.text;

      client.replyMessage(event.replyToken, {
        type: "text",
        text: "You said: " + text,
      });
    }
  });

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

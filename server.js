import express from "express";
import { Client, middleware } from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const app = express();
app.use(express.json());
app.use(middleware(config));

const client = new Client(config);

app.post("/line/webhook", async (req, res) => {
  try {
    const events = req.body.events;

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: `You said: ${event.message.text}`,
        });
      }
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server running on port " + (process.env.PORT || 3000));
});

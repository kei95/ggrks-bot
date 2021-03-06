"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const config = require("../config/config");
const textHandler = require("./util/textHandler");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => res.send("Hello hello BOT!(GET)"));

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);

async function handleEvent(event) {
  try {
    if (event.type !== "message" || event.message.type !== "text") {
      return Promise.resolve(null);
    }

    // Text will be changed if it's room
    let targetText = textHandler(event.message?.text);

    if (!targetText) return Promise.resolve(null);

    var encodedString = encodeURIComponent(targetText);

    return client.replyMessage(event.replyToken, {
      type: "flex",
      altText: `タップして”${targetText}”をググる`,
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: `”${targetText}”`,
              contents: [
                {
                  type: "span",
                  text: "タップして",
                },
                {
                  type: "span",
                  text: `”${targetText}”`,
                  color: "#0000ff",
                  weight: "bold",
                },
                {
                  type: "span",
                  text: "をググる",
                },
              ],
              wrap: true,
              align: "center",
            },
          ],
          action: {
            type: "uri",
            label: "View detail",
            uri: `https://www.google.com/search?q=${encodedString}`,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

process.env.NOW_REGION ? (module.exports = app) : app.listen(PORT);
console.log(`Server running at ${PORT}`);

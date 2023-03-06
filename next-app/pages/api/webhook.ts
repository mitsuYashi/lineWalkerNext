import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { WebhookRequestBody } from "@line/bot-sdk";
import { Middleware } from "@line/bot-sdk/lib/middleware";
import * as line from "../../lib/line";
import { MessageEvent } from "@line/bot-sdk/lib/types";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Middleware
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });
};

// derived:com.google.step_count.delta:com.google.android.gms:estimated_steps
// derived:com.google.step_count.delta:com.google.android.gms:estimated_steps

const handleEventDefaultMessage = async (events: MessageEvent) => {
  const name = await line.client.getProfile(events.source?.userId ?? "");

  const userId = await line.client.getProfile(events.source?.userId ?? "");
  await line.client.replyMessage(events.replyToken, {
    type: "text",
    text: `対応外のメッセージです${events.message.type}`,
  });
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "POST") {
      await runMiddleware(req, res, line.middleware);

      const body: WebhookRequestBody = req.body;
      await Promise.all(
        body.events.map((event) =>
          (async () => {
            if (event.mode === "active") {
              switch (event.type) {
                case "message":
                  const name = await line.client.getProfile(
                    event.source?.userId ?? ""
                  );

                  const userId = await line.client.getProfile(
                    event.source?.userId ?? ""
                  );

                  if (
                    event.message.type == "text" &&
                    event.message.text == "歩数取得"
                  ) {
                    let steps = "";
                    await axios
                      .get(
                        `https://linewalker.onrender.com/user/steps?code=1//0gLxEY42zih92CgYIARAAGBASNwF-L9Ir_sdMXWVUfcfAx9fwXUK20xs3oOt9yck5Pr06ZmyKsJ79kRqcWsNuqwhM8rbYlgWIGME`
                      )
                      .then((data) => {
                        steps = data.data.steps[6];
                      });
                    await line.client.replyMessage(event.replyToken, {
                      type: "text",
                      text: steps,
                    });
                  } else {
                    await line.client.replyMessage(event.replyToken, {
                      type: "text",
                      text: `対応外のメッセージです`,
                    });
                  }
                  break;

                case "follow":
                  break;
              }
            }
          })()
        )
      );
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ name: e.name, message: e.message });
    } else {
      res.status(500).end();
    }
  }
};

export default handler;

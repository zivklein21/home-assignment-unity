import { Request, Response } from "express";
import { fetchUserPurchases } from "../services/web.service";

type Producer = {
  publish: (input: { topic: string; key: string; value: any }) => Promise<void>;
};

export class WebController {
  static health(_req: Request, res: Response) {
    return res.json({ ok: true });
  }

  static create(opts: { producer: Producer; topic: string; customerApiBaseUrl: string }) {
    const { producer, topic, customerApiBaseUrl } = opts;

    return {
      buy: async (req: Request, res: Response) => {
        const { username, userid, price, timestamp } = req.body ?? {};

        if (!username || !userid || typeof price !== "number") {
          return res.status(400).json({
            error: "Invalid body. Expected { username, userid, price, timestamp? }",
          });
        }

        const event = {
          username: String(username),
          userid: String(userid),
          price: Number(price),
          timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
        };

        await producer.publish({ topic, key: event.userid, value: event });

        return res.status(202).json({
          message: "Buy event published to Kafka",
          event,
        });
      },

      getAllUserBuys: async (req: Request, res: Response) => {
        const userid = String(req.query.userid || "").trim();
        if (!userid) return res.status(400).json({ error: "userid is required" });

        const r = await fetchUserPurchases(customerApiBaseUrl, userid);
        return res.status(r.status).type(r.contentType).send(r.bodyText);
      },
    };
  }
}
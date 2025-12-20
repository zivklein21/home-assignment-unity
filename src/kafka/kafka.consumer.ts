import { Kafka } from "kafkajs";
import { Purchase } from "../models/purchase.model";


export async function startConsumer(params: {
  brokers: string[];
  topic: string;
  groupId: string;
}) {
  const kafka = new Kafka({ clientId: "customer-api", brokers: params.brokers });
  const consumer = kafka.consumer({ groupId: params.groupId });

  await consumer.connect();
  await consumer.subscribe({ topic: params.topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const raw = message.value?.toString("utf-8");
        if (!raw) return;

        const event = JSON.parse(raw) as {
          username: string;
          userid: string;
          price: number;
          timestamp: string; 
        };

        if (!event.userid || !event.username || typeof event.price !== "number" || !event.timestamp) {
          console.warn("Invalid event, skipping:", event);
          return;
        }

        await Purchase.create({
          userid: event.userid,
          username: event.username,
          price: event.price,
          timestamp: new Date(event.timestamp),
          kafkaKey: message.key?.toString("utf-8")
        });

        console.log(`Saved purchase for userid=${event.userid}, price=${event.price}`);
      } catch (err) {
        console.error("Failed to process message:", err);
      }
    }
  });

  console.log("Kafka consumer started");
}
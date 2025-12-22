import { Kafka } from "kafkajs";
import { savePurchase } from "../services/purchase.service";

type StartConsumerArgs = {
  brokers: string[];
  topic: string;
  groupId: string;
};

export async function startConsumer({ brokers, topic, groupId }: StartConsumerArgs) {
  const kafka = new Kafka({ brokers });
  const consumer = kafka.consumer({ groupId });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
    
      const raw = message.value.toString("utf8");
    
      let event: any;
      try {
        event = JSON.parse(raw);
      } catch (err) {
        console.error("Invalid JSON, skipping message:", raw);
        return; 
      }
    
      if (!event.username || !event.userid || typeof event.price !== "number") {
        console.warn("Invalid event shape, skipping:", event);
        return;
      }
    
      await savePurchase({
        username: String(event.username),
        userid: String(event.userid),
        price: Number(event.price),
        timestamp: String(event.timestamp),
      });
      console.log("Purchase save to DB", event);
    },
  });

  return consumer;
}
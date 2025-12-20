import { Kafka } from "kafkajs";

export function createProducer(brokers: string[]) {
  const kafka = new Kafka({
    clientId: "web-server",
    brokers,
  });

  const producer = kafka.producer();

  return {
    async connect() {
      await producer.connect();
      console.log("Kafka producer connected");
    },

    async publish(params: { topic: string; key: string; value: unknown }) {
      const payload = JSON.stringify(params.value);

      await producer.send({
        topic: params.topic,
        messages: [
          {
            key: params.key,
            value: payload, 
          },
        ],
      });
    },

    async disconnect() {
      await producer.disconnect();
      console.log("Kafka producer disconnected");
    },
  };
}
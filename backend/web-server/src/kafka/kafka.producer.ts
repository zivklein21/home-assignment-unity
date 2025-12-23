import { Kafka } from "kafkajs";

/**
 * Kafka Producer Factory (Web Server)
 *
 * Creates a Kafka producer used by the Web Server service
 * to publish purchase events.
 *
 * The producer enables asynchronous communication with the
 * Customer API and decouples user-facing HTTP requests
 * from database persistence.
 */
export function createProducer(brokers: string[]) {
  const kafka = new Kafka({
    clientId: "web-server",
    brokers,
  });

  const producer = kafka.producer();

  return {
    /**
     * Connects the producer to the Kafka cluster.
     *
     * This is typically called during application startup
     * to ensure the producer is ready before handling requests.
     */
    async connect() {
      await producer.connect();
      console.log("Kafka producer connected");
    },

     /**
     * Publishes an event to Kafka.
     *
     * Used by the Web Controller to emit purchase events.
     * Events are serialized to JSON to ensure a consistent
     * and language-agnostic message format.
     */
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

    /**
     * Disconnects the producer from Kafka.
     *
     * Allows for graceful shutdown of the Web Server
     * and prevents message loss on termination.
     */
    async disconnect() {
      await producer.disconnect();
      console.log("Kafka producer disconnected");
    },
  };
}
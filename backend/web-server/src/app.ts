import express from "express";
import { buildWebRoutes } from "./routes/web.route";
import { WebController } from "./controllers/web.controller";
import { createProducer } from "./kafka/kafka.producer";

const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "purchases";
const CUSTOMER_API_BASE_URL = process.env.CUSTOMER_API_BASE_URL || "http://localhost:8080";

export async function createApp() {
  const app = express();
  app.use(express.json());

  const producer = createProducer(KAFKA_BROKERS);
  await producer.connect();

  const controller = WebController.create({
    producer,
    topic: KAFKA_TOPIC,
    customerApiBaseUrl: CUSTOMER_API_BASE_URL,
  });

  app.use(buildWebRoutes(controller));
  return app;
}